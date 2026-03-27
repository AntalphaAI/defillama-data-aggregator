# Crypto Data Aggregator - Examples

This document contains practical examples of using the crypto-data-aggregator skill.

## Basic Usage

### Get Crypto Prices

```bash
# Single token
crypto-data cmc price --symbols BTC

# Multiple tokens
crypto-data cmc price --symbols BTC,ETH,SOL,AVAX,MATIC

# Convert to EUR
crypto-data cmc price --symbols BTC,ETH --convert EUR

# Output as table
crypto-data cmc price --symbols BTC,ETH --format table
```

### Get DeFi TVL

```bash
# Total DeFi TVL
crypto-data defillama tvl

# Protocol TVL
crypto-data defillama protocol --name aave
crypto-data defillama protocol --name uniswap

# Chain TVL
crypto-data defillama chain --name ethereum
crypto-data defillama chain --name solana

# Top 10 protocols by TVL
crypto-data defillama protocols --limit 10 --sort tvl --format table
```

### Get Futures Data

```bash
# Funding rates
crypto-data coinglass funding --symbol BTCUSDT
crypto-data coinglass funding --symbol ETHUSDT --period 24h

# Open interest
crypto-data coinglass oi --symbol BTCUSDT
crypto-data coinglass oi --symbol BTCUSDT --exchange binance

# Liquidations
crypto-data coinglass liquidation --symbol BTCUSDT --period 24h

# Long/Short ratio
crypto-data coinglass lsr --symbol BTCUSDT --exchange binance --period 24h
```

### Get Nansen Data

```bash
# Whale alerts
crypto-data nansen whale --min-value 1000000

# Smart money activity
crypto-data nansen smart-money --token ETH

# NFT portfolio
crypto-data nansen nft --address 0x123...abc
```

### Run Dune Queries

```bash
# Get query results
crypto-data dune query --query-id 123456

# Get popular dashboards
crypto-data dune dashboards --limit 10

# Get user dashboards
crypto-data dune dashboards --creator username
```

## Advanced Examples

### Market Research Workflow

```bash
# 1. Get market overview
crypto-data cmc overview --limit 20 --format table

# 2. Get top DeFi protocols
crypto-data defillama protocols --limit 10 --sort tvl --format table

# 3. Check funding rates for major tokens
crypto-data coinglass funding --symbol BTCUSDT --format table
crypto-data coinglass funding --symbol ETHUSDT --format table

# 4. Monitor whale activity
crypto-data nansen whale --min-value 5000000 --limit 20 --format table
```

### Trading Signal Analysis

```bash
# Comprehensive BTC analysis
crypto-data overview --symbol BTC

# Check BTC funding rates
crypto-data coinglass funding --symbol BTCUSDT --all-exchanges --format table

# Get BTC liquidations
crypto-data coinglass liquidation --symbol BTCUSDT --period 7d --format table

# Check smart money BTC positions
crypto-data nansen smart-money --token BTC --format table
```

### DeFi Protocol Monitoring

```bash
# Monitor AAVE
crypto-data defillama protocol --name aave --format table
crypto-data cmc price --symbols AAVE
crypto-data coinglass funding --symbol AAVEUSDT

# Monitor lending protocols
crypto-data defillama protocols --category lending --limit 10 --format table

# Monitor yield farming opportunities
crypto-data defillama protocols --min-tvl 10000000 --sort apy --format table
```

### Whale Tracking

```bash
# Get whale alerts for specific token
crypto-data nansen whale --min-value 1000000 --token ETH --format table

# Track large movements
crypto-data nansen whale --min-value 5000000 --limit 50 --format table

# Check wallet labels
crypto-data nansen labels --address 0x123...abc
```

### Batch Operations

```bash
# Get data for multiple tokens
for symbol in BTC ETH SOL AVAX; do
    echo "=== $symbol ==="
    crypto-data overview --symbol $symbol --format pretty
    echo ""
done

# Compare funding rates across exchanges
crypto-data coinglass funding --symbol BTCUSDT --format table
crypto-data coinglass oi --symbol BTCUSDT --format table
```

## Output Formats

All commands support multiple output formats:

```bash
# JSON (machine-readable)
crypto-data cmc price --symbols BTC --format json > btc_price.json

# Table (human-readable)
crypto-data cmc price --symbols BTC --format table

# CSV (spreadsheet-compatible)
crypto-data cmc price --symbols BTC,ETH,SOL --format csv > prices.csv

# Pretty (colored output)
crypto-data cmc price --symbols BTC --format pretty
```

## Cache Management

```bash
# Clear all cache
crypto-data cache clear

# Clear cache for specific platform
crypto-data cache clear --platform cmc

# Check cache status
crypto-data cache status
```

## Testing

```bash
# Test all platforms
crypto-data test --all

# Test specific platform
crypto-data test --platform cmc
crypto-data test --platform defillama
```

## Real-World Use Cases

### Use Case 1: Morning Market Check

```bash
#!/bin/bash

echo "🌅 Good Morning! Market Summary"
echo "==============================="
echo ""

echo "📊 Top 10 Tokens by Market Cap:"
crypto-data cmc overview --limit 10 --format table
echo ""

echo "💰 Total DeFi TVL:"
crypto-data defillama tvl --format pretty
echo ""

echo "📈 BTC Funding Rates:"
crypto-data coinglass funding --symbol BTCUSDT --format table
echo ""

echo "🐋 Recent Whale Activity:"
crypto-data nansen whale --min-value 10000000 --limit 10 --format table
```

### Use Case 2: DeFi Protocol Analysis

```bash
#!/bin/bash

PROTOCOL="aave"

echo "🏦 Protocol Analysis: $PROTOCOL"
echo "================================"
echo ""

echo "📊 Protocol TVL:"
crypto-data defillama protocol --name $PROTOCOL --format pretty
echo ""

echo "💵 Token Price:"
crypto-data cmc price --symbols $(echo $PROTOCOL | tr '[:lower:]' '[:upper:]') --format pretty
echo ""

echo "📈 Market Data:"
crypto-data coinglass funding --symbol ${PROTOCOL}USDT --format table
echo ""

echo "🐋 Smart Money Activity:"
crypto-data nansen smart-money --token $(echo $PROTOCOL | tr '[:lower:]' '[:upper:]') --format table
```

### Use Case 3: Trading Signals

```bash
#!/bin/bash

TOKEN="BTC"
echo "🎯 Trading Signals: $TOKEN"
echo "========================="
echo ""

echo "💹 Price Overview:"
crypto-data cmc price --symbols $TOKEN --format pretty
echo ""

echo "📊 Futures Data:"
crypto-data coinglass funding --symbol ${TOKEN}USDT --format table
crypto-data coinglass oi --symbol ${TOKEN}USDT --format table
crypto-data coinglass lsr --symbol ${TOKEN}USDT --format table
echo ""

echo "🔥 Liquidations:"
crypto-data coinglass liquidation --symbol ${TOKEN}USDT --period 24h --format table
echo ""

echo "🧠 Smart Money:"
crypto-data nansen smart-money --token $TOKEN --format table
```

## Tips and Best Practices

1. **Use caching**: Data is cached by default to reduce API calls
2. **Batch requests**: Query multiple tokens/protocols at once when possible
3. **Monitor rate limits**: Check platform documentation for rate limits
4. **Use appropriate output format**: JSON for scripts, table for humans, CSV for spreadsheets
5. **Schedule regular updates**: Use cron jobs for automated monitoring
6. **Export data regularly**: Save historical data for analysis
7. **Combine multiple sources**: Cross-reference data from different platforms

## Troubleshooting

### API Key Issues

```bash
# Test API connections
crypto-data test --all

# Check if keys are configured
cat config/keys.js
```

### Cache Issues

```bash
# Clear cache if data is stale
crypto-data cache clear

# Disable caching temporarily
crypto-data cmc price --symbols BTC --no-cache
```

### Rate Limit Errors

```bash
# Wait and retry after a delay
sleep 60 && crypto-data cmc price --symbols BTC

# Use cached data when possible
crypto-data cmc price --symbols BTC --cache 3600
```

For more information, see the main [SKILL.md](./SKILL.md) documentation.
