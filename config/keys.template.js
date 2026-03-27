/**
 * API Keys Configuration Template
 *
 * 请按照以下步骤获取免费API密钥并填入：
 *
 * 1. CoinMarketCap: https://pro.coinmarketcap.com/signup
 * 2. Coinglass: https://coinglass.com/pricing
 * 3. Nansen: https://nansen.ai/pricing
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
    defaultCacheDuration: 300,
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
    debug: process.env.DEBUG === 'true'
  }
};
