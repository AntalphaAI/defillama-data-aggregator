/**
 * API Keys Configuration
 *
 * Copy this file to config/keys.js and add your actual API keys.
 *
 * Get API keys from:
 * - CoinMarketCap: https://coinmarketcap.com/api
 * - Coinglass: https://coinglass.com/api
 * - Nansen: https://nansen.ai
 * - Dune: https://dune.com/docs/api
 *
 * Note: DefiLlama does not require an API key for basic usage.
 */

module.exports = {
  // CoinMarketCap API Key (Required for CMC data)
  coinmarketcap: {
    apiKey: process.env.COINMARKETCAP_API_KEY || 'YOUR_COINMARKETCAP_API_KEY',
    baseUrl: 'https://pro-api.coinmarketcap.com/v1'
  },

  // Coinglass API Key (Required for futures/derivatives data)
  coinglass: {
    apiKey: process.env.COINGLASS_API_KEY || 'YOUR_COINGLASS_API_KEY',
    baseUrl: 'https://open-api.coinglass.com'
  },

  // Nansen API Key (Required for whale tracking and smart money data)
  nansen: {
    apiKey: process.env.NANSEN_API_KEY || 'YOUR_NANSEN_API_KEY',
    baseUrl: 'https://api.nansen.ai'
  },

  // Dune API Key (Required for custom SQL queries)
  dune: {
    apiKey: process.env.DUNE_API_KEY || 'YOUR_DUNE_API_KEY',
    baseUrl: 'https://api.dune.com/api/v1'
  },

  // DefiLlama Configuration (No API key required for basic usage)
  defillama: {
    baseUrl: 'https://api.llama.fi'
  },

  // Global settings
  settings: {
    // Default cache duration in seconds
    defaultCacheDuration: 300,

    // Request timeout in milliseconds
    timeout: 30000,

    // Maximum retry attempts
    maxRetries: 3,

    // Retry delay in milliseconds
    retryDelay: 1000,

    // Enable debug logging
    debug: process.env.DEBUG === 'true'
  }
};
