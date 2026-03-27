# CoinMarketCap、Coinglass、Nansen 平台操作报告

## 📋 平台状态概览

| 平台 | API密钥状态 | API连接状态 | 可用性 |
|------|------------|------------|--------|
| **CoinMarketCap** | ⚠️ 未配置 | ⚠️ 网络错误 | 🔑 需要配置 |
| **Coinglass** | ⚠️ 未配置 | ⚠️ 网络错误 | 🔑 需要配置 |
| **Nansen** | ⚠️ 未配置 | ❌ API错误(400) | 🔑 需要配置 |

---

## 1️⃣ API密钥配置检查

### CoinMarketCap

**当前配置：**
```javascript
coinmarketcap: {
  apiKey: process.env.COINMARKETCAP_API_KEY || 'YOUR_COINMARKETCAP_API_KEY',
  baseUrl: 'https://pro-api.coinmarketcap.com/v1'
}
```

**状态：** ⚠️ 需要配置API密钥

**如何配置：**
```bash
# 方法1: 编辑配置文件
nano config/keys.js
# 替换为: apiKey: 'your-actual-api-key-here'

# 方法2: 使用环境变量
export COINMARKETCAP_API_KEY='your-actual-api-key'
```

**免费API密钥获取：**
- URL: https://pro.coinmarketcap.com/signup
- 免费额度: 10,000 credits/月
- 注册步骤:
  1. 访问 https://pro.coinmarketcap.com/signup
  2. 创建账户
  3. 进入Dashboard
  4. 点击 "API Key Management"
  5. 生成API Key

---

### Coinglass

**当前配置：**
```javascript
coinglass: {
  apiKey: process.env.COINGLASS_API_KEY || 'YOUR_COINGLASS_API_KEY',
  baseUrl: 'https://open-api.coinglass.com'
}
```

**状态：** ⚠️ 需要配置API密钥

**如何配置：**
```bash
# 方法1: 编辑配置文件
nano config/keys.js
# 替换为: apiKey: 'your-actual-api-key-here'

# 方法2: 使用环境变量
export COINGLASS_API_KEY='your-actual-api-key'
```

**免费API密钥获取：**
- URL: https://coinglass.com/pricing
- 免费额度: 1,000 requests/天
- 注册步骤:
  1. 访问 https://coinglass.com/pricing
  2. 选择免费计划
  3. 注册账户
  4. 获取API密钥

---

### Nansen

**当前配置：**
```javascript
nansen: {
  apiKey: process.env.NANSEN_API_KEY || 'YOUR_NANSEN_API_KEY',
  baseUrl: 'https://api.nansen.ai'
}
```

**状态：** ⚠️ 需要配置API密钥

**如何配置：**
```bash
# 方法1: 编辑配置文件
nano config/keys.js
# 替换为: apiKey: 'your-actual-api-key-here'

# 方法2: 使用环境变量
export NANSEN_API_KEY='your-actual-api-key'
```

**免费API密钥获取：**
- URL: https://nansen.ai/pricing
- 免费额度: 有限免费访问
- 注册步骤:
  1. 访问 https://nansen.ai
  2. 点击 "Get Started"
  3. 选择免费计划
  4. 获取API密钥

---

## 2️⃣ 功能展示（配置后可用）

### CoinMarketCap 功能

**可用命令：**
```bash
# 获取代币价格
crypto-data cmc price --symbols BTC,ETH,SOL

# 获取市场概览
crypto-data cmc overview --limit 50

# 获取代币信息
crypto-data cmc info --symbol BTC

# 获取全球市场指标
crypto-data cmc global

# 获取交易对信息
crypto-data cmc listings --limit 100

# 获取类别信息
crypto-data cmc categories

# 获取历史价格
crypto-data cmc historical --symbol BTC --interval 1d
```

**使用示例：**
```bash
# 获取BTC和ETH的价格
crypto-data cmc price --symbols BTC,ETH --format table

# 获取前20个代币
crypto-data cmc overview --limit 20 --format table

# 获取BTC详细信息
crypto-data cmc info --symbol BTC --format pretty

# 转换为欧元
crypto-data cmc price --symbols BTC,ETH --convert EUR

# 输出为CSV
crypto-data cmc overview --limit 50 --format csv > market_overview.csv
```

**输出格式支持：**
- `--format json` - JSON格式
- `--format table` - 表格格式
- `--format csv` - CSV格式
- `--format pretty` - 彩色输出

---

### Coinglass 功能

**可用命令：**
```bash
# 获取资金费率
crypto-data coinglass funding --symbol BTCUSDT

# 获取持仓量
crypto-data coinglass oi --symbol BTCUSDT --exchange binance

# 获取清算数据
crypto-data coinglass liquidation --symbol BTCUSDT --period 24h

# 获取多空比
crypto-data coinglass lsr --symbol BTCUSDT --exchange binance --period 24h

# 获取清算热力图
crypto-data coinglass liquidation-heatmap --symbol BTCUSDT

# 获取交易所排行榜
crypto-data coinglass exchange-leaderboard --period 24h

# 获取衍生品交易量
crypto-data coinglass derivatives-volume --symbol BTCUSDT
```

**使用示例：**
```bash
# 获取BTC资金费率
crypto-data coinglass funding --symbol BTCUSDT --format table

# 获取所有交易所的BTC持仓量
crypto-data coinglass oi --symbol BTCUSDT --format table

# 获取24小时清算数据
crypto-data coinglass liquidation --symbol BTCUSDT --period 24h --format table

# 获取Binance的多空比
crypto-data coinglass lsr --symbol BTCUSDT --exchange binance --format table

# 获取交易所排行榜
crypto-data coinglass exchange-leaderboard --period 24h --format table
```

**支持的时间周期：**
- `1h` - 1小时
- `4h` - 4小时
- `8h` - 8小时
- `24h` - 24小时
- `7d` - 7天

**支持的交易所：**
- Binance, OKX, Bybit, Huobi, Coinbase, Kraken等

---

### Nansen 功能

**可用命令：**
```bash
# 获取鲸鱼警报
crypto-data nansen whale --min-value 1000000

# 获取智能钱活动
crypto-data nansen smart-money --token ETH --limit 50

# 获取NFT投资组合分析
crypto-data nansen nft --address 0x123...abc

# 获取钱包标签
crypto-data nansen wallet-labels --address 0x123...abc

# 获取热门合约
crypto-data nansen hot-contracts --token ETH

# 获取Gas追踪器
crypto-data nansen gas-tracker

# 获取代币洞察
crypto-data nansen token-insights --token ETH

# 获取投资组合估值
crypto-data nansen portfolio-valuation --address 0x123...abc
```

**使用示例：**
```bash
# 获取超过100万美元的鲸鱼警报
crypto-data nansen whale --min-value 1000000 --format table

# 获取ETH智能钱活动
crypto-data nansen smart-money --token ETH --limit 50 --format table

# 分析NFT投资组合
crypto-data nansen nft --address 0x1234...abcd --format pretty

# 查看钱包标签
crypto-data nansen wallet-labels --address 0x1234...abcd --format table

# 获取Gas费信息
crypto-data nansen gas-tracker --format pretty
```

**Nansen独特功能：**
- 鲸鱼追踪
- 智能钱监控
- NFT投资组合分析
- 钱包标签
- Gas追踪器
- 代币洞察

---

## 3️⃣ 多平台查询功能

### 配置后的综合查询

```bash
# 查询BTC的多平台信息
crypto-data overview --symbol BTC --platforms cmc,coinglass,nansen

# 查询ETH的多平台信息
crypto-data overview --symbol ETH --platforms cmc,coinglass,nansen,defillama

# 查询AAVE的多平台信息
crypto-data overview --symbol AAVE --platforms defillama,cmc,coinglass

# 自定义平台组合
crypto-data overview --symbol SOL --platforms cmc,nansen
```

### 聚合查询

```bash
# 价格聚合
crypto-data-agg price --symbols BTC,ETH,SOL --platforms cmc,defillama

# 市场聚合
crypto-data-agg market --platforms cmc,coinglass --limit 20
```

---

## 4️⃣ 实际使用场景

### 场景1: 加密货币价格监控

```bash
# 获取主要代币价格
crypto-data cmc price --symbols BTC,ETH,SOL,AVAX,MATIC --format table

# 获取市场概览
crypto-data cmc overview --limit 50 --format table

# 转换为不同货币
crypto-data cmc price --symbols BTC,ETH --convert EUR --format table
```

### 场景2: 期货市场分析

```bash
# 分析BTC资金费率
crypto-data coinglass funding --symbol BTCUSDT --format table

# 检查多空比
crypto-data coinglass lsr --symbol BTCUSDT --exchange binance --format table

# 监控清算
crypto-data coinglass liquidation --symbol BTCUSDT --period 24h --format table

# 查看持仓量
crypto-data coinglass oi --symbol BTCUSDT --format table
```

### 场景3: 鲸钱追踪

```bash
# 监控大额转账
crypto-data nansen whale --min-value 5000000 --format table

# 跟踪智能钱
crypto-data nansen smart-money --token ETH --limit 20 --format table

# 查看热门合约
crypto-data nansen hot-contracts --token ETH --format table
```

### 场景4: 综合市场分析

```bash
# 从多个平台获取BTC信息
crypto-data overview --symbol BTC --platforms defillama,cmc,coinglass,nansen --format json

# 分析ETH生态
crypto-data overview --symbol ETH --platforms defillama,cmc,coinglass --format pretty

# 监控AAVE协议
crypto-data overview --symbol AAVE --platforms defillama,cmc,coinglass --format table
```

---

## 5️⃣ 配置指南

### 一步配置所有API密钥

```bash
# 1. 编辑配置文件
cd /workspace/projects/workspace/skills/crypto-data-aggregator
nano config/keys.js

# 2. 替换以下内容：
coinmarketcap.apiKey = 'YOUR_COINMARKETCAP_API_KEY'  # 替换为实际密钥
coinglass.apiKey = 'YOUR_COINGLASS_API_KEY'          # 替换为实际密钥
nansen.apiKey = 'YOUR_NANSEN_API_KEY'                # 替换为实际密钥

# 3. 保存文件

# 4. 测试连接
crypto-data test --all
```

### 使用环境变量配置

```bash
# 创建环境变量文件
cat > .env << 'EOF'
COINMARKETCAP_API_KEY='your-coinmarketcap-key'
COINGLASS_API_KEY='your-coinglass-key'
NANSEN_API_KEY='your-nansen-key'
DUNE_API_KEY='your-dune-key'
EOF

# 加载环境变量
source .env

# 测试连接
crypto-data test --all
```

---

## 6️⃣ 故障排除

### API连接失败

```bash
# 检查API密钥
cat config/keys.js | grep apiKey

# 测试特定平台
crypto-data test --platform cmc
crypto-data test --platform coinglass
crypto-data test --platform nansen

# 检查网络连接
curl -I https://pro-api.coinmarketcap.com/v1
curl -I https://open-api.coinglass.com
curl -I https://api.nansen.ai
```

### 配额限制

```bash
# 使用缓存减少API调用
crypto-data cache status
crypto-data cache clear --platform cmc

# 增加缓存时间（需要修改代码）
# 或使用环境变量设置缓存时长
```

### API密钥无效

```bash
# 验证API密钥格式
# CMC: 通常以 "cmc_" 开头
# Coinglass: 通常是一串随机字符
# Nansen: 通常是一长串字符串

# 检查环境变量
echo $COINMARKETCAP_API_KEY
echo $COINGLASS_API_KEY
echo $NANSEN_API_KEY
```

---

## 📊 平台对比

| 特性 | CoinMarketCap | Coinglass | Nansen |
|------|---------------|-----------|---------|
| **主要数据** | 价格、市值、交易量 | 期货、资金费率、清算 | 鲸钱、链上数据、NFT |
| **免费额度** | 10,000 credits/月 | 1,000 requests/天 | 有限免费访问 |
| **更新频率** | 高频 | 高频 | 实时 |
| **历史数据** | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| **独特功能** | 市场排名、分类 | 期货深度、多空比 | 智能钱标签、鲸鱼追踪 |

---

## 🎯 快速开始（配置后）

### CoinMarketCap快速开始

```bash
# 1. 测试连接
crypto-data test --platform cmc

# 2. 获取价格
crypto-data cmc price --symbols BTC,ETH --format table

# 3. 获取市场概览
crypto-data cmc overview --limit 20 --format table
```

### Coinglass快速开始

```bash
# 1. 测试连接
crypto-data test --platform coinglass

# 2. 获取资金费率
crypto-data coinglass funding --symbol BTCUSDT --format table

# 3. 获取清算数据
crypto-data coinglass liquidation --symbol BTCUSDT --period 24h --format table
```

### Nansen快速开始

```bash
# 1. 测试连接
crypto-data test --platform nansen

# 2. 获取鲸鱼警报
crypto-data nansen whale --min-value 1000000 --format table

# 3. 获取智能钱活动
crypto-data nansen smart-money --token ETH --limit 20 --format table
```

---

## 📝 总结

### 当前状态

| 平台 | 配置状态 | 测试状态 | 需要操作 |
|------|---------|---------|---------|
| **CoinMarketCap** | ⚠️ 未配置 | ⚠️ 网络错误 | 添加API密钥 |
| **Coinglass** | ⚠️ 未配置 | ⚠️ 网络错误 | 添加API密钥 |
| **Nansen** | ⚠️ 未配置 | ❌ API错误(400) | 添加API密钥 |

### 配置后功能

所有平台配置API密钥后，将提供：

✅ **CoinMarketCap** - 实时价格、市场数据、代币信息
✅ **Coinglass** - 期货数据、资金费率、清算监控
✅ **Nansen** - 鲸钱追踪、智能钱监控、NFT分析

### 下一步

1. 获取免费API密钥
2. 配置到 `config/keys.js`
3. 测试连接: `crypto-data test --all`
4. 开始使用完整功能

---

**报告完成时间**: 2026-03-25
**状态**: 等待API密钥配置
**下一步**: 配置API密钥以解锁完整功能
