#!/bin/bash

# API Configuration Guide for CoinMarketCap, Coinglass, Nansen
# 快速配置这三个平台的API密钥

echo "🔑 API Configuration Guide"
echo "=========================="
echo ""

echo "📋 Current Configuration Status:"
echo "------------------------------"
cd /workspace/projects/workspace/skills/crypto-data-aggregator

echo "Checking CoinMarketCap..."
if grep -q "YOUR_COINMARKETCAP_API_KEY" config/keys.js; then
    echo "  ❌ CoinMarketCap: Not configured"
else
    echo "  ✅ CoinMarketCap: Configured"
fi

echo "Checking Coinglass..."
if grep -q "YOUR_COINGLASS_API_KEY" config/keys.js; then
    echo "  ❌ Coinglass: Not configured"
else
    echo "  ✅ Coinglass: Configured"
fi

echo "Checking Nansen..."
if grep -q "YOUR_NANSEN_API_KEY" config/keys.js; then
    echo "  ❌ Nansen: Not configured"
else
    echo "  ✅ Nansen: Configured"
fi

echo ""
echo "🔗 Get Free API Keys:"
echo "---------------------"
echo "CoinMarketCap: https://pro.coinmarketcap.com/signup (10,000 credits/month)"
echo "Coinglass:     https://coinglass.com/pricing (1,000 requests/day)"
echo "Nansen:        https://nansen.ai/pricing (limited free access)"
echo ""

echo "⚙️  Configuration Options:"
echo "-------------------------"
echo ""
echo "Option 1: Edit config file directly"
echo "  nano config/keys.js"
echo "  Replace YOUR_*_API_KEY with your actual keys"
echo ""

echo "Option 2: Use environment variables"
echo "  export COINMARKETCAP_API_KEY='your-key'"
echo "  export COINGLASS_API_KEY='your-key'"
echo "  export NANSEN_API_KEY='your-key'"
echo ""

echo "Option 3: Create .env file"
echo "  cat > .env << ENVEOF"
echo "  COINMARKETCAP_API_KEY='your-key'"
echo "  COINGLASS_API_KEY='your-key'"
echo "  NANSEN_API_KEY='your-key'"
echo "  ENVEOF"
echo "  source .env"
echo ""

echo "🧪 Test Configuration:"
echo "---------------------"
echo "After configuration, run:"
echo "  crypto-data test --all"
echo ""

echo "📖 Documentation:"
echo "----------------"
echo "View detailed report: cat CMC_COINGLASS_NANSEN_REPORT.md"
echo ""

echo "✅ Quick Commands (after configuration):"
echo "------------------------------------------"
echo ""
echo "CoinMarketCap:"
echo "  crypto-data cmc price --symbols BTC,ETH"
echo "  crypto-data cmc overview --limit 20"
echo ""

echo "Coinglass:"
echo "  crypto-data coinglass funding --symbol BTCUSDT"
echo "  crypto-data coinglass liquidation --symbol BTCUSDT"
echo ""

echo "Nansen:"
echo "  crypto-data nansen whale --min-value 1000000"
echo "  crypto-data nansen smart-money --token ETH"
echo ""

echo "📚 Available Features (after configuration):"
echo "--------------------------------------------"
echo ""
echo "CoinMarketCap: Real-time prices, market cap, trading volume"
echo "Coinglass:     Futures data, funding rates, liquidations"
echo "Nansen:        Whale tracking, smart money, NFT analysis"
echo ""

echo "========================================"
echo "Next Steps:"
echo "1. Get API keys from the URLs above"
echo "2. Configure them using one of the options"
echo "3. Test with: crypto-data test --all"
echo "4. Start using the commands!"
echo ""
