/**
 * API Keys Configuration - 完整配置模板
 *
 * 请将下方的占位符替换为你的实际API密钥
 */

module.exports = {
  // CoinMarketCap API Key
  // 访问 https://pro.coinmarketcap.com/signup 获取
  // 格式: cmc_xxxxxxxxxxxxxxxxxxxx
  coinmarketcap: {
    apiKey: process.env.COINMARKETCAP_API_KEY || '在这里粘贴你的CoinMarketCap API密钥',
    baseUrl: 'https://pro-api.coinmarketcap.com/v1'
  },

  // Coinglass API Key
  // 访问 https://coinglass.com/pricing 获取
  // 格式: 一长串随机字符
  coinglass: {
    apiKey: process.env.COINGLASS_API_KEY || '在这里粘贴你的Coinglass API密钥',
    baseUrl: 'https://open-api.coinglass.com'
  },

  // Nansen API Key
  // 访问 https://nansen.ai 获取
  // 格式: 一长串随机字符
  nansen: {
    apiKey: process.env.NANSEN_API_KEY || '在这里粘贴你的Nansen API密钥',
    baseUrl: 'https://api.nansen.ai'
  },

  // Dune API Key (可选)
  // 访问 https://www.dune.com/auth/login 获取
  dune: {
    apiKey: process.env.DUNE_API_KEY || '在这里粘贴你的Dune API密钥（可选）',
    baseUrl: 'https://api.dune.com/api/v1'
  },

  // DefiLlama Configuration (无需API密钥)
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
