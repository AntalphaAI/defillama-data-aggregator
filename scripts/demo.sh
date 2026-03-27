#!/bin/bash

# Crypto Data Aggregator - Quick Demo Script
# Shows what you can do with the aggregator

echo "🚀 Crypto Data Aggregator - Quick Demo"
echo "======================================"
echo ""

echo "1. Testing DefiLlama API (Free!)"
echo "--------------------------------"
crypto-data defillama --help | head -5
echo ""

echo "2. Getting Top 3 DeFi Protocols"
echo "--------------------------------"
crypto-data defillama protocols --limit 3 --format table 2>&1 | head -10
echo ""

echo "3. Getting Chain Overview"
echo "-------------------------"
crypto-data defillama tvl --format json 2>&1 | jq '.[0:3]' 2>/dev/null || echo "Install jq for better formatting"
echo ""

echo "4. Testing Other Platforms (Need API Keys)"
echo "------------------------------------------"
echo "Testing CoinMarketCap..."
timeout 3 crypto-data cmc price --symbols BTC 2>&1 | head -2 || echo "⚠️  Needs API key"
echo ""

echo "Testing Coinglass..."
timeout 3 crypto-data coinglass funding --symbol BTCUSDT 2>&1 | head -2 || echo "⚠️  Needs API key"
echo ""

echo "Testing Nansen..."
timeout 3 crypto-data nansen whale --min-value 1000000 2>&1 | head -2 || echo "⚠️  Needs API key"
echo ""

echo "Testing Dune..."
timeout 3 crypto-data dune dashboards --limit 3 2>&1 | head -2 || echo "⚠️  Needs API key"
echo ""

echo "======================================"
echo "✅ Demo Complete!"
echo ""
echo "💡 DefiLlama is ready to use!"
echo "🔑 Add API keys to config/keys.js for other platforms"
echo ""
echo "📖 Documentation:"
echo "  - SKILL.md        (Complete guide)"
echo "  - README.md       (Quick start)"
echo "  - EXAMPLES.md     (Practical examples)"
echo "  - API_STATUS.md   (API status)"
echo "  - FINAL_REPORT.md (Setup summary)"
echo ""
