# 🚀 DefiLlama Data Aggregator - 完整功能列表

> **版本**: v1.0.1
> **更新日期**: 2026-03-27
> **平台**: DefiLlama API

---

## 📋 功能概览

本工具提供以下核心功能模块：

| 模块 | 命令数量 | 功能描述 |
|------|---------|---------|
| **DeFi TVL** | 2 | 全网总 TVL + 协议 TVL |
| **协议数据** | 2 | 协议列表 + 协议详情 |
| **链数据** | 1 | 单链 TVL 查询 |
| **收益池** | 1 | 收益率查询 |
| **健康监控** | 2 | API 健康检查 + 系统状态 |
| **输出格式** | 4 | Pretty / Table / JSON / CSV |
| **总计** | **12** | 完整的 DeFi 数据查询能力 |

---

## 🎯 核心命令详解

### 1️⃣ DeFi TVL 查询

#### 1.1 获取全网总 TVL

**命令：**
```bash
defillama-data defillama tvl [options]
```

**选项：**
| 选项 | 说明 | 默认值 | 可选值 |
|------|------|--------|--------|
| `-f, --format <type>` | 输出格式 | pretty | json, table, csv, pretty |

**返回数据：**
```json
{
  "totalTvl": 94518602394.26,
  "chains": [
    {
      "gecko_id": "ethereum",
      "tvl": 54262764124.80,
      "tokenSymbol": "ETH",
      "name": "Ethereum",
      "chainId": 1
    },
    // ... 更多链
  ],
  "timestamp": "2026-03-27T09:00:00.000Z"
}
```

**使用示例：**
```bash
# 默认美化输出
defillama-data defillama tvl

# JSON 格式
defillama-data defillama tvl -f json

# 只获取总 TVL
defillama-data defillama tvl -f json | jq '.totalTvl'

# 获取前 10 个链的 TVL
defillama-data defillama tvl -f json | jq '.chains[:10]'
```

**应用场景：**
- 监控 DeFi 市场整体规模
- 追踪链上资金流入/流出
- 市场趋势分析
- 报告生成

---

#### 1.2 获取协议 TVL

**命令：**
```bash
defillama-data defillama protocol -n <name> [options]
```

**必填参数：**
| 参数 | 说明 | 示例 |
|------|------|------|
| `-n, --name <name>` | 协议名称（必填） | aave, uniswap, compound |

**输入验证规则：**
- 只允许字母、数字和连字符
- 长度限制：1-50 字符
- 自动转换为小写

**选项：**
| 选项 | 说明 | 默认值 | 可选值 |
|------|------|--------|--------|
| `-f, --format <type>` | 输出格式 | pretty | json, table, csv, pretty |

**返回数据：**
```json
{
  "id": "parent#aave",
  "name": "Aave",
  "url": "https://aave.com",
  "description": "Aave is an Open Source and Non-Custodial protocol to earn interest on deposits and borrow assets",
  "symbol": "AAVE",
  "tvl": 1234567890.12,
  "chains": ["Ethereum", "Arbitrum", "Polygon"],
  "gecko_id": "aave",
  "category": "Lending"
}
```

**使用示例：**
```bash
# 查询 Aave 协议
defillama-data defillama protocol -n aave

# 查询 Uniswap 协议（JSON 格式）
defillama-data defillama protocol -n uniswap -f json

# 查询 Compound 协议
defillama-data defillama protocol -n compound

# 提取协议 TVL
defillama-data defillama protocol -n aave -f json | jq '.tvl'
```

**常见协议名称：**
| 协议 | 名称 | 类别 |
|------|------|------|
| Aave | aave | Lending |
| Uniswap | uniswap | DEX |
| Compound | compound | Lending |
| MakerDAO | maker | Lending |
| Lido | lido | Liquid Staking |
| Curve | curve | DEX |
| PancakeSwap | pancakeswap | DEX |
| AAVE V2 | aave-v2 | Lending |
| AAVE V3 | aave-v3 | Lending |

**应用场景：**
- 监控特定协议的资金规模
- 协议竞争力分析
- 投资决策支持
- 风险评估

---

### 2️⃣ 协议列表查询

#### 2.1 获取所有协议

**命令：**
```bash
defillama-data defillama protocols [options]
```

**选项：**
| 选项 | 说明 | 默认值 | 可选值 | 验证规则 |
|------|------|--------|--------|----------|
| `-c, --category <name>` | 按类别筛选 | 无 | lending, dex, derivatives | 字母+空格+连字符 |
| `--min-tvl <amount>` | 最小 TVL（USD） | 无 | 0 - Infinity | 数值范围验证 |
| `--limit <number>` | 限制结果数量 | 无 | 1 - 500 | 范围验证 |
| `--sort <field>` | 排序字段 | tvl | tvl, volume | 只支持这两项 |
| `-f, --format <type>` | 输出格式 | pretty | json, table, csv, pretty | - |

**返回数据：**
```json
[
  {
    "id": "2269",
    "name": "Binance CEX",
    "symbol": "BNB",
    "tvlUsd": 5357760814.76,
    "category": "CEX",
    "chains": ["Ethereum", "Bitcoin", "Binance", "Solana"],
    "url": "https://www.binance.com"
  },
  // ... 更多协议
]
```

**使用示例：**
```bash
# 获取所有协议（默认 50 个）
defillama-data defillama protocols

# 按 TVL 排序，获取前 20 个
defillama-data defillama protocols --sort tvl --limit 20

# 筛选借贷协议，TVL > $100M
defillama-data defillama protocols -c lending --min-tvl 100000000

# 筛选 DEX 协议，前 10 个
defillama-data defillama protocols -c dex --limit 10

# 导出前 100 个协议到 CSV
defillama-data defillama protocols --limit 100 -f csv > protocols.csv

# 筛选所有借贷协议并按 TVL 排序
defillama-data defillama protocols -c lending --sort tvl --limit 50 -f table

# 获取 TVL > $1B 的协议
defillama-data defillama protocols --min-tvl 1000000000 --limit 50

# 组合筛选：借贷协议，TVL > $100M，前 20 个
defillama-data defillama protocols -c lending --min-tvl 100000000 --limit 20 -f table
```

**常见协议类别：**
| 类别 | 英文 | 说明 |
|------|------|------|
| 借贷 | lending | Aave, Compound, MakerDAO |
| 去中心化交易所 | dex | Uniswap, Curve, PancakeSwap |
| 衍生品 | derivatives | dYdX, GMX, Synthetix |
| 流动性质押 | liquid staking | Lido, Rocket Pool |
| 桥梁 | bridge | Hop, Stargate, Across |
| 收益聚合器 | yield | Yearn, Beefy, AutoFarm |
| 资产管理 | asset management | Index Coop, Set Protocol |
| 托管交易所 | CEX | Binance, Coinbase, Kraken |
| 预言机 | oracle | Chainlink, UMA, Tellor |
| 稳定币 | stablecoin | USDT, USDC, DAI |

**应用场景：**
- 协议排名分析
- 类别市场研究
- 竞争对手分析
- 市场份额计算
- 数据导出和分析

---

### 3️⃣ 链数据查询

#### 3.1 获取单链 TVL

**命令：**
```bash
defillama-data defillama chain -n <name> [options]
```

**必填参数：**
| 参数 | 说明 | 示例 |
|------|------|------|
| `-n, --name <name>` | 链名称（必填） | ethereum, solana, polygon |

**输入验证规则：**
- 允许字母、数字、空格和连字符
- 长度限制：1-50 字符

**选项：**
| 选项 | 说明 | 默认值 | 可选值 |
|------|------|--------|--------|
| `-f, --format <type>` | 输出格式 | pretty | json, table, csv, pretty |

**返回数据：**
```json
{
  "name": "Ethereum",
  "gecko_id": "ethereum",
  "tokenSymbol": "ETH",
  "tvl": 54262764124.80,
  "chainId": 1
}
```

**使用示例：**
```bash
# 查询以太坊 TVL
defillama-data defillama chain -n ethereum

# 查询 Solana TVL
defillama-data defillama chain -n solana

# 查询 Polygon TVL
defillama-data defillama chain -n polygon

# 查询 Arbitrum TVL（JSON 格式）
defillama-data defillama chain -n arbitrum -f json

# 查询 Base TVL
defillama-data defillama chain -n base

# 提取链 TVL
defillama-data defillama chain -n ethereum -f json | jq '.tvl'

# 批量查询多个链
for chain in ethereum solana polygon arbitrum avalanche; do
  echo "=== $chain ==="
  defillama-data defillama chain -n $chain -f json | jq '.tvl'
done
```

**常见链名称：**
| 链 | 英文名 | TVL 排名（示例） |
|------|--------|-----------------|
| 以太坊 | ethereum | #1 |
| Tron | tron | #2 |
| BSC | bsc | #3 |
| Solana | solana | #4 |
| Arbitrum | arbitrum | #5 |
| Avalanche | avalanche | #6 |
| Polygon | polygon | #7 |
| Optimism | optimism | #8 |
| Base | base | #9 |
| Bitcoin | bitcoin | #10 |

**应用场景：**
- 链生态规模监控
- 跨链资金流动分析
- L1 vs L2 竞争分析
- 链排名追踪

---

### 4️⃣ 收益池查询

#### 4.1 获取收益池

**命令：**
```bash
defillama-data defillama yields [options]
```

**选项：**
| 选项 | 说明 | 默认值 | 可选值 | 验证规则 |
|------|------|--------|--------|----------|
| `--min-apy <number>` | 最小 APY（百分比） | 0 | 0 - 1000 | 范围验证 |
| `--min-tvl <number>` | 最小 TVL（USD） | 无 | 0 - Infinity | 数值范围验证 |
| `--chain <name>` | 按链筛选 | 无 | 任意链 | 字母+空格+连字符 |
| `--stablecoin` | 只显示稳定币池 | false | - | 布尔标志 |
| `--limit <number>` | 限制结果数量 | 50 | 1 - 500 | 范围验证 |
| `-f, --format <type>` | 输出格式 | pretty | json, table, csv, pretty | - |

**返回数据：**
```json
[
  {
    "chain": "Ethereum",
    "project": "Aave",
    "symbol": "USDC",
    "tvlUsd": 1000000000,
    "apy": 5.23,
    "apyBase": 4.5,
    "apyReward": 0.73,
    "stablecoin": true,
    "pool": "USDC lending"
  },
  // ... 更多池
]
```

**使用示例：**
```bash
# 获取所有收益池
defillama-data defillama yields

# 获取 APY > 10% 的池
defillama-data defillama yields --min-apy 10

# 获取以太坊上 APY > 10% 的池
defillama-data defillama yields --chain ethereum --min-apy 10

# 获取 TVL > $1M 的稳定币池
defillama-data defillama yields --min-tvl 1000000 --stablecoin

# 获取 Arbitrum 上 TVL > $1M，APY > 5% 的池，前 20 个
defillama-data defillama yields --chain arbitrum --min-tvl 1000000 --min-apy 5 --limit 20

# 导出高收益池到 CSV
defillama-data defillama yields --min-apy 10 --limit 100 -f csv > yields.csv

# 只显示稳定币池
defillama-data defillama yields --stablecoin --limit 20 -f table

# 获取以太坊上所有收益池
defillama-data defillama yields --chain ethereum --limit 50

# 组合筛选：以太坊 + 稳定币 + APY > 5% + TVL > $1M
defillama-data defillama yields --chain ethereum --stablecoin --min-apy 5 --min-tvl 1000000 --limit 20 -f table
```

**常见收益类型：**
| 类型 | APY 范围 | 风险等级 | 示例 |
|------|---------|---------|------|
| 稳定币借贷 | 2-10% | 低 | Aave USDC, Compound DAI |
| 单币质押 | 1-20% | 低-中 | Lido ETH, Rocket Pool ETH |
| 流动性挖矿 | 10-100% | 高 | Uniswap LP, Curve LP |
| 衍生品收益 | 5-30% | 高 | dYdX, GMX |
| 跨链桥收益 | 5-15% | 中 | Hop, Stargate |

**应用场景：**
- 寻找高收益机会
- 收益率比较
- 投资组合优化
- 风险评估
- 收益追踪

---

### 5️⃣ 健康监控

#### 5.1 API 健康检查

**命令：**
```bash
defillama-data health [options]
```

**选项：**
| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-q, --quiet` | 简洁模式（只显示摘要） | false |
| `--timeout <ms>` | 请求超时（毫秒） | 5000 |

**返回数据（默认模式）：**
```json
{
  "DefiLlama": {
    "healthy": true
  }
}
```

**返回数据（简洁模式）：**
```
Healthy: 1 | Unhealthy: 0 | Total: 1
```

**使用示例：**
```bash
# 完整健康检查
defillama-data health

# 简洁模式
defillama-data health --quiet

# 自定义超时（10秒）
defillama-data health --timeout 10000

# JSON 格式（用于脚本）
defillama-data health 2>/dev/null | jq '.DefiLlama.healthy'

# 定时检查
watch -n 60 'defillama-data health --quiet'

# 脚本中使用（不健康时报警）
if ! defillama-data health 2>/dev/null | jq -e '.DefiLlama.healthy'; then
  echo "API is unhealthy!"
  exit 1
fi
```

**应用场景：**
- API 可用性监控
- 自动化报警
- 服务健康检查
- 运维监控

---

#### 5.2 系统状态

**命令：**
```bash
defillama-data status
```

**返回数据：**
```
📊 System Status

✓ Available Platforms:
  - DefiLlama (DeFi data aggregator)

Recommendations:
  All platforms are configured and ready to use!
  Run `defillama-data health` to check real-time status
```

**使用示例：**
```bash
# 查看系统状态
defillama-data status

# 定时检查系统状态
watch -n 300 'defillama-data status'

# 结合健康检查
echo "=== System Status ===" && defillama-data status
echo "=== Health Check ===" && defillama-data health --quiet
```

**应用场景：**
- 系统配置检查
- 可用平台列表
- 故障排查
- 运维概览

---

## 📤 输出格式详解

### 1. Pretty（美化输出）

**特点：**
- 人类可读
- 彩色输出
- 格式化数字
- 适合终端查看

**示例：**
```bash
defillama-data defillama tvl -f pretty
```

**输出：**
```
Total DeFi TVL: $94,518,602,394

Top Chains:
1. Ethereum - $54,262,764,125
2. Tron - $4,073,972,361
3. BSC - $5,357,760,815
...
```

---

### 2. Table（表格格式）

**特点：**
- 结构化表格
- 列对齐
- 适合比较
- 支持大量数据

**示例：**
```bash
defillama-data defillama protocols --limit 10 -f table
```

**输出：**
```
┌─────────────────────┬──────────┬─────────────────┬──────────────┐
│ Name                │ Symbol   │ TVL (USD)       │ Category     │
├─────────────────────┼──────────┼─────────────────┼──────────────┤
│ Binance CEX         │ BNB      │ 5,357,760,815   │ CEX          │
│ Lido                │ LDO      │ 35,000,000,000  │ Liquid Stake │
│ Aave                │ AAVE     │ 15,000,000,000  │ Lending      │
└─────────────────────┴──────────┴─────────────────┴──────────────┘
```

---

### 3. JSON（JSON 格式）

**特点：**
- 机器可读
- 结构化数据
- 适合脚本
- 易于解析

**示例：**
```bash
defillama-data defillama tvl -f json | jq '.totalTvl'
```

**输出：**
```json
{
  "totalTvl": 94518602394.26,
  "chains": [...],
  "timestamp": "2026-03-27T09:00:00.000Z"
}
```

**使用 jq 进行数据处理：**
```bash
# 提取总 TVL
defillama-data defillama tvl -f json | jq '.totalTvl'

# 提取前 5 个链
defillama-data defillama tvl -f json | jq '.chains[:5]'

# 计算以太坊占比
defillama-data defillama tvl -f json | jq '.chains[] | select(.name=="Ethereum") | .tvl / .totalTvl * 100'

# 按链名排序
defillama-data defillama tvl -f json | jq '.chains | sort_by(.tvl) | reverse'

# 获取特定链的 TVL
defillama-data defillama tvl -f json | jq '.chains[] | select(.name=="Ethereum")'
```

---

### 4. CSV（CSV 格式）

**特点：**
- 电子表格友好
- 易于导入
- 批量处理
- 数据分析

**示例：**
```bash
# 导出协议列表
defillama-data defillama protocols --limit 100 -f csv > protocols.csv

# 导出收益池
defillama-data defillama yields --min-apy 10 -f csv > yields.csv

# 导出链数据（需要先获取完整列表）
defillama-data defillama tvl -f json | jq '.chains' | jq -r '.[] | [.name, .tvl, .tokenSymbol] | @csv' > chains.csv
```

**CSV 导入示例：**
```python
# Python
import pandas as pd
df = pd.read_csv('protocols.csv')
print(df.head())
```

```r
# R
df <- read.csv('protocols.csv')
head(df)
```

---

## 🔒 安全特性

### 输入验证

所有用户输入都经过严格验证：

| 输入类型 | 验证规则 | 长度限制 |
|---------|---------|---------|
| 协议名称 | 字母、数字、连字符 | 1-50 字符 |
| 链名称 | 字母、数字、空格、连字符 | 1-50 字符 |
| 类别名称 | 字母、数字、空格、连字符 | 1-50 字符 |
| Limit | 1-500 | - |
| Min APY | 0-1000% | - |
| Min TVL | 0 - Infinity | - |

**无效输入示例：**
```bash
# ❌ 包含特殊字符（会被拒绝）
defillama-data defillama protocol -n "aave<script>"

# ❌ 包含非法字符（会被拒绝）
defillama-data defillama protocol -n "uni/swap"

# ❌ 超出范围（会被拒绝）
defillama-data defillama protocols --limit 600

# ❌ 无效的排序字段（会被拒绝）
defillama-data defillama protocols --sort invalid_field
```

**有效输入示例：**
```bash
# ✅ 有效输入
defillama-data defillama protocol -n aave
defillama-data defillama protocol -n uniswap-v3
defillama-data defillama protocols --limit 50
defillama-data defillama yields --min-apy 10
```

---

### 错误处理

所有错误都经过分类和净化：

| 错误类型 | 显示内容 | 安全措施 |
|---------|---------|---------|
| API 错误 (4xx) | 状态码 + 简化消息 | 过滤敏感信息 |
| API 错误 (5xx) | 状态码 + 简化消息 | 过滤敏感信息 |
| 网络错误 | 错误类型 + 建议 | 无敏感信息 |
| 验证错误 | 验证规则 + 示例 | 无敏感信息 |

**错误消息示例：**
```
❌ Error occurred at 2026-03-27T09:00:00.000Z

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Application Error:
Invalid protocol name: "aave<script>". Only alphanumeric characters and hyphens are allowed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 💡 高级使用场景

### 场景 1：每日 DeFi 市场报告

```bash
#!/bin/bash
# daily-defi-report.sh

DATE=$(date +%Y-%m-%d)
REPORT_FILE="defi-report-$DATE.txt"

echo "=== DeFi Market Report - $DATE ===" > $REPORT_FILE
echo "" >> $REPORT_FILE

echo "1. Total DeFi TVL:" >> $REPORT_FILE
defillama-data defillama tvl -f json | jq -r '.totalTvl | "$\(.) USD"' >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "2. Top 10 Chains by TVL:" >> $REPORT_FILE
defillama-data defillama tvl -f json | jq -r '.chains[:10] | .[] | "\(.name): $\(.) USD"' >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "3. Top 10 Protocols by TVL:" >> $REPORT_FILE
defillama-data defillama protocols --limit 10 --sort tvl -f json | jq -r '.[] | "\(.name): $\(.) USD"' >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "4. Top 10 Yield Pools:" >> $REPORT_FILE
defillama-data defillama yields --limit 10 -f json | jq -r '.[] | "\(.chain) - \(.project) - \(.symbol): \(.apy)% APY"' >> $REPORT_FILE

cat $REPORT_FILE
```

---

### 场景 2：实时监控脚本

```python
#!/usr/bin/env python3
# defi_monitor.py
import subprocess
import json
import time

def get_total_tvl():
    result = subprocess.run(
        ['defillama-data', 'defillama', 'tvl', '-f', 'json'],
        capture_output=True,
        text=True
    )
    return json.loads(result.stdout)

def get_protocol_tvl(protocol_name):
    result = subprocess.run(
        ['defillama-data', 'defillama', 'protocol', '-n', protocol_name, '-f', 'json'],
        capture_output=True,
        text=True
    )
    return json.loads(result.stdout)

# 监控特定协议
protocols = ['aave', 'uniswap', 'compound']

while True:
    print("\n=== DeFi Monitor ===", flush=True)
    
    # 获取总 TVL
    total_tvl = get_total_tvl()
    print(f"Total TVL: ${total_tvl['totalTvl']:,.2f}", flush=True)
    
    # 获取协议 TVL
    for protocol in protocols:
        try:
            data = get_protocol_tvl(protocol)
            tvl = data.get('tvl', 0)
            print(f"{protocol.title()}: ${tvl:,.2f}", flush=True)
        except Exception as e:
            print(f"{protocol.title()}: Error", flush=True)
    
    time.sleep(300)  # 每 5 分钟更新一次
```

---

### 场景 3：数据分析流程

```bash
#!/bin/bash
# defi-analysis.sh

# 1. 导出数据
echo "Exporting data..."
defillama-data defillama protocols --limit 500 -f csv > protocols.csv
defillama-data defillama yields --limit 500 -f csv > yields.csv

# 2. 数据清洗（使用 Python）
python3 << 'EOF'
import pandas as pd

# 加载数据
protocols = pd.read_csv('protocols.csv')
yields = pd.read_csv('yields.csv')

# 数据清洗
protocols = protocols[protocols['tvlUsd'] > 0]
yields = yields[yields['apy'] > 0]

# 统计分析
print("=== Protocol Statistics ===")
print(f"Total protocols: {len(protocols)}")
print(f"Total TVL: ${protocols['tvlUsd'].sum():,.2f}")
print(f"Average TVL: ${protocols['tvlUsd'].mean():,.2f}")

print("\n=== Category Distribution ===")
print(protocols.groupby('category')['tvlUsd'].sum().sort_values(ascending=False))

print("\n=== Top 10 Yield Pools ===")
print(yields.nlargest(10, 'apy')[['chain', 'project', 'symbol', 'apy', 'tvlUsd']])

# 保存清洗后的数据
protocols.to_csv('protocols_cleaned.csv', index=False)
yields.to_csv('yields_cleaned.csv', index=False)
EOF

echo "Analysis complete!"
```

---

### 场景 4：投资组合追踪

```bash
#!/bin/bash
# portfolio-tracker.sh

# 定义投资组合
declare -A portfolio=(
    ["aave"]=100000
    ["uniswap"]=50000
    ["lido"]=30000
    ["compound"]=20000
)

echo "=== Portfolio Tracker ==="
echo ""

total_invested=0
total_current=0

for protocol in "${!portfolio[@]}"; do
    invested=${portfolio[$protocol]}
    total_invested=$((total_invested + invested))
    
    # 获取当前 TVL（作为价格代理）
    tvl=$(defillama-data defillama protocol -n $protocol -f json | jq '.tvl')
    
    # 计算当前价值（简化模型）
    current_value=$invested
    total_current=$((total_current + current_value))
    
    profit=$((current_value - invested))
    profit_percent=$((profit * 100 / invested))
    
    echo "$protocol:"
    echo "  Invested: $$invested"
    echo "  Current: $$current_value"
    echo "  Profit: $$$$profit ($profit_percent%)"
    echo ""
done

echo "=== Summary ==="
echo "Total Invested: $$total_invested"
echo "Total Current: $$total_current"
echo "Total Profit: $$$$((total_current - total_invested))"
```

---

## 📊 命令速查表

| 功能 | 命令 | 核心选项 |
|------|------|---------|
| **全网 TVL** | `defillama-data defillama tvl` | `-f json\|table\|csv\|pretty` |
| **协议 TVL** | `defillama-data defillama protocol -n <name>` | `-f json\|table\|csv\|pretty` |
| **协议列表** | `defillama-data defillama protocols` | `-c <category>`, `--min-tvl`, `--limit`, `--sort` |
| **链 TVL** | `defillama-data defillama chain -n <name>` | `-f json\|table\|csv\|pretty` |
| **收益池** | `defillama-data defillama yields` | `--min-apy`, `--min-tvl`, `--chain`, `--stablecoin` |
| **健康检查** | `defillama-data health` | `--quiet`, `--timeout` |
| **系统状态** | `defillama-data status` | - |

---

## 🎯 使用建议

### 1. 日常使用

```bash
# 快速查看市场概览
defillama-data defillama tvl

# 查看热门协议
defillama-data defillama protocols --limit 20 -f table

# 寻找高收益机会
defillama-data defillama yields --min-apy 10 --limit 20 -f table
```

### 2. 数据分析

```bash
# 导出数据进行分析
defillama-data defillama protocols --limit 500 -f csv > protocols.csv
defillama-data defillama yields --limit 500 -f csv > yields.csv

# 使用 jq 进行数据提取
defillama-data defillama tvl -f json | jq '.totalTvl'
defillama-data defillama chain -n ethereum -f json | jq '.tvl'
```

### 3. 自动化脚本

```bash
# 健康检查
defillama-data health --quiet

# 定时任务（cron）
0 */6 * * * /path/to/defillama-data health --quiet
```

### 4. 集成到其他工具

```bash
# 与 jq 集成
defillama-data defillama protocols -f json | jq '.[] | select(.category=="Lending")'

# 与 Python 集成
import subprocess
result = subprocess.run(['defillama-data', 'defillama', 'tvl', '-f', 'json'], capture_output=True)
tvl = json.loads(result.stdout)
```

---

## 🔧 故障排除

### 常见问题

| 问题 | 解决方案 |
|------|---------|
| "Invalid protocol name" | 使用纯字母数字和连字符，如 `aave-v3` |
| "Limit must be between 1 and 500" | 减少 `--limit` 值 |
| "Request Timeout" | 检查网络连接，或增加 `--timeout` |
| "Resource not found" | 验证协议/链名称是否正确（使用小写） |
| "Rate limit exceeded" | 等待几秒后再试 |

---

## 📚 相关资源

- **DefiLlama API**: https://docs.llama.fi/
- **项目仓库**: /workspace/projects/workspace/skills/defillama-data-aggregator
- **配置文件**: config/keys.js
- **日志**: 使用 `DEBUG=true` 启用详细日志

---

**完整功能列表 v1.0.1**
**生成时间**: 2026-03-27 17:15 (GMT+8)
**维护者**: AAVE 🥳
