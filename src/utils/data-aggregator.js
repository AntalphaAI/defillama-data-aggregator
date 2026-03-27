/**
 * Data Aggregator
 * Aggregates data from multiple platforms and provides best available data
 */

const FileCache = require('./file-cache');

class DataAggregator {
  constructor(platforms, options = {}) {
    this.platforms = platforms || {};
    this.memoryCache = new Map();
    this.cacheTimeout = options.cacheTimeout || 30 * 1000; // 30 seconds memory cache
    this.debug = options.debug || false;
    
    // Initialize file cache for persistence
    this.fileCache = new FileCache({
      cacheDir: options.cacheDir || '.cache',
      defaultTTL: options.defaultTTL || 5 * 60 * 1000 // 5 minutes file cache
    });
    this.useFileCache = options.useFileCache !== false;
  }

  /**
   * Get best available price for a symbol
   * Tries multiple platforms in order of preference
   */
  async getBestPrice(symbol, quoteCurrency = 'USD') {
    const cacheKey = `price_${symbol}_${quoteCurrency}`;
    
    // Check memory cache first (fastest)
    const memoryCached = this.memoryCache.get(cacheKey);
    if (memoryCached && Date.now() - memoryCached.timestamp < this.cacheTimeout) {
      if (this.debug) console.log(`Memory cache hit for ${cacheKey}`);
      return memoryCached.data;
    }

    // Check file cache (persistent across sessions)
    if (this.useFileCache) {
      try {
        const fileCached = await this.fileCache.get(cacheKey);
        if (fileCached) {
          if (this.debug) console.log(`File cache hit for ${cacheKey}`);
          // Also store in memory cache for faster access
          this.memoryCache.set(cacheKey, {
            data: fileCached,
            timestamp: Date.now()
          });
          return fileCached;
        }
      } catch (error) {
        if (this.debug) console.warn('File cache error:', error.message);
      }
    }

    if (this.debug) console.log(`Cache miss for ${cacheKey}, fetching...`);

    // Try platforms in order of preference
    const platformOrder = [
      'cryptocompare',
      'coinlore',
      'binance',
      'blockchaininfo'
    ];

    for (const platform of platformOrder) {
      if (!this.platforms[platform]) continue;

      try {
        let price;
        if (platform === 'cryptocompare') {
          const result = await this.platforms[platform].getPrice(symbol, quoteCurrency);
          price = result[quoteCurrency];
        } else if (platform === 'coinlore') {
          // CoinLore uses different structure
          const tickers = await this.platforms[platform].getTickers(0, 500);
          const coin = tickers.data.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
          if (coin) {
            price = coin.price_usd;
            // Convert to requested quote currency
            if (quoteCurrency.toUpperCase() !== 'USD') {
              // Need conversion (simplified)
              price = price; // For now, just return USD
            }
          }
        } else if (platform === 'binance') {
          const result = await this.platforms[platform].getPrice(`${symbol}USDT`);
          price = parseFloat(result.price);
        } else if (platform === 'blockchaininfo') {
          // Blockchain.info mainly has BTC
          if (symbol.toUpperCase() === 'BTC') {
            const ticker = await this.platforms[platform].getTicker();
            price = ticker[quoteCurrency.toUpperCase()]?.last;
          }
        }

        if (price && !isNaN(price)) {
          const data = {
            symbol,
            price: parseFloat(price),
            quoteCurrency,
            source: platform,
            timestamp: new Date().toISOString()
          };
          
          // Cache in memory
          this.memoryCache.set(cacheKey, {
            data,
            timestamp: Date.now()
          });
          
          // Cache in file (persistent)
          if (this.useFileCache) {
            try {
              await this.fileCache.set(cacheKey, data);
            } catch (error) {
              if (this.debug) console.warn('Failed to write to file cache:', error.message);
            }
          }
          
          if (this.debug) console.log(`Cached ${cacheKey}`);
          return data;
        }
      } catch (error) {
        console.warn(`Failed to fetch ${symbol} from ${platform}:`, error.message);
        continue;
      }
    }

    throw new Error(`Unable to fetch price for ${symbol} from any platform`);
  }

  /**
   * Aggregate market overview from multiple sources
   */
  async getMarketOverview() {
    const overview = {
      totalMarketCap: null,
      totalVolume: null,
      btcDominance: null,
      ethDominance: null,
      sources: []
    };

    // Try CoinLore for global stats
    try {
      if (this.platforms.coinlore) {
        const global = await this.platforms.coinlore.getGlobal();
        if (global && global[0]) {
          overview.totalMarketCap = global[0].total_mcap;
          overview.totalVolume = global[0].total_volume;
          overview.btcDominance = global[0].btc_d;
          overview.ethDominance = global[0].eth_d;
          overview.sources.push('coinlore');
        }
      }
    } catch (error) {
      console.warn('Failed to get CoinLore global stats:', error.message);
    }

    // Try DefiLlama for additional TVL data
    try {
      if (this.platforms.defillama) {
        const tvl = await this.platforms.defillama.getGlobalTVL();
        if (tvl) {
          overview.defiTvl = tvl;
          overview.sources.push('defillama');
        }
      }
    } catch (error) {
      console.warn('Failed to get DefiLlama TVL:', error.message);
    }

    return overview;
  }

  /**
   * Get aggregated top coins data
   */
  async getTopCoins(limit = 10) {
    const cacheKey = `topcoins_${limit}`;
    
    // Check cache
    const cached = this.memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    // Prefer CoinLore for market rankings
    let topCoins = [];

    try {
      if (this.platforms.coinlore) {
        const result = await this.platforms.coinlore.getTickers(0, limit);
        topCoins = result.data.map(coin => ({
          rank: coin.rank,
          symbol: coin.symbol,
          name: coin.name,
          price: coin.price_usd,
          change24h: coin.percent_change_24h,
          marketCap: coin.market_cap_usd,
          volume24h: coin.volume24,
          source: 'coinlore'
        }));
      }
    } catch (error) {
      console.warn('Failed to get CoinLore top coins:', error.message);
    }

    // Fallback to CryptoCompare
    if (topCoins.length === 0 && this.platforms.cryptocompare) {
      try {
        const result = await this.platforms.cryptocompare.getTopCoins(limit, 'USD');
        if (result && result.Data) {
          topCoins = result.Data.map(coin => ({
            rank: coin.CoinInfo.SortOrder,
            symbol: coin.CoinInfo.Symbol,
            name: coin.CoinInfo.FullName,
            price: coin.RAW.USD.PRICE,
            change24h: coin.RAW.USD.CHANGEPCT24HOUR,
            marketCap: coin.RAW.USD.MKTCAP,
            volume24h: coin.RAW.USD.TOTALVOLUME24HTO,
            source: 'cryptocompare'
          }));
        }
      } catch (error) {
        console.warn('Failed to get CryptoCompare top coins:', error.message);
      }
    }

    if (topCoins.length > 0) {
      this.memoryCache.set(cacheKey, {
        data: topCoins,
        timestamp: Date.now()
      });
    }

    return topCoins;
  }

  /**
   * Compare prices across multiple platforms (concurrent)
   */
  async comparePrices(symbols, quoteCurrency = 'USD') {
    const comparisons = {};

    // 并发处理所有符号
    const promises = symbols.map(symbol => this.compareSingleSymbol(symbol, quoteCurrency));
    const results = await Promise.allSettled(promises);

    // 整理结果
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        comparisons[symbols[index]] = result.value;
      } else {
        comparisons[symbols[index]] = {
          symbol: symbols[index],
          error: result.reason?.message,
          prices: []
        };
      }
    });

    return comparisons;
  }

  /**
   * Compare prices for a single symbol
   */
  async compareSingleSymbol(symbol, quoteCurrency = 'USD') {
    const data = {
      symbol,
      prices: []
    };

    const platforms = ['cryptocompare', 'coinlore', 'binance', 'blockchaininfo'];

    // 并发请求所有平台
    const platformPromises = platforms.map(platform => {
      if (!this.platforms[platform]) return Promise.resolve(null);

      return this.fetchPriceFromPlatform(platform, symbol, quoteCurrency)
        .then(price => ({ platform, price, timestamp: new Date().toISOString() }))
        .catch(error => {
          if (this.debug) console.warn(`Failed to fetch ${symbol} from ${platform}:`, error.message);
          return null;
        });
    });

    const results = await Promise.all(platformPromises);

    // 过滤并添加有效结果
    results.forEach(result => {
      if (result && result.price && !isNaN(result.price)) {
        data.prices.push({
          platform: result.platform,
          price: parseFloat(result.price),
          timestamp: result.timestamp
        });
      }
    });

    // 计算统计信息
    if (data.prices.length > 0) {
      const prices = data.prices.map(p => p.price);
      data.average = prices.reduce((a, b) => a + b, 0) / prices.length;
      data.min = Math.min(...prices);
      data.max = Math.max(...prices);
      data.spread = data.max - data.min;
      data.spreadPercent = (data.spread / data.average * 100).toFixed(2);
    }

    return data;
  }

  /**
   * Fetch price from a specific platform
   */
  async fetchPriceFromPlatform(platform, symbol, quoteCurrency) {
    if (platform === 'cryptocompare') {
      const result = await this.platforms[platform].getPrice(symbol, quoteCurrency);
      return result[quoteCurrency];
    } else if (platform === 'binance') {
      const result = await this.platforms[platform].getPrice(`${symbol}USDT`);
      return parseFloat(result.price);
    } else if (platform === 'coinlore') {
      const tickers = await this.platforms[platform].getTickers(0, 500);
      const coin = tickers.data.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
      return coin ? coin.price_usd : null;
    } else if (platform === 'blockchaininfo' && symbol.toUpperCase() === 'BTC') {
      const ticker = await this.platforms[platform].getTicker();
      return ticker[quoteCurrency.toUpperCase()]?.last;
    }

    return null;
  }

  /**
   * Get BTC network status aggregated from multiple sources
   */
  async getBTCNetworkStatus() {
    const status = {
      blockHeight: null,
      fees: null,
      mempoolSize: null,
      hashrate: null,
      sources: []
    };

    // Try MemPool.space for fees and blocks
    try {
      if (this.platforms.mempoolspace) {
        const fees = await this.platforms.mempoolspace.getFees();
        const height = await this.platforms.mempoolspace.getBlockHeight();
        
        status.fees = fees;
        status.blockHeight = height;
        status.sources.push('mempoolspace');
      }
    } catch (error) {
      console.warn('Failed to get MemPool.space data:', error.message);
    }

    // Try Blockchair for detailed stats
    try {
      if (this.platforms.blockchair) {
        const stats = await this.platforms.blockchair.getStats('bitcoin');
        if (stats && stats.data) {
          if (!status.blockHeight) status.blockHeight = stats.data.blocks;
          status.mempoolSize = stats.data.mempool_size;
          status.hashrate = stats.data.hashrate_24h;
          status.sources.push('blockchair');
        }
      }
    } catch (error) {
      console.warn('Failed to get Blockchair data:', error.message);
    }

    // Try Blockchain.info for additional data
    try {
      if (this.platforms.blockchaininfo) {
        const block = await this.platforms.blockchaininfo.getLatestBlock();
        if (block && block.height && !status.blockHeight) {
          status.blockHeight = block.height;
          status.sources.push('blockchaininfo');
        }
      }
    } catch (error) {
      console.warn('Failed to get Blockchain.info data:', error.message);
    }

    return status;
  }

  /**
   * Clear cache
   */
  async clearCache() {
    this.memoryCache.clear();
    if (this.useFileCache) {
      await this.fileCache.clear();
    }
  }

  /**
   * Get cache stats
   */
  async getCacheStats() {
    const stats = {
      memoryCache: {
        size: this.memoryCache.size,
        entries: Array.from(this.memoryCache.keys()).map(key => ({
          key,
          age: Date.now() - this.memoryCache.get(key).timestamp
        }))
      }
    };

    if (this.useFileCache) {
      stats.fileCache = await this.fileCache.getStats();
    }

    return stats;
  }
}

module.exports = DataAggregator;
