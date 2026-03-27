/**
 * Platform Fallback Manager
 * Manages fallback strategies when primary platforms fail
 */

const chalk = require('chalk');

class PlatformFallback {
  constructor() {
    // Define fallback chains for different data types
    this.fallbackChains = {
      // Price data
      'price': [
        'CoinMarketCap',
        'CoinGecko',
        'Binance',
        'OKX',
        'CoinCap'
      ],

      // DeFi TVL
      'tvl': [
        'DefiLlama'
      ],

      // Futures data
      'futures': [
        'Coinglass',
        'Binance',
        'OKX'
      ],

      // DEX data
      'dex': [
        'DexScreener',
        'Uniswap'
      ],

      // On-chain data
      'onchain': [
        'Etherscan',
        'Nansen'
      ],

      // Market overview
      'overview': [
        'CoinMarketCap',
        'CoinGecko',
        'CoinCap'
      ]
    };

    this.healthResults = new Map();
  }

  /**
   * Update health results
   */
  updateHealth(results) {
    this.healthResults.clear();
    Object.entries(results.platforms || results).forEach(([platform, result]) => {
      this.healthResults.set(platform, result);
    });
  }

  /**
   * Get available platform for a data type
   */
  getAvailablePlatform(dataType) {
    const chain = this.fallbackChains[dataType.toLowerCase()];

    if (!chain) {
      console.warn(chalk.yellow(`No fallback chain defined for data type: ${dataType}`));
      return null;
    }

    // Find first healthy platform in the chain
    for (const platform of chain) {
      const health = this.healthResults.get(platform);
      if (health && health.status === 'healthy') {
        return {
          platform,
          reason: 'Primary available'
        };
      }
    }

    // No healthy platform found
    return {
      platform: null,
      reason: `All platforms unavailable: ${chain.join(', ')}`
    };
  }

  /**
   * Get all available platforms for a data type
   */
  getAllAvailablePlatforms(dataType) {
    const chain = this.fallbackChains[dataType.toLowerCase()];

    if (!chain) {
      return [];
    }

    return chain.filter(platform => {
      const health = this.healthResults.get(platform);
      return health && health.status === 'healthy';
    });
  }

  /**
   * Get platform with specific feature
   */
  getPlatformWithFeature(feature) {
    for (const [platform, health] of this.healthResults) {
      if (health.status === 'healthy' &&
          health.features &&
          health.features.includes(feature)) {
        return platform;
      }
    }
    return null;
  }

  /**
   * Check if platform is healthy
   */
  isPlatformHealthy(platform) {
    const health = this.healthResults.get(platform);
    return health && health.status === 'healthy';
  }

  /**
   * Get fallback recommendation
   */
  getFallbackRecommendation(requestedPlatform, dataType) {
    // If requested platform is healthy, use it
    if (this.isPlatformHealthy(requestedPlatform)) {
      return {
        recommended: requestedPlatform,
        status: 'primary',
        message: `${requestedPlatform} is available`
      };
    }

    // Otherwise, try to find a fallback
    const available = this.getAvailablePlatform(dataType);

    if (available.platform) {
      return {
        recommended: available.platform,
        status: 'fallback',
        original: requestedPlatform,
        message: `${requestedPlatform} unavailable, using ${available.platform} instead`
      };
    }

    // No fallback available
    return {
      recommended: null,
      status: 'unavailable',
      original: requestedPlatform,
      message: `No available platform for ${dataType}`
    };
  }

  /**
   * Print fallback status
   */
  printFallbackStatus() {
    console.log(chalk.bold('\n🔄 Fallback Status'));
    console.log(chalk.gray('━'.repeat(50)));

    Object.entries(this.fallbackChains).forEach(([dataType, chain]) => {
      const available = this.getAllAvailablePlatforms(dataType);
      const primary = chain[0];
      const primaryHealthy = this.isPlatformHealthy(primary);

      if (primaryHealthy) {
        console.log(`${chalk.green('✓')} ${dataType.padEnd(15)} → ${chalk.bold(primary)}`);
      } else if (available.length > 0) {
        console.log(`${chalk.yellow('⚠')} ${dataType.padEnd(15)} → ${chalk.bold(available[0])} ${chalk.gray(`(fallback from ${primary})`)}`);
      } else {
        console.log(`${chalk.red('✗')} ${dataType.padEnd(15)} → ${chalk.red('No platform available')}`);
      }
    });

    console.log(chalk.gray('━'.repeat(50)));
  }

  /**
   * Get detailed fallback report
   */
  getFallbackReport() {
    const report = {
      timestamp: new Date(),
      dataTypeStatus: {},
      summary: {
        totalDataTypes: Object.keys(this.fallbackChains).length,
        availableDataTypes: 0,
        unavailableDataTypes: 0
      }
    };

    Object.entries(this.fallbackChains).forEach(([dataType, chain]) => {
      const available = this.getAllAvailablePlatforms(dataType);
      const status = {
        primary: chain[0],
        primaryHealthy: this.isPlatformHealthy(chain[0]),
        availablePlatforms: available,
        status: available.length > 0 ? 'available' : 'unavailable',
        recommended: available.length > 0 ? available[0] : null
      };

      report.dataTypeStatus[dataType] = status;

      if (status.status === 'available') {
        report.summary.availableDataTypes++;
      } else {
        report.summary.unavailableDataTypes++;
      }
    });

    return report;
  }
}

module.exports = PlatformFallback;
