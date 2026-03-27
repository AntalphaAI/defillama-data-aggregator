/**
 * Platform Info Module
 * Provides detailed information about each platform and their value proposition
 */

const chalk = require('chalk');

class PlatformInfo {
  constructor() {
    this.platforms = {
      defillama: {
        name: 'DefiLlama',
        website: 'https://defillama.com',
        description: 'Decentralized finance (DeFi) data aggregator',
        status: 'available',
        apiKey: false,
        features: [
          'Total Value Locked (TVL) tracking',
          'Protocol TVL and metrics',
          'Chain TVL comparisons',
          'DeFi yields and APY',
          'Protocol categories and tags',
          'Liquidations and events',
          'Gas prices and fees',
          'Historical TVL charts',
          'Cross-chain TVL data'
        ],
        useCases: [
          'Track DeFi protocol performance',
          'Compare TVL across different chains',
          'Monitor DeFi market trends',
          'Research new protocols and yields',
          'Track liquidation events'
        ],
        valueProposition: {
          primary: 'Industry-leading DeFi data aggregator',
          dataCoverage: 'DeFi protocols across all chains',
          unique: 'Most comprehensive TVL data in crypto',
          trust: 'Widely trusted by the industry',
          frequency: 'Real-time updates'
        },
        metrics: {
          protocolsTracked: '3000+',
          chainsSupported: '100+',
          dataPoints: 'Billions',
          updateFrequency: 'Real-time'
        }
      },

      binance: {
        name: 'Binance',
        website: 'https://binance.com',
        description: 'World\'s largest cryptocurrency exchange',
        status: 'available',
        apiKey: false,
        features: [
          'Spot trading (8,000+ pairs)',
          'Futures trading (perpetual & quarterly)',
          'Margin trading (up to 125x)',
          'Order book depth and liquidity',
          '24h ticker data',
          'K-line (candlestick) data',
          'Recent trades stream',
          'Exchange info and rules',
          'Websocket API for real-time data'
        ],
        useCases: [
          'Real-time price monitoring',
          'High-frequency trading data',
          'Order book analysis',
          'Arbitrage opportunities',
          'Market depth assessment',
          'Volume and liquidity tracking'
        ],
        valueProposition: {
          primary: 'Largest crypto exchange by volume',
          liquidity: 'Highest trading volume and liquidity',
          dataQuality: 'Official exchange data source',
          speed: 'Fast and reliable',
          features: 'Most comprehensive trading features'
        },
        technical: {
          type: 'IP Direct Connection',
          url: 'https://13.33.212.224',
          optimization: 'Bypasses DNS pollution',
          responseTime: '~500ms'
        },
        metrics: {
          tradingPairs: '8,000+',
          dailyVolume: '$30B+',
          users: '150M+',
          apiCalls: '1,200/min'
        }
      },

      rwaxyz: {
        name: 'RWA.xyz',
        website: 'https://rwa.xyz',
        description: 'Tokenized real-world assets data platform',
        status: 'available',
        apiKey: true,
        features: [
          'RWA market overview',
          'Asset tokenization tracking',
          'Treasury bond metrics (yields, duration)',
          'Private credit data',
          'Institutional funds performance',
          'Corporate bond tracking',
          'Cross-chain RWA protocol data',
          'On-chain reserve verification',
          'Legal structure and jurisdiction',
          'Transaction and transfer tracking'
        ],
        useCases: [
          'Analyze RWA market size and growth',
          'Research tokenized treasury bonds',
          'Track private credit performance',
          'Monitor institutional fund flows',
          'Compare RWA protocols and yields',
          'Verify on-chain reserves',
          'Study jurisdictional regulations'
        ],
        valueProposition: {
          primary: 'Leading RWA data aggregator',
          marketCoverage: '26B+ tokenized assets',
          uniqueness: 'Only platform focused on RWA sector',
          expertise: 'Deep RWA protocol and legal analysis',
          verification: 'On-chain reserve verification'
        },
        metrics: {
          totalValueLocked: '$26B+',
          representedValue: '$335B+',
          totalAssets: '2,500+',
          networks: '12+',
          assetClasses: '8'
        },
        assetClasses: [
          'U.S. Treasuries ($10.7B)',
          'Commodities ($5.8B)',
          'Private Credit ($2.8B)',
          'Institutional Funds ($2.4B)',
          'Corporate Bonds ($1.9B)'
        ]
      },

      cryptocompare: {
        name: 'CryptoCompare',
        website: 'https://cryptocompare.com',
        description: 'Comprehensive cryptocurrency data provider',
        status: 'available',
        apiKey: true,
        features: [
          'Real-time and historical prices',
          'OHLCV data (open, high, low, close, volume)',
          'Top coins by volume',
          'Exchange data',
          'Social sentiment metrics',
          'Blockchain data',
          'Mining data',
          'Historical trade data',
          'Index and futures data'
        ],
        useCases: [
          'Price tracking and comparison',
          'Historical data analysis',
          'Backtesting trading strategies',
          'Social sentiment analysis',
          'Exchange comparison',
          'Market depth analysis',
          'Portfolio valuation'
        ],
        valueProposition: {
          primary: 'Comprehensive crypto data aggregator',
          history: 'Extensive historical data since 2014',
          apis: 'Multiple APIs for different use cases',
          documentation: 'Well-documented API',
          reliability: 'High uptime and accuracy'
        },
        metrics: {
          coinsTracked: '7,300+',
          exchanges: '5,000+',
          apis: '15+',
          historicalYears: '10+',
          dailyCalls: '100,000+ (free tier)'
        }
      },

      coinlore: {
        name: 'CoinLore',
        website: 'https://coinlore.net',
        description: 'Cryptocurrency market data platform',
        status: 'available',
        apiKey: false,
        features: [
          'Real-time cryptocurrency prices',
          'Market capitalization rankings',
          '24h price change percentage',
          'Global market data',
          'Exchange information',
          'Cryptocurrency categories',
          'Top gainers and losers',
          'BTC dominance and market share'
        ],
        useCases: [
          'Quick price lookup',
          'Market rankings by market cap',
          'Trending coins analysis',
          'Percentage change tracking',
          'Global market overview',
          'Exchange discovery',
          'Bitcoin dominance monitoring'
        ],
        valueProposition: {
          primary: 'Simple and fast market data',
          simplicity: 'No API key required',
          speed: 'Fast and lightweight',
          coverage: '15,000+ cryptocurrencies',
          ease: 'Easy to use and integrate'
        },
        metrics: {
          cryptocurrencies: '15,000+',
          exchanges: '2,000+',
          markets: '27,000+',
          apiRateLimit: 'Unlimited'
        }
      },

      blockchair: {
        name: 'Blockchair',
        website: 'https://blockchair.com',
        description: 'Blockchain explorer and data provider',
        status: 'available',
        apiKey: true,
        features: [
          'Blockchain statistics and metrics',
          'Block and transaction data',
          'Address balance and history',
          'Mempool analysis',
          'Multi-chain support (BTC, ETH, DOGE, etc.)',
          'Smart contract interactions',
          'Governance proposals',
          'Node statistics',
          'On-chain analytics',
          'Fee calculations'
        ],
        useCases: [
          'Blockchain monitoring',
          'Transaction tracking',
          'Address analysis',
          'Mempool congestion monitoring',
          'Network health check',
          'Cross-chain data comparison',
          'Governance tracking',
          'Node status monitoring'
        ],
        valueProposition: {
          primary: 'Comprehensive blockchain analytics',
          multiChain: 'Supports multiple blockchains',
          granularity: 'Fine-grained on-chain data',
          apis: 'GraphQL and REST APIs',
          documentation: 'Developer-friendly'
        },
        metrics: {
          blockchains: '10+',
          apiEndpoints: '50+',
          dataPoints: 'Billions',
          apiRateLimit: '30,000/month (free tier)'
        }
      },

      blockchaininfo: {
        name: 'Blockchain.info',
        website: 'https://blockchain.info',
        description: 'Bitcoin blockchain explorer',
        status: 'available',
        apiKey: false,
        features: [
          'Bitcoin price in 24 currencies',
          'Latest block information',
          'Unconfirmed transactions',
          'Block height and hash',
          'Transaction details',
          'Address information',
          'Network statistics',
          'Mempool data',
          'Difficulty adjustment'
        ],
        useCases: [
          'Bitcoin price monitoring',
          'Block explorer',
          'Transaction verification',
          'Mempool fee estimation',
          'Network health check',
          'Difficulty tracking',
          'Unconfirmed tx monitoring'
        ],
        valueProposition: {
          primary: 'Original Bitcoin explorer',
          trust: 'Most trusted BTC data source',
          history: 'Since 2011',
          simplicity: 'Simple and straightforward',
          reliability: 'High uptime and accuracy'
        },
        metrics: {
          transactionsIndexed: '900M+',
          blocksIndexed: '900,000+',
          walletsCreated: '70M+',
          uptime: '99.9%+'
        }
      },

      mempoolspace: {
        name: 'MemPool.space',
        website: 'https://mempool.space',
        description: 'Bitcoin mempool explorer and fee estimator',
        status: 'available',
        apiKey: 'false',
        features: [
          'Recommended fee rates',
          'Mempool congestion indicators',
          'Block propagation data',
          'Transaction visualization',
          'Fee rate history',
          'Block size statistics',
          'Mempool block information',
          'Halving countdown',
          'Mining pool statistics',
          'Satoshi prices (sats per USD)'
        ],
        useCases: [
          'Optimal fee estimation',
          'Mempool congestion monitoring',
          'Transaction priority planning',
          'Block propagation tracking',
          'Mining pool analysis',
          'Bitcoin network health',
          'Halving event monitoring',
          'Fee rate optimization'
        ],
        valueProposition: {
          primary: 'Best Bitcoin fee estimator',
          realTime: 'Real-time mempool data',
          accuracy: 'Most accurate fee recommendations',
          visualization: 'Visual mempool display',
          community: 'Open-source, community-driven'
        },
        metrics: {
          feeAccuracy: '95%+',
          updateFrequency: 'Every block',
          mempoolBlocks: 'Multiple',
          minersSupported: '50+'
        }
      }
    };
  }

  /**
   * Get platform information
   */
  getPlatform(platformKey) {
    return this.platforms[platformKey.toLowerCase()] || null;
  }

  /**
   * Get all platforms
   */
  getAllPlatforms() {
    return this.platforms;
  }

  /**
   * Get platforms by status
   */
  getPlatformsByStatus(status) {
    const result = {};
    for (const [key, platform] of Object.entries(this.platforms)) {
      if (platform.status === status) {
        result[key] = platform;
      }
    }
    return result;
  }

  /**
   * Get platform value proposition
   */
  getValueProposition(platformKey) {
    const platform = this.getPlatform(platformKey);
    return platform ? platform.valueProposition : null;
  }

  /**
   * Display platform info (for CLI)
   */
  displayPlatformInfo(platformKey) {
    const platform = this.getPlatform(platformKey);
    if (!platform) {
      console.log(chalk.red('Platform "' + platformKey + '" not found'));
      return;
    }

    console.log(chalk.cyan('\n========================================'));
    console.log(chalk.cyan('  ' + platform.name));
    console.log(chalk.cyan('========================================\n'));

    // Status
    const statusColor = platform.status === 'available' ? chalk.green : platform.status === 'unavailable' ? chalk.red : chalk.yellow;
    console.log('Status: ' + statusColor(platform.status.toUpperCase()));

    // Website
    console.log('Website: ' + chalk.blue(platform.website));

    // Description
    console.log('\nDescription:');
    console.log('  ' + platform.description);

    // Features
    console.log('\nFeatures:');
    platform.features.forEach((feature, index) => {
      console.log('  ' + chalk.green('•') + ' ' + feature);
    });

    // Use Cases
    console.log('\nUse Cases:');
    platform.useCases.forEach((useCase, index) => {
      console.log('  ' + chalk.blue('→') + ' ' + useCase);
    });

    // Value Proposition
    console.log('\nValue Proposition:');
    const vp = platform.valueProposition;
    console.log('  Primary: ' + chalk.yellow(vp.primary));
    console.log('  Key Points:');
    Object.entries(vp).forEach(([key, value]) => {
      if (key !== 'primary') {
        console.log('    • ' + key + ': ' + chalk.yellow(value));
      }
    });

    // Metrics
    if (platform.metrics) {
      console.log('\nMetrics:');
      Object.entries(platform.metrics).forEach(([key, value]) => {
        console.log('  ' + chalk.cyan('•') + ' ' + key + ': ' + chalk.yellow(value));
      });
    }

    // API Key Requirement
    console.log('\nAPI Key:');
    if (platform.apiKey) {
      console.log('  Required (Register at: ' + platform.website + ')');
    } else {
      console.log('  ' + chalk.green('Not Required'));
    }

    // Special notes
    if (platform.technical) {
      console.log('\nTechnical:');
      Object.entries(platform.technical).forEach(([key, value]) => {
        console.log('  ' + chalk.cyan('•') + ' ' + key + ': ' + chalk.yellow(value));
      });
    }

    if (platform.assetClasses) {
      console.log('\nAsset Classes:');
      platform.assetClasses.forEach(assetClass => {
        console.log('  ' + chalk.cyan('•') + ' ' + assetClass);
      });
    }

    console.log(chalk.cyan('\n========================================\n'));
  }

  /**
   * Display all platforms summary
   */
  displayAllPlatformsSummary() {
    console.log(chalk.cyan('\n========================================'));
    console.log(chalk.cyan('  Available Crypto Data Platforms'));
    console.log(chalk.cyan('========================================\n'));

    const available = this.getPlatformsByStatus('available');
    const unavailable = this.getPlatformsByStatus('unavailable');

    if (Object.keys(available).length > 0) {
      console.log(chalk.green('Available Platforms (' + Object.keys(available).length + ')'));
      Object.entries(available).forEach(([key, platform]) => {
        const vp = platform.valueProposition;
        console.log(chalk.cyan('  • ' + platform.name));
        console.log('    ' + vp.primary);
      });
      console.log('');
    }

    if (Object.keys(unavailable).length > 0) {
      console.log(chalk.red('Unavailable Platforms (' + Object.keys(unavailable).length + ')'));
      Object.entries(unavailable).forEach(([key, platform]) => {
        console.log(chalk.gray('  • ' + platform.name));
      });
      console.log('');
    }
  }

  /**
   * Display value proposition for all platforms
   */
  displayValuePropositions() {
    console.log(chalk.cyan('\n========================================'));
    console.log(chalk.cyan('  Platform Value Propositions'));
    console.log(chalk.cyan('========================================\n'));

    Object.entries(this.platforms).forEach(([key, platform]) => {
      const statusColor = platform.status === 'available' ? chalk.green : chalk.red;
      const vp = platform.valueProposition;
      
      console.log(statusColor(platform.name));
      console.log('  Primary: ' + chalk.white(vp.primary));
      console.log('  Key Points:');
      Object.entries(vp).forEach(([k, v]) => {
        if (k !== 'primary') {
          console.log('    • ' + k + ': ' + chalk.yellow(v));
        }
      });
      console.log('');
    });
  }

  /**
   * Get summary text for documentation
   */
  getSummaryText() {
    let text = '';
    text += '# Crypto Data Aggregator - Platform Overview\n\n';
    text += '## Available Platforms\n\n';

    const available = this.getPlatformsByStatus('available');
    text += 'Total available: ' + Object.keys(available).length + ' platforms\n\n';

    Object.entries(available).forEach(([key, platform]) => {
      text += '### ' + platform.name + '\n';
      text += '**Website:** ' + platform.website + '\n';
      text += '**Description:** ' + platform.description + '\n';
      text += '**API Key:** ' + (platform.apiKey ? 'Required' : 'Not Required') + '\n';
      text += '**Status:** ' + platform.status.toUpperCase() + '\n\n';
      text += '**Features:**\n';
      platform.features.forEach(f => {
        text += '- ' + f + '\n';
      });
      text += '\n';
    });

    return text;
  }
}

module.exports = PlatformInfo;
