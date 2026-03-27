# 🚀 Crypto Data Aggregator - 完整功能手册

## 📊 平台概览

### ✅ 可用平台（8个）

| 平台 | 状态 | 免费额度 | 响应时间 | 特色功能 |
|------|------|----------|----------|----------|
| **DefiLlama** | ✅ 可用 | 无限制 | ~1.5s | TVL、协议数据、链统计 |
| **Binance** | ✅ 可用 | 1,200次/分钟 | ~0.5s | 币价、交易、K线（IP 直连） |
| **RWA.xyz** | ✅ 可用 | 需API Key | ~0.6s | RWA资产、市场总览 |
| **CryptoCompare** | ✅ 可用 | 10万credits/月 | ~0.8s | 价格、OHLC、历史数据 |
| **CoinLore** | ✅ 可用 | 无限制 | ~0.8s | 市场排名、全球统计 |
| **Blockchair** | ✅ 可用 | 3万次/月 | ~1.2s | 区块链统计、多链数据 |
| **Blockchain.info** | ✅ 可用 | 无限制 | ~0.7s | BTC价格、区块数据 |
| **MemPool.space** | ✅ 可用 | 无限制 | ~1.5s | BTC费用、内存池状态 |

---

## 🎯 核心功能

### 1️⃣ 数据聚合器（最强大功能）⭐

**智能聚合多个平台数据，自动选择最佳数据源**

```bash
crypto-data agg [command] [options]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `price` | 最佳可用价格 | `crypto-data agg price -s BTC -q USD` |
| `market` | 市场概览 | `crypto-data agg market` |
| `top` | 热门币种 | `crypto-data agg top -l 10` |
| `compare` | 跨平台价格对比 | `crypto-data agg compare -s BTC,ETH` |
| `btc` | BTC 网络状态 | `crypto-data agg btc` |
| `cache` | 缓存管理 | `crypto-data agg cache --clear` |

#### 使用示例

```bash
# 获取最佳价格（自动选择最快可用的平台）
crypto-data agg price -s BTC -q USD

# 市场概览（总市值、交易量、BTC/ETH占比）
crypto-data agg market

# Top 10 币种
crypto-data agg top -l 10

# 跨平台价格对比（BTC 和 ETH）
crypto-data agg compare -s BTC,ETH -q USD

# BTC 网络状态（区块高度、费用、算力）
crypto-data agg btc

# 查看缓存状态
crypto-data agg cache

# 清空缓存
crypto-data agg cache --clear

# 清理过期缓存
crypto-data agg cache --clean
```

#### 聚合器优势
- ✅ **智能切换**：自动选择最佳数据源
- ✅ **双层缓存**：内存 + 文件持久化缓存
- ✅ **容错能力**：自动 fallback 到备用平台
- ✅ **性能优化**：缓存命中时 <10ms

---

### 2️⃣ DefiLlama - DeFi 数据

```bash
crypto-data defillama [command]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `tvl` | DeFi 总锁仓量 | `crypto-data defillama tvl` |
| `protocol` | 单个协议 TVL | `crypto-data defillama protocol -p uniswap` |
| `protocols` | 所有协议列表 | `crypto-data defillama protocols` |
| `chain` | 链 TVL | `crypto-data defillama chain -c ethereum` |

#### 使用示例

```bash
# DeFi 总 TVL
crypto-data defillama tvl

# Uniswap 协议 TVL
crypto-data defillama protocol -p uniswap

# 获取所有协议
crypto-data defillama protocols -l 10

# Ethereum 链 TVL
crypto-data defillama chain -c ethereum
```

---

### 3️⃣ Binance - 币价与交易数据

```bash
crypto-data binance [command]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `ticker` | 24小时行情 | `crypto-data binance ticker` |
| `price` | 最新价格 | `crypto-data binance price -s BTCUSDT` |
| `depth` | 订单簿深度 | `crypto-data binance depth -s BTCUSDT` |
| `trades` | 最近交易 | `crypto-data binance trades -s BTCUSDT` |
| `top` | 涨跌幅榜 | `crypto-data binance top -l 10` |

#### 使用示例

```bash
# 获取 BTC/USDT 价格
crypto-data binance price -s BTCUSDT

# 24小时行情
crypto-data binance ticker -s BTCUSDT

# 订单簿深度
crypto-data binance depth -s BTCUSDT -l 20

# 最近交易
crypto-data binance trades -s BTCUSDT -l 10

# Top 10 涨幅
crypto-data binance top -l 10
```

---

### 4️⃣ RWA.xyz - 现实世界资产

```bash
crypto-data rwaxyz [command]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `overview` | 市场总览 | `crypto-data rwaxyz overview` |
| `top` | 热门 RWA 资产 | `crypto-data rwaxyz top -l 10` |
| `class` | 按类别筛选 | `crypto-data rwaxyz class -c treasuries` |
| `networks` | 网络统计 | `crypto-data rwaxyz networks` |
| `transfers` | 最近转账 | `crypto-data rwaxyz transfers -l 10` |

#### 使用示例

```bash
# RWA 市场总览
crypto-data rwaxyz overview

# Top 10 RWA 资产
crypto-data rwaxyz top -l 10

# 美债类资产
crypto-data rwaxyz class -c treasuries

# 网络统计
crypto-data rwaxyz networks -n Ethereum

# 最近大额转账
crypto-data rwaxyz transfers -l 5
```

#### 支持的资产类别
- `treasuries` - 美国国债
- `commodities` - 大宗商品
- `credit` - 私人信贷
- `funds` - 机构基金
- `bonds` - 企业债券
- `equity` - 股权
- `realestate` - 房地产

---

### 5️⃣ CryptoCompare - 价格与历史数据

```bash
crypto-data cryptocompare [command]
# 或简写: crypto-data cc [command]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `price` | 当前价格 | `crypto-data cc price -s BTC -t USD` |
| `multi` | 多币种价格 | `crypto-data cc multi -s BTC,ETH -t USD` |
| `top` | Top 币种 | `crypto-data cc top -l 50` |
| `history` | 历史数据 | `crypto-data cc history -s BTC -p day -l 30` |

#### 使用示例

```bash
# BTC 价格
crypto-data cc price -s BTC -t USD

# BTC 和 ETH 价格
crypto-data cc multi -s BTC,ETH -t USD,EUR

# Top 50 币种
crypto-data cc top -l 50

# 30天日线数据
crypto-data cc history -s BTC -p day -l 30

# 1小时K线数据
crypto-data cc history -s ETH -p hour -l 24
```

#### 支持的时间周期
- `minute` - 分钟K线
- `hour` - 小时K线
- `day` - 日K线

---

### 6️⃣ CoinLore - 市场数据

```bash
crypto-data coinlore [command]
# 或简写: crypto-data cl [command]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `tickers` | 币种列表 | `crypto-data cl tickers -l 100` |
| `coin` | 单个币种 | `crypto-data cl coin -i 90` |
| `global` | 全球市场 | `crypto-data cl global` |
| `gainers` | 涨幅榜 | `crypto-data cl gainers -l 10` |
| `losers` | 跌幅榜 | `crypto-data cl losers -l 10` |

#### 使用示例

```bash
# 前 100 个币种
crypto-data cl tickers -l 100

# 获取 BTC（ID: 90）
crypto-data cl coin -i 90

# 全球市场数据
crypto-data cl global

# Top 10 涨幅
crypto-data cl gainers -l 10

# Top 10 跌幅
crypto-data cl losers -l 10
```

---

### 7️⃣ Blockchair - 区块链数据

```bash
crypto-data blockchair [command]
# 或简写: crypto-data bc [command]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `stats` | 区块链统计 | `crypto-data bc stats -b bitcoin` |
| `blocks` | 最近区块 | `crypto-data bc blocks -b bitcoin -l 10` |
| `mempool` | 内存池 | `crypto-data bc mempool -b bitcoin` |
| `tx` | 交易详情 | `crypto-data bc tx -h <hash> -b bitcoin` |
| `address` | 地址信息 | `crypto-data bc address -a <address>` |

#### 使用示例

```bash
# Bitcoin 统计
crypto-data bc stats -b bitcoin

# Ethereum 统计
crypto-data bc stats -b ethereum

# 最近 10 个区块
crypto-data bc blocks -b bitcoin -l 10

# 交易详情
crypto-data bc tx -h 0x... -b ethereum

# 地址信息
crypto-data bc address -a bc1q... -b bitcoin
```

#### 支持的区块链
- `bitcoin`, `ethereum`, `dogecoin`, `bitcoin-cash`, `litecoin`, `solana`, 等更多

---

### 8️⃣ Blockchain.info - BTC 数据

```bash
crypto-data blockchaininfo [command]
# 或简写: crypto-data bi [command]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `ticker` | BTC 价格 | `crypto-data bi ticker` |
| `block` | 最新区块 | `crypto-data bi block` |
| `difficulty` | 难度 | `crypto-data bi difficulty` |
| `address` | 地址数据 | `crypto-data bi address -a <address>` |

#### 使用示例

```bash
# BTC 价格（多货币）
crypto-data bi ticker

# 最新区块
crypto-data bi block

# 难度变化
crypto-data bi difficulty -t 2weeks

# 地址数据
crypto-data bi address -a bc1q... -l 50
```

---

### 9️⃣ MemPool.space - BTC 网络状态

```bash
crypto-data mempool [command]
# 或简写: crypto-data mp [command]
```

#### 功能列表

| 命令 | 功能 | 示例 |
|------|------|------|
| `fees` | 推荐费用 | `crypto-data mp fees` |
| `blocks` | 内存池区块 | `crypto-data mp blocks` |
| `height` | 当前高度 | `crypto-data mp height` |
| `tx` | 交易详情 | `crypto-data mp tx -i <txid>` |
| `halving` | 减半倒计时 | `crypto-data mp halving` |
| `mining` | 挖矿统计 | `crypto-data mp mining` |
| `satoshi-prices` | Sat 价格 | `crypto-data mp satoshi-prices` |

#### 使用示例

```bash
# 推荐费用
crypto-data mp fees

# 内存池区块
crypto-data mp blocks

# 当前区块高度
crypto-data mp height

# 减半倒计时
crypto-data mp halving

# 挖矿统计
crypto-data mp mining

# 交易详情
crypto-data mp tx -i <txid>

# Sat 价格
crypto-data mp satoshi-prices -c usd
```

---

## 🔧 系统工具

### 健康检查
```bash
# 检查所有平台状态
crypto-data health

# 检查并显示详细信息
crypto-data health --verbose

# 仅检查健康平台
crypto-data health --healthy-only
```

### 系统状态
```bash
# 显示系统状态和建议
crypto-data status
```

### 缓存管理
```bash
# 查看聚合器缓存
crypto-data agg cache

# 清空缓存
crypto-data agg cache --clear

# 清理过期缓存
crypto-data agg cache --clean
```

### 测试连接
```bash
# 测试所有平台连接
crypto-data test

# 测试特定平台
crypto-data test --platform binance
```

### 币种概览
```bash
# 获取币种综合信息
crypto-data overview -s BTC -p defillama,cmc,coinglass

# 指定格式输出
crypto-data overview -s ETH -p defillama,cmc -f json
```

---

## 📤 输出格式

所有命令支持以下输出格式：

```bash
# 美化输出（默认）
crypto-data agg price -s BTC -f pretty

# JSON 格式
crypto-data agg price -s BTC -f json

# 表格格式
crypto-data agg price -s BTC -f table

# CSV 格式
crypto-data agg price -s BTC -f csv
```

---

## 🎯 常用场景

### 场景 1: 快速查询价格
```bash
# 最佳价格（自动选择最快平台）
crypto-data agg price -s BTC

# 多个币种价格对比
crypto-data agg compare -s BTC,ETH,SOL
```

### 场景 2: DeFi 研究
```bash
# DeFi 总 TVL
crypto-data defillama tvl

# 特定协议 TVL
crypto-data defillama protocol -p uniswap

# 链 TVL 对比
crypto-data defillama chain -c ethereum
crypto-data defillama chain -c solana
```

### 场景 3: RWA 投资
```bash
# RWA 市场总览
crypto-data rwaxyz overview

# 美债资产
crypto-data rwaxyz class -c treasuries

# 热门 RWA
crypto-data rwaxyz top -l 10
```

### 场景 4: BTC 网络监控
```bash
# BTC 网络状态（聚合）
crypto-data agg btc

# 当前费用
crypto-data mp fees

# 内存池状态
crypto-data mp blocks

# 区块高度
crypto-data mp height
```

### 场景 5: 市场分析
```bash
# 全球市场
crypto-data cl global

# 涨幅榜
crypto-data cl gainers -l 10

# 跌幅榜
crypto-data cl losers -l 10

# Top 币种
crypto-data agg top -l 20
```

---

## ⚡ 性能特性

| 特性 | 说明 |
|------|------|
| **双层缓存** | 内存缓存（30秒）+ 文件缓存（5分钟） |
| **智能切换** | 自动选择最佳数据源 |
| **错误重试** | 自动重试失败请求 |
| **容错能力** | 自动 fallback 到备用平台 |
| **缓存命中率** | 重复请求 ~90% |
| **API 优化** | 减少 50-80% API 调用 |

---

## 📊 命令速查表

| 功能 | 命令 |
|------|------|
| **最佳价格** | `crypto-data agg price -s BTC` |
| **市场概览** | `crypto-data agg market` |
| **Top 币种** | `crypto-data agg top -l 10` |
| **价格对比** | `crypto-data agg compare -s BTC,ETH` |
| **DeFi TVL** | `crypto-data defillama tvl` |
| **BTC 网络状态** | `crypto-data agg btc` |
| **RWA 市场** | `crypto-data rwaxyz overview` |
| **历史数据** | `crypto-data cc history -s BTC -p day -l 30` |
| **涨幅榜** | `crypto-data cl gainers -l 10` |
| **BTC 费用** | `crypto-data mp fees` |
| **区块统计** | `crypto-data bc stats -b bitcoin` |
| **健康检查** | `crypto-data health` |

---

## 🔍 更多帮助

```bash
# 查看主帮助
crypto-data --help

# 查看特定平台帮助
crypto-data binance --help
crypto-data agg --help

# 查看特定命令帮助
crypto-data agg price --help
crypto-data defillama tvl --help
```

---

## 💡 提示

1. **使用聚合器命令**：`crypto-data agg` 提供最智能的数据源选择
2. **利用缓存**：频繁查询相同数据时，自动使用缓存，速度更快
3. **格式选择**：使用 `-f json` 或 `-f csv` 方便数据处理
4. **健康检查**：定期运行 `crypto-data health` 确保平台可用性
5. **API Key 配置**：部分平台支持 API Key 以获得更高额度

---

**版本信息**：v1.0.0  
**可用平台**：8 个  
**总命令数**：60+  
**最后更新**：2026-03-26
