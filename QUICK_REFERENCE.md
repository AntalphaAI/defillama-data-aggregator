# 🚀 DefiLlama Data Aggregator - 功能速查卡片

> **版本**: v1.0.1 | **命令数**: 7 | **输出格式**: 4 种

---

## 📊 核心命令一览表

| 命令 | 功能 | 必填参数 | 常用选项 |
|------|------|---------|---------|
| `defillama tvl` | 全网总 TVL | 无 | `-f json\|table\|csv\|pretty` |
| `defillama protocol` | 单协议 TVL | `-n <name>` | `-f json\|table\|csv\|pretty` |
| `defillama protocols` | 协议列表 | 无 | `-c <cat>`, `--min-tvl`, `--limit`, `--sort` |
| `defillama chain` | 单链 TVL | `-n <name>` | `-f json\|table\|csv\|pretty` |
| `defillama yields` | 收益池 | 无 | `--min-apy`, `--min-tvl`, `--chain`, `--stablecoin` |
| `health` | 健康检查 | 无 | `--quiet`, `--timeout` |
| `status` | 系统状态 | 无 | - |

---

## 🎯 常用命令示例

### 📈 TVL 查询
```bash
# 全网 TVL
defillama-data defillama tvl

# 提取总 TVL 数值
defillama-data defillama tvl -f json | jq '.totalTvl'

# 以太坊 TVL
defillama-data defillama chain -n ethereum

# Aave 协议 TVL
defillama-data defillama protocol -n aave
```

### 🏆 排名查询
```bash
# Top 20 协议（按 TVL）
defillama-data defillama protocols --limit 20 --sort tvl -f table

# Top 10 借贷协议
defillama-data defillama protocols -c lending --limit 10 -f table

# Top 20 收益池（按 APY）
defillama-data defillama yields --min-apy 10 --limit 20 -f table
```

### 💰 收益查询
```bash
# 高收益池（APY > 10%）
defillama-data defillama yields --min-apy 10

# 以太坊高收益池
defillama-data defillama yields --chain ethereum --min-apy 5

# 稳定币高收益池
defillama-data defillama yields --stablecoin --min-apy 5

# TVL > $1M 的收益池
defillama-data defillama yields --min-tvl 1000000 --limit 20
```

### 📤 数据导出
```bash
# 导出协议列表到 CSV
defillama-data defillama protocols --limit 500 -f csv > protocols.csv

# 导出收益池到 CSV
defillama-data defillama yields --limit 500 -f csv > yields.csv

# 导出 JSON 数据
defillama-data defillama tvl -f json > tvl.json
```

### 🔍 健康检查
```bash
# 完整健康检查
defillama-data health

# 简洁模式
defillama-data health --quiet

# 系统状态
defillama-data status
```

---

## ⚙️ 输出格式对比

| 格式 | 用途 | 适用场景 | 示例 |
|------|------|---------|------|
| **Pretty** | 终端查看 | 日常快速查看 | `defillama-data defillama tvl` |
| **Table** | 数据对比 | 比较多个项目 | `defillama-data defillama protocols --limit 10 -f table` |
| **JSON** | 脚本处理 | 自动化、编程 | `defillama-data defillama tvl -f json \| jq '.totalTvl'` |
| **CSV** | 数据分析 | 导入 Excel/数据库 | `defillama-data defillama protocols -f csv > data.csv` |

---

## 🔒 输入验证规则

| 参数 | 验证规则 | 有效示例 | 无效示例 |
|------|---------|---------|---------|
| 协议名称 | 字母+数字+连字符 | `aave`, `uniswap-v3` | `aave<script>`, `uni/swap` |
| 链名称 | 字母+数字+空格+连字符 | `ethereum`, `polygon-pos` | `eth<script>`, `eth/bsc` |
| 类别名称 | 字母+数字+空格+连字符 | `lending`, `liquid staking` | `lend<script>` |
| Limit | 1-500 | `50`, `100` | `0`, `501` |
| Min APY | 0-1000% | `10`, `50` | `-1`, `1001` |
| Min TVL | ≥ 0 | `1000000` | `-1` |

---

## 🏗️ 数据结构

### Total TVL 响应
```json
{
  "totalTvl": 94518602394.26,
  "chains": [...],
  "timestamp": "2026-03-27T09:00:00.000Z"
}
```

### Protocol 响应
```json
{
  "id": "parent#aave",
  "name": "Aave",
  "symbol": "AAVE",
  "tvl": 1234567890.12,
  "chains": ["Ethereum", "Arbitrum"],
  "category": "Lending"
}
```

### Chain 响应
```json
{
  "name": "Ethereum",
  "gecko_id": "ethereum",
  "tokenSymbol": "ETH",
  "tvl": 54262764124.80,
  "chainId": 1
}
```

### Yield 响应
```json
{
  "chain": "Ethereum",
  "project": "Aave",
  "symbol": "USDC",
  "apy": 5.23,
  "tvlUsd": 1000000000,
  "stablecoin": true
}
```

---

## 📋 常见协议/链名称

### 协议
| 英文 | 中文 | 类别 |
|------|------|------|
| aave | Aave | Lending |
| uniswap | Uniswap | DEX |
| compound | Compound | Lending |
| maker | MakerDAO | Lending |
| lido | Lido | Liquid Staking |
| curve | Curve | DEX |
| pancakeswap | PancakeSwap | DEX |

### 链
| 英文 | 中文 |
|------|------|
| ethereum | 以太坊 |
| solana | Solana |
| polygon | Polygon |
| arbitrum | Arbitrum |
| avalanche | Avalanche |
| bsc | BSC |
| base | Base |
| optimism | Optimism |

---

## 💡 高级技巧

### 1. 数据提取
```bash
# 提取特定字段
defillama-data defillama tvl -f json | jq '.totalTvl, .chains[0].name'

# 计算占比
defillama-data defillama tvl -f json | jq '.chains[] | select(.name=="Ethereum") | .tvl / .totalTvl * 100'
```

### 2. 批量查询
```bash
# 查询多个链
for chain in ethereum solana polygon arbitrum; do
  echo "=== $chain ==="
  defillama-data defillama chain -n $chain -f json | jq '.tvl'
done

# 查询多个协议
for protocol in aave uniswap lido; do
  echo "=== $protocol ==="
  defillama-data defillama protocol -n $protocol -f json | jq '.tvl'
done
```

### 3. 数据过滤
```bash
# 筛选特定类别
defillama-data defillama protocols -c lending -f json | jq '.[]'

# 筛选 TVL > $1B
defillama-data defillama protocols -f json | jq '.[] | select(.tvlUsd > 1000000000)'

# 筛选 APY > 10% 的收益池
defillama-data defillama yields -f json | jq '.[] | select(.apy > 10)'
```

---

## 🚨 错误处理

| 错误 | 原因 | 解决方案 |
|------|------|---------|
| `Invalid protocol name` | 包含非法字符 | 使用纯字母数字和连字符 |
| `Limit must be between 1 and 500` | 超出范围 | 减少 `--limit` 值 |
| `Resource not found` | 协议/链不存在 | 检查名称拼写（使用小写） |
| `Request Timeout` | 网络超时 | 检查网络或增加 `--timeout` |
| `Rate limit exceeded` | 请求过多 | 等待几秒后再试 |

---

## 🔧 配置文件

### config/keys.js
```javascript
module.exports = {
  defillama: {
    baseUrl: 'https://api.llama.fi'
  },
  settings: {
    defaultCacheDuration: 300,  // 5 分钟缓存
    timeout: 30000,             // 30 秒超时
    maxRetries: 3,              // 最大重试次数
    retryDelay: 1000,           // 重试延迟
    debug: process.env.DEBUG === 'true'
  }
};
```

---

## 📊 性能指标

| 指标 | 数值 |
|------|------|
| 命令总数 | 7 |
| 输出格式 | 4 |
| 数据类型 | TVL, 协议, 链, 收益 |
| 缓存支持 | 单层内存缓存 |
| 健康检查 | ✅ 支持 |
| 输入验证 | ✅ 全面 |
| 错误处理 | ✅ 增强版 |

---

## 📚 快速链接

- **完整功能列表**: `FULL_FEATURE_LIST.md`
- **用户手册**: `README.md`
- **Skill 文档**: `SKILL.md`
- **更新报告**: `UPDATE_REPORT.md`
- **DefiLlama API**: https://docs.llama.fi/

---

**功能速查卡片 v1.0.1**
**生成时间**: 2026-03-27 17:16 (GMT+8)
