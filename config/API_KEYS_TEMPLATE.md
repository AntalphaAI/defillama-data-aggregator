# 🔑 API密钥配置模板

## 使用说明

1. 将此文件复制为 `config/keys.js`
2. 替换下面的占位符为你的实际API密钥
3. 保存文件
4. 运行测试命令验证配置

---

```javascript
/**
 * API Keys Configuration
 *
 * 将占位符替换为你的实际API密钥
 */

module.exports = {
  // CoinMarketCap API Key
  // 获取地址: https://pro.coinmarketcap.com/signup
  // 格式: cmc_xxxxxxxxxxxxxxxxxxxx
  coinmarketcap: {
    apiKey: process.env.COINMARKETCAP_API_KEY || 'YOUR_COINMARKETCAP_API_KEY',
    baseUrl: 'https://pro-api.coinmarketcap.com/v1'
  },

  // Coinglass API Key
  // 获取地址: https://coinglass.com/pricing
  // 格式: 一长串随机字符
  coinglass: {
    apiKey: process.env.COINGLASS_API_KEY || 'YOUR_COINGLASS_API_KEY',
    baseUrl: 'https://open-api.coinglass.com'
  },

  // Nansen API Key
  // 获取地址: https://nansen.ai
  // 格式: 一长串随机字符
  nansen: {
    apiKey: process.env.NANSEN_API_KEY || 'YOUR_NANSEN_API_KEY',
    baseUrl: 'https://api.nansen.ai'
  },

  // Dune API Key (可选)
  // 获取地址: https://www.dune.com/auth/login
  // 格式: 一长串随机字符
  dune: {
    apiKey: process.env.DUNE_API_KEY || 'YOUR_DUNE_API_KEY',
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
```

---

## 📝 配置步骤

### 1. 获取CoinMarketCap API密钥
- 访问: https://pro.coinmarketcap.com/signup
- 创建免费账户
- 生成API密钥
- 复制API密钥

### 2. 获取Coinglass API密钥
- 访问: https://coinglass.com/pricing
- 选择免费计划
- 注册账户
- 获取API密钥

### 3. 获取Nansen API密钥
- 访问: https://nansen.ai
- 点击 "Get Started"
- 选择免费计划
- 获取API密钥

### 4. 配置文件
- 复制上面的模板
- 替换占位符
- 保存为 `config/keys.js`

### 5. 测试配置
```bash
crypto-data test --all
```

---

## ⚠️ 重要提示

- 不要泄露你的API密钥
- 定期更换API密钥
- 监控API使用情况
- 遵守各平台的使用条款
