/**
 * Platform Health Checker
 * Checks availability of all platforms
 */

const axios = require('axios');
const chalk = require('chalk');
const https = require('https');
const { execSync } = require('child_process');

class HealthChecker {
  constructor(config) {
    this.config = config;
    this.results = new Map();
    this.lastCheck = null;
  }

  /**
   * Check health of all platforms
   */
  async checkAll() {
    const checks = [
      this.checkDefiLlama(),
      this.checkCoinGecko(),
      this.checkEtherscan(),
      this.checkDexScreener(),
      this.checkCoinCap(),
      this.checkBinance(),
      this.checkOKX(),
      this.checkCoinMarketCap(),
      this.checkCoinglass(),
      this.checkNansen(),
      this.checkRWAXYZ(),
      this.checkCryptoCompare(),
      this.checkCoinLore(),
      this.checkBlockchair(),
      this.checkBlockchainInfo(),
      this.checkMemPoolSpace()
    ];

    const results = await Promise.allSettled(checks);

    results.forEach((result, index) => {
      const platformName = [
        'DefiLlama',
        'CoinGecko',
        'Etherscan',
        'DexScreener',
        'CoinCap',
        'Binance',
        'OKX',
        'CoinMarketCap',
        'Coinglass',
        'Nansen',
        'RWA.xyz',
        'CryptoCompare',
        'CoinLore',
        'Blockchair',
        'Blockchain.info',
        'MemPool.space'
      ][index];

      if (result.status === 'fulfilled') {
        this.results.set(platformName, result.value);
      } else {
        this.results.set(platformName, {
          status: 'error',
          error: result.reason?.message || 'Unknown error'
        });
      }
    });

    this.lastCheck = new Date();
    return this.getSummary();
  }

  /**
   * Check DefiLlama
   */
  async checkDefiLlama() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.defillama.baseUrl}/v2/chains`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['TVL', 'Protocols', 'Chains', 'Yields']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check CoinGecko
   */
  async checkCoinGecko() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.coingecko.baseUrl}/coins/bitcoin`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Prices', 'Market Cap', 'Volume', 'OHLCV']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check Etherscan
   */
  async checkEtherscan() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.etherscan.baseUrl}?module=stats&action=ethprice`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['ETH Price', 'Gas Prices', 'On-chain Data']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check DexScreener
   */
  async checkDexScreener() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.dexscreener.baseUrl}/latest/dex/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['DEX Prices', 'Pairs', 'Liquidity']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check CoinCap
   */
  async checkCoinCap() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.coincap.baseUrl}/v2/assets?limit=1`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Prices', 'OHLCV', 'Exchanges']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check Binance
   */
  async checkBinance() {
    const start = Date.now();

    // 检查是否启用 IP 直连模式
    const useIpDirect = this.config.binance.useIpDirect && this.config.binance.ipBaseUrl;
    const baseUrl = useIpDirect ? this.config.binance.ipBaseUrl : this.config.binance.baseUrl;
    const hostHeader = this.config.binance.hostHeader;

    try {
      if (useIpDirect) {
        // IP 直连模式：使用 curl 绕过 TLS 指纹检测
        const curlCmd = `curl -s -k --max-time 5 -H "Host: ${hostHeader}" "${baseUrl}/api/v3/ticker/price?symbol=BTCUSDT"`;
        const result = execSync(curlCmd, { encoding: 'utf8', timeout: 6000 });
        const data = JSON.parse(result);

        if (data && data.symbol) {
          return {
            status: 'healthy',
            latency: Date.now() - start,
            features: ['Spot Prices', 'Depth', 'Trades']
          };
        }
      } else {
        // 正常模式：使用 axios
        const response = await axios.get(
          `${baseUrl}/api/v3/ticker/price?symbol=BTCUSDT`,
          { timeout: 5000 }
        );

        return {
          status: 'healthy',
          latency: Date.now() - start,
          features: ['Spot Prices', 'Depth', 'Trades']
        };
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check OKX
   */
  async checkOKX() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.okx.baseUrl}/api/v5/market/ticker?instId=BTC-USDT`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Spot Prices', 'Futures', 'Options']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check CoinMarketCap
   */
  async checkCoinMarketCap() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.coinmarketcap.baseUrl}/cryptocurrency/quotes/latest`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': this.config.coinmarketcap.apiKey
          },
          params: { symbol: 'BTC', convert: 'USD' },
          timeout: 5000
        }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Prices', 'Market Cap', 'Global Metrics']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check Coinglass
   */
  async checkCoinglass() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.coinglass.baseUrl}/api/v1/funding_rate`,
        {
          params: { symbol: 'BTC', interval: '8h' },
          timeout: 5000
        }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Funding Rates', 'Open Interest', 'Liquidations']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check Nansen
   */
  async checkNansen() {
    try {
      const start = Date.now();
      const response = await axios.post(
        `${this.config.nansen.baseUrl}/api/v1/token-screener`,
        { chains: ['ethereum'], pagination: { page: 1, per_page: 1 } },
        {
          headers: {
            'Content-Type': 'application/json',
            'apiKey': this.config.nansen.apiKey
          },
          timeout: 5000
        }
      );

      if (response.status === 403) {
        return {
          status: 'unhealthy',
          error: 'Insufficient credits',
          features: ['Smart Money', 'Whale Alerts', 'Token Analysis']
        };
      }

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Smart Money', 'Whale Alerts', 'Token Analysis']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check RWA.xyz
   */
  async checkRWAXYZ() {
    try {
      const start = Date.now();
      // 使用 curl 测试连通性（绕过 Node.js TLS 指纹检测）
      const curlCmd = `curl -s --max-time 5 "${this.config.rwaxyz.baseUrl}" | head -c 100`;
      const result = execSync(curlCmd, { encoding: 'utf8', timeout: 6000 });

      if (result && result.includes('RWA')) {
        return {
          status: 'healthy',
          latency: Date.now() - start,
          features: ['RWA Assets', 'Market Overview', 'Tokenized Real-World Assets']
        };
      }

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['RWA Assets', 'Market Overview']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check CryptoCompare
   */
  async checkCryptoCompare() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.cryptocompare.baseUrl}/price?fsym=BTC&tsyms=USD`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Prices', 'OHLC', 'Historical Data', 'Volume Analysis']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check CoinLore
   */
  async checkCoinLore() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.coinlore.baseUrl}/ticker/?start=0&limit=1`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Market Data', 'Coin Rankings', 'Global Stats']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check Blockchair
   */
  async checkBlockchair() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.blockchair.baseUrl}/bitcoin/stats`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Blockchain Stats', 'Multi-chain Data', 'Blocks', 'Transactions']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check Blockchain.info
   */
  async checkBlockchainInfo() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.blockchaininfo.baseUrl}/ticker`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['BTC Prices', 'Blocks', 'Transactions', 'Mempool']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Check MemPool.space
   */
  async checkMemPoolSpace() {
    try {
      const start = Date.now();
      const response = await axios.get(
        `${this.config.mempoolspace.baseUrl}/fees/recommended`,
        { timeout: 5000 }
      );

      return {
        status: 'healthy',
        latency: Date.now() - start,
        features: ['Fees', 'Mempool', 'Blocks', 'BTC Network Status']
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: this.formatError(error)
      };
    }
  }

  /**
   * Format error message
   */
  formatError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error?.message ||
                      error.response.data?.message ||
                      error.response.statusText;
      return `${status} - ${message}`;
    } else if (error.code) {
      return error.code;
    } else {
      return error.message;
    }
  }

  /**
   * Get summary of all platforms
   */
  getSummary() {
    const summary = {
      timestamp: this.lastCheck,
      total: this.results.size,
      healthy: 0,
      unhealthy: 0,
      platforms: {}
    };

    this.results.forEach((result, platform) => {
      summary.platforms[platform] = result;
      if (result.status === 'healthy') {
        summary.healthy++;
      } else {
        summary.unhealthy++;
      }
    });

    return summary;
  }

  /**
   * Print summary to console
   */
  printSummary() {
    const summary = this.getSummary();

    console.log(chalk.bold('\n🏥 Platform Health Check'));
    console.log(chalk.gray('━'.repeat(50)));
    console.log(`Checked at: ${summary.timestamp?.toLocaleString() || 'Never'}`);
    console.log(`Total: ${summary.total} | Healthy: ${chalk.green(summary.healthy)} | Unhealthy: ${chalk.red(summary.unhealthy)}\n`);

    Object.entries(summary.platforms).forEach(([platform, result]) => {
      const statusIcon = result.status === 'healthy' ? chalk.green('✓') : chalk.red('✗');
      const latency = result.latency ? chalk.gray(`${result.latency}ms`) : chalk.gray('N/A');
      const error = result.error ? chalk.red(` - ${result.error}`) : '';

      console.log(`${statusIcon} ${chalk.bold(platform.padEnd(15))} ${latency}${error}`);

      if (result.features) {
        console.log(chalk.gray(`   Features: ${result.features.join(', ')}`));
      }
    });

    console.log(chalk.gray('━'.repeat(50)));
  }

  /**
   * Get healthy platforms
   */
  getHealthyPlatforms() {
    const healthy = [];
    this.results.forEach((result, platform) => {
      if (result.status === 'healthy') {
        healthy.push(platform);
      }
    });
    return healthy;
  }

  /**
   * Get unhealthy platforms
   */
  getUnhealthyPlatforms() {
    const unhealthy = [];
    this.results.forEach((result, platform) => {
      if (result.status !== 'healthy') {
        unhealthy.push({ platform, error: result.error });
      }
    });
    return unhealthy;
  }
}

module.exports = HealthChecker;
