# 🔑 完整API配置指南

## 🎯 配置目标

将所有4个平台完全配置：
- ✅ DefiLlama（已配置，无需API密钥）
- 🔑 CoinMarketCap（需要API密钥）
- 🔑 Coinglass（需要API密钥）
- 🔑 Nansen（需要API密钥）
- 🔑 Dune（可选，需要API密钥）

---

## 📋 配置步骤详解

### 第1步：获取CoinMarketCap API密钥

**访问地址：** https://pro.coinmarketcap.com/signup

**详细步骤：**
1. 访问注册页面
2. 填写邮箱和密码创建账户
3. 验证邮箱（检查收件箱）
4. 登录到CoinMarketCap Pro
5. 进入 "Dashboard" 页面
6. 点击 "API Key Management" 或 "API Keys"
7. 点击 "Create New Key"
8. 选择权限等级（推荐：Basic）
9. 生成API密钥

**免费额度：**
- 10,000 credits/月
- 基本数据访问

**API密钥格式：**
```
cmc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 第2步：获取Coinglass API密钥

**访问地址：** https://coinglass.com/pricing

**详细步骤：**
1. 访问定价页面
2. 选择 "Free" 计划
3. 填写注册信息（邮箱、密码）
4. 验证邮箱
5. 登录到Coinglass Dashboard
6. 找到 "API Key" 或 "API Management" 部分
7. 获取API密钥

**免费额度：**
- 1,000 requests/天
- 期货数据、资金费率等

**API密钥格式：**
```
一长串随机字符，类似：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

### 第3步：获取Nansen API密钥

**访问地址：** https://nansen.ai

**详细步骤：**
1. 访问Nansen官网
2. 点击右上角 "Get Started" 或 "Login"
3. 使用Google账户、Twitter或邮箱注册
4. 验证邮箱（如果使用邮箱注册）
5. 登录后进入Dashboard
6. 找到 "API Settings" 或 "API Keys"
7. 生成或查看API密钥

**免费额度：**
- 有限免费访问
- 鲸钱追踪、智能钱数据

**API密钥格式：**
```
一长串随机字符，通常很长
```

---

### 第4步：获取Dune API密钥（可选）

**访问地址：** https://www.dune.com/auth/login

**详细步骤：**
1. 访问Dune Analytics
2. 使用GitHub、Google或邮箱登录
3. 进入账户设置（Settings）
4. 找到 "API Keys" 部分
5. 点击 "Create New API Key"
6. 复制生成的API密钥

**免费额度：**
- 60 requests/分钟
- 自定义SQL查询

**API密钥格式：**
```
一长串随机字符
```

---

## ⚙️ 配置方法

### 方法1：使用自动化配置脚本（推荐）

```bash
cd /workspace/projects/workspace/skills/crypto-data-aggregator
bash scripts/full-api-config.sh
```

脚本会引导你：
1. 逐个输入API密钥
2. 自动创建配置文件
3. 备份原有配置
4. 提供测试建议

### 方法2：手动编辑配置文件

```bash
cd /workspace/projects/workspace/skills/crypto-data-aggregator
nano config/keys.js
```

编辑以下内容：

```javascript
module.exports = {
  // 替换为你的CoinMarketCap API密钥
  coinmarketcap: {
    apiKey: '你的CoinMarketCap密钥',
    baseUrl: 'https://pro-api.coinmarketcap.com/v1'
  },

  // 替换为你的Coinglass API密钥
  coinglass: {
    apiKey: '你的Coinglass密钥',
    baseUrl: 'https://open-api.coinglass.com'
  },

  // 替换为你的Nansen API密钥
  nansen: {
    apiKey: '你的Nansen密钥',
    baseUrl: 'https://api.nansen.ai'
  },

  // 替换为你的Dune API密钥（可选）
  dune: {
    apiKey: '你的Dune密钥',
    baseUrl: 'https://api.dune.com/api/v1'
  },

  // DefiLlama配置（无需修改）
  defillama: {
    baseUrl: 'https://api.llama.fi'
  },

  // Global settings（无需修改）
  settings: {
    defaultCacheDuration: 300,
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
    debug: process.env.DEBUG === 'true'
  }
};
```

保存文件（Ctrl+X, Y, Enter）

### 方法3：使用环境变量

```bash
# 创建环境变量文件
cd /workspace/projects/workspace/skills/crypto-data-aggregator
cat > .env << 'EOF'
COINMARKETCAP_API_KEY='你的CoinMarketCap密钥'
COINGLASS_API_KEY='你的Coinglass密钥'
NANSEN_API_KEY='你的Nansen密钥'
DUNE_API_KEY='你的Dune密钥'
EOF

# 加载环境变量
source .env
```

---

## 🧪 测试配置

### 测试所有平台

```bash
crypto-data test --all
```

预期输出：
```
Testing API connections...

✓ DEFILLAMA: Connected
✓ CMC: Connected
✓ COINGLASS: Connected
✓ NANSEN: Connected
✓ DUNE: Connected
```

### 测试特定平台

```bash
# 测试CoinMarketCap
crypto-data test --platform cmc

# 测试Coinglass
crypto-data test --platform coinglass

# 测试Nansen
crypto-data test --platform nansen
```

---

## 🚀 配置后的功能

### CoinMarketCap功能测试

```bash
# 获取代币价格
crypto-data cmc price --symbols BTC,ETH,SOL --format table

# 获取市场概览
crypto-data cmc overview --limit 20 --format table

# 获取代币信息
crypto-data cmc info --symbol BTC
```

### Coinglass功能测试

```bash
# 获取资金费率
crypto-data coinglass funding --symbol BTCUSDT --format table

# 获取清算数据
crypto-data coinglass liquidation --symbol BTCUSDT --period 24h --format table

# 获取多空比
crypto-data coinglass lsr --symbol BTCUSDT --exchange binance --format table
```

### Nansen功能测试

```bash
# 获取鲸鱼警报
crypto-data nansen whale --min-value 1000000 --format table

# 获取智能钱活动
crypto-data nansen smart-money --token ETH --limit 20 --format table

# 获取Gas追踪
crypto-data nansen gas-tracker --format pretty
```

---

## 🆘 故障排除

### 问题1：API密钥无效

**症状：**
```
✗ CMC: API error (401): Unauthorized
```

**解决方案：**
1. 检查API密钥是否正确复制
2. 确认API密钥没有多余的空格
3. 验证API密钥是否过期
4. 重新生成API密钥

### 问题2：配额限制

**症状：**
```
✗ CMC: API error (429): Rate limit exceeded
```

**解决方案：**
1. 使用缓存减少请求
2. 等待配额重置（通常每日重置）
3. 升级到付费计划

### 问题3：网络连接失败

**症状：**
```
✗ CMC: Network error: No response received from server
```

**解决方案：**
1. 检查网络连接
2. 验证API端点URL是否正确
3. 检查防火墙设置
4. 尝试使用VPN（如果有限制）

---

## 📊 配置完成后的功能对比

| 功能 | DefiLlama | CoinMarketCap | Coinglass | Nansen |
|------|-----------|---------------|-----------|---------|
| **当前状态** | ✅ 100%可用 | ⚠️ 需要配置 | ⚠️ 需要配置 | ⚠️ 需要配置 |
| **配置后** | ✅ 100%可用 | ✅ 100%可用 | ✅ 100%可用 | ✅ 100%可用 |

---

## 🎯 快速配置清单

配置前检查：
- [ ] 能够访问上述网站
- [ ] 有有效的邮箱地址
- [ ] 有时间完成注册（约15-30分钟）

配置步骤：
- [ ] 获取CoinMarketCap API密钥
- [ ] 获取Coinglass API密钥
- [ ] 获取Nansen API密钥
- [ ] 获取Dune API密钥（可选）
- [ ] 运行配置脚本
- [ ] 测试所有平台

配置后验证：
- [ ] 运行 `crypto-data test --all`
- [ ] 测试CoinMarketCap功能
- [ ] 测试Coinglass功能
- [ ] 测试Nansen功能

---

## 💡 重要提示

1. **不要分享API密钥** - API密钥是个人凭证，不要与他人分享
2. **定期更换密钥** - 为了安全，建议定期更换API密钥
3. **监控使用情况** - 在各平台Dashboard查看使用情况
4. **使用缓存** - 减少API调用，避免超限

---

## 🎉 配置完成后的完整功能

### 完整的多平台查询

```bash
# 查询BTC的所有平台信息
crypto-data overview --symbol BTC --platforms defillama,cmc,coinglass,nansen

# 查询ETH的多平台信息
crypto-data overview --symbol ETH --platforms defillama,cmc,coinglass

# 查询AAVE的完整信息
crypto-data overview --symbol AAVE --platforms defillama,cmc,coinglass,nansen
```

### 完整的聚合查询

```bash
# 从多个平台获取价格
crypto-data-agg price --symbols BTC,ETH,SOL,AVAX,MATIC --platforms cmc,defillama

# 从多个平台获取市场数据
crypto-data-agg market --platforms cmc,coinglass --limit 50

# 完整市场分析
crypto-data overview --symbol BTC --platforms defillama,cmc,coinglass,nansen --format json
```

---

## 📞 需要帮助？

如果配置过程中遇到问题：

1. **查看文档**
   ```bash
   cat FINAL_COMPLETE_REPORT.md
   cat API_STATUS.md
   ```

2. **运行帮助脚本**
   ```bash
   bash scripts/api-config-guide.sh
   ```

3. **检查配置**
   ```bash
   cat config/keys.js
   ```

---

## 🚀 开始配置

```bash
cd /workspace/projects/workspace/skills/crypto-data-aggregator

# 方法1: 使用自动化脚本（推荐）
bash scripts/full-api-config.sh

# 方法2: 手动配置
nano config/keys.js

# 配置完成后测试
crypto-data test --all
```

---

**配置完成后，你将拥有完整的4个平台数据访问能力！**

**预计配置时间：** 15-30分钟
**难度：** 简单
**成本：** 完全免费（使用免费额度）
