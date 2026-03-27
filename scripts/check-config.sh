#!/bin/bash

# 配置状态检查脚本

echo "🔑 API Configuration Status Check"
echo "=================================="
echo ""

cd /workspace/projects/workspace/skills/crypto-data-aggregator

# 检查配置文件
if [ -f "config/keys.js" ]; then
    echo "✅ Configuration file exists: config/keys.js"
else
    echo "❌ Configuration file not found"
    echo ""
    echo "Please create config/keys.js using the template:"
    echo "  cat config/API_KEYS_TEMPLATE.md"
    exit 1
fi

echo ""
echo "📊 Checking API Key Configuration:"
echo "----------------------------------"

# 检查CoinMarketCap
if grep -q "YOUR_COINMARKETCAP_API_KEY" config/keys.js; then
    echo "❌ CoinMarketCap: Not configured (placeholder found)"
elif grep -q "process.env.COINMARKETCAP_API_KEY" config/keys.js && grep -v "YOUR_COINMARKETCAP_API_KEY" config/keys.js | grep -q "apiKey.*:"; then
    echo "✅ CoinMarketCap: Using environment variable"
else
    echo "✅ CoinMarketCap: Configured with API key"
fi

# 检查Coinglass
if grep -q "YOUR_COINGLASS_API_KEY" config/keys.js; then
    echo "❌ Coinglass: Not configured (placeholder found)"
elif grep -q "process.env.COINGLASS_API_KEY" config/keys.js && grep -v "YOUR_COINGLASS_API_KEY" config/keys.js | grep -q "apiKey.*:"; then
    echo "✅ Coinglass: Using environment variable"
else
    echo "✅ Coinglass: Configured with API key"
fi

# 检查Nansen
if grep -q "YOUR_NANSEN_API_KEY" config/keys.js; then
    echo "❌ Nansen: Not configured (placeholder found)"
elif grep -q "process.env.NANSEN_API_KEY" config/keys.js && grep -v "YOUR_NANSEN_API_KEY" config/keys.js | grep -q "apiKey.*:"; then
    echo "✅ Nansen: Using environment variable"
else
    echo "✅ Nansen: Configured with API key"
fi

# 检查DefiLlama
if grep -q "defillama:" config/keys.js; then
    echo "✅ DefiLlama: Configured (no API key needed)"
else
    echo "❌ DefiLlama: Not configured"
fi

echo ""
echo "=================================="
echo "🧪 Testing API Connections:"
echo "--------------------------"

# 测试DefiLlama
echo -n "Testing DefiLlama... "
if crypto-data test --platform defillama 2>&1 | grep -q "Connected"; then
    echo "✅ OK"
else
    echo "❌ Failed"
fi

# 测试其他平台
echo -n "Testing CoinMarketCap... "
if crypto-data test --platform cmc 2>&1 | grep -q "Connected"; then
    echo "✅ OK"
elif crypto-data test --platform cmc 2>&1 | grep -q "error"; then
    echo "❌ Needs API key"
else
    echo "❌ Failed"
fi

echo -n "Testing Coinglass... "
if crypto-data test --platform coinglass 2>&1 | grep -q "Connected"; then
    echo "✅ OK"
elif crypto-data test --platform coinglass 2>&1 | grep -q "error"; then
    echo "❌ Needs API key"
else
    echo "❌ Failed"
fi

echo -n "Testing Nansen... "
if crypto-data test --platform nansen 2>&1 | grep -q "Connected"; then
    echo "✅ OK"
elif crypto-data test --platform nansen 2>&1 | grep -q "error"; then
    echo "❌ Needs API key"
else
    echo "❌ Failed"
fi

echo ""
echo "=================================="
echo "📖 Configuration Instructions:"
echo "------------------------------"
echo ""
echo "1. View the template:"
echo "   cat config/API_KEYS_TEMPLATE.md"
echo ""
echo "2. Edit configuration file:"
echo "   nano config/keys.js"
echo ""
echo "3. Replace placeholders with your API keys"
echo ""
echo "4. Save and test:"
echo "   crypto-data test --all"
echo ""
echo "=================================="
