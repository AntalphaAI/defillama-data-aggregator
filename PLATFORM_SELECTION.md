# 🎯 Platform Selection Guide

## 概述

现在你可以灵活选择调用单个平台、多个平台或所有平台！

---

## 📋 可用平台

| 平台代码 | 平台名称 | 需要API密钥 | 主要数据类型 |
|----------|----------|------------|-------------|
| `defillama` | DefiLlama | ❌ 不需要 | DeFi TVL, 协议数据 |
| `cmc` | CoinMarketCap | ✅ 需要 | 价格, 市值, 交易量 |
| `coinglass` | Coinglass | ✅ 需要 | 期货数据, 资金费率 |
| `nansen` | Nansen | ✅ 需要 | 鲸鱼追踪, 智能钱 |
| `dune` | Dune Analytics | ✅ 需要 | 自定义SQL查询 |

---

## 🚀 使用方式

### 方式1: 调用单个平台

#### DefiLlama (免费!)
```bash
# 获取DeFi数据
crypto-data defillama tvl
crypto-data defillama protocols --limit 10
crypto-data defillama protocol --name aave
```

#### CoinMarketCap (需要API密钥)
```bash
# 获取价格数据
crypto-data cmc price --symbols BTC,ETH,SOL
crypto-data cmc overview --limit 20
crypto-data cmc info --symbol BTC
```

#### Coinglass (需要API密钥)
```bash
# 获取期货数据
crypto-data coinglass funding --symbol BTCUSDT
crypto-data coinglass oi --symbol BTCUSDT
crypto-data coinglass liquidation --symbol BTCUSDT
```

#### Nansen (需要API密钥)
```bash
# 获取链上数据
crypto-data nansen whale --min-value 1000000
crypto-data nansen smart-money --token ETH
```

#### Dune Analytics (需要API密钥)
```bash
# 运行SQL查询
crypto-data dune query --query-id 123456
crypto-data dune dashboards --limit 10
```

---

### 方式2: 调用多个平台 (overview命令)

```bash
# 查询特定平台的组合数据
crypto-data overview --symbol BTC --platforms defillama,cmc

# 只查询价格平台
crypto-data overview --symbol ETH --platforms cmc

# 查询所有可用平台
crypto-data overview --symbol SOL --platforms defillama,cmc,coinglass,nansen

# 自定义平台组合
crypto-data overview --symbol AAVE --platforms defillama,coinglass
```

**示例输出:**
```json
{
  "symbol": "BTC",
  "timestamp": "2026-03-25T14:35:00.000Z",
  "platforms": {
    "defillama": { ...protocol data... },
    "cmc": { ...price data... }
  }
}
```

---

### 方式3: 聚合查询 (aggregate命令)

#### 价格聚合
```bash
# 从多个平台获取价格
crypto-data-agg price --symbols BTC,ETH --platforms cmc,defillama

# 只从特定平台获取
crypto-data-agg price --symbols BTC --platforms cmc

# 比较多个平台的价格
crypto-data-agg price --symbols BTC --platforms cmc,defillama --format table
```

#### TVL聚合
```bash
# 从多个平台获取TVL
crypto-data-agg tvl --platforms defillama

# 获取特定协议
crypto-data-agg tvl --names aave,compound,uniswap --platforms defillama

# 获取特定链
crypto-data-agg tvl --chains ethereum,polygon,arbitrum --platforms defillama
```

#### 市场概览聚合
```bash
# 从多个平台获取市场概览
crypto-data-agg market --platforms cmc,defillama --limit 20

# 只从CoinMarketCap获取
crypto-data-agg market --platforms cmc --limit 50

# 只从DefiLlama获取
crypto-data-agg market --platforms defillama --limit 10
```

---

## 🎯 实际使用场景

### 场景1: 快速检查单个平台
```bash
# 只看DefiLlama数据 (免费!)
crypto-data defillama protocols --limit 10 --format table
```

### 场景2: 获取代币的多平台综合信息
```bash
# 从多个平台查看BTC信息
crypto-data overview --symbol BTC --platforms defillama,cmc,coinglass
```

### 场景3: 比较价格数据
```bash
# 从多个平台获取并比较价格
crypto-data-agg price --symbols BTC,ETH,SOL --platforms cmc,defillama --format table
```

### 场景4: 只使用免费平台
```bash
# 只使用不需要API密钥的平台
crypto-data overview --symbol ETH --platforms defillama
```

### 场景5: 特定类型数据
```bash
# 只获取期货数据
crypto-data coinglass funding --symbol BTCUSDT --format table

# 只获取价格数据
crypto-data cmc price --symbols BTC,ETH --format table

# 只获取DeFi数据
crypto-data defillama protocols --category lending --limit 10
```

---

## 📊 平台组合示例

### 组合1: 基础市场数据 (免费)
```bash
# 只使用DefiLlama
crypto-data overview --symbol BTC --platforms defillama
```

### 组合2: 完整市场数据 (需要API密钥)
```bash
# 使用所有相关平台
crypto-data overview --symbol ETH --platforms defillama,cmc,coinglass,nansen
```

### 组合3: 价格和DeFi数据
```bash
# 价格 + DeFi TVL
crypto-data overview --symbol SOL --platforms defillama,cmc
```

### 组合4: 期货和链上数据
```bash
# 期货数据 + 智能钱
crypto-data overview --symbol AAVE --platforms coinglass,nansen
```

---

## 🔄 缓存管理 (支持平台选择)

```bash
# 清除特定平台的缓存
crypto-data cache clear --platform defillama

# 清除所有缓存
crypto-data cache clear --all

# 查看特定平台的缓存状态
crypto-data cache status --platform cmc

# 查看所有平台的缓存状态
crypto-data cache status
```

---

## 🧪 API测试 (支持平台选择)

```bash
# 测试特定平台
crypto-data test --platform defillama
crypto-data test --platform cmc
crypto-data test --platform coinglass

# 测试所有平台
crypto-data test --all
```

---

## 💡 最佳实践

### 1. 优先使用免费平台
```bash
# DefiLlama是免费的，优先使用
crypto-data defillama protocols --limit 10
```

### 2. 按需添加平台
```bash
# 先用免费平台，不够再加
crypto-data overview --symbol BTC --platforms defillama
# 如果需要价格数据
crypto-data overview --symbol BTC --platforms defillama,cmc
```

### 3. 批量查询时使用聚合命令
```bash
# 查询多个代币的价格
crypto-data-agg price --symbols BTC,ETH,SOL,AVAX,MATIC --platforms cmc
```

### 4. 使用表格格式查看比较数据
```bash
# 表格格式更适合比较
crypto-data defillama protocols --limit 10 --format table
crypto-data-agg price --symbols BTC,ETH --platforms cmc,defillama --format table
```

---

## 📝 输出格式选择

所有命令都支持多种输出格式：

```bash
# JSON格式 (默认，适合程序处理)
crypto-data defillama protocols --format json

# 表格格式 (适合人类查看)
crypto-data defillama protocols --format table

# CSV格式 (适合导入Excel)
crypto-data defillama protocols --format csv > protocols.csv

# Pretty格式 (彩色输出)
crypto-data defillama protocols --format pretty
```

---

## 🆘 常见问题

### Q: 如何知道哪些平台需要API密钥？
A: 查看上表，只有DefiLlama不需要API密钥。

### Q: 可以同时查询所有平台吗？
A: 可以，使用 `--platforms defillama,cmc,coinglass,nansen,dune`

### Q: 某个平台失败了怎么办？
A: 系统会返回错误信息，其他平台的数据仍会正常显示。

### Q: 如何只使用免费平台？
A: 只包含 `defillama` 在平台列表中即可。

### Q: 聚合命令和overview命令有什么区别？
A: `overview` 是获取单个代币的综合信息，`aggregate` 是从多个平台获取相同类型的数据（如价格、TVL）。

---

## 🎓 进阶技巧

### 1. 创建自定义工作流脚本
```bash
#!/bin/bash
# 检查特定代币的市场状态
TOKEN="BTC"
echo "=== Market Overview for $TOKEN ==="
crypto-data overview --symbol $TOKEN --platforms defillama,cmc --format table
echo ""
echo "=== Funding Rates ==="
crypto-data coinglass funding --symbol ${TOKEN}USDT --format table
```

### 2. 使用环境变量管理API密钥
```bash
export COINMARKETCAP_API_KEY='your-key'
export COINGLASS_API_KEY='your-key'
# 然后直接使用命令
crypto-data cmc price --symbols BTC
```

### 3. 定期数据采集
```bash
# 每小时采集一次市场数据
while true; do
  crypto-data-agg market --platforms defillama,cmc --format csv >> market_data.csv
  sleep 3600
done
```

---

**Happy Querying! 🚀**
