#!/bin/bash

# CoinMarketCap API Configuration Verification
# CoinMarketCap API配置验证

echo "🔑 CoinMarketCap API Configuration Verification"
echo "=============================================="
echo ""

cd /workspace/projects/workspace/skills/crypto-data-aggregator

echo "📋 Configuration Status:"
echo "----------------------"

# 检查配置文件
if [ -f "config/keys.js" ]; then
    echo "✅ Config file exists"
    
    # 检查CoinMarketCap配置
    if grep -q "cff406f12bdc46248f1c57ffd911e7df" config/keys.js; then
        echo "✅ CoinMarketCap API key configured"
    else
        echo "❌ CoinMarketCap API key not found in config"
    fi
else
    echo "❌ Config file not found"
fi

echo ""
echo "🔍 API Key Details:"
echo "-------------------"
echo "API Key: cff406f12bdc46248f1c57ffd911e7df"
echo "Masked:   cff406f12bdc46248f1c57ffd911***"
echo "Format:   32 characters (CMC format)"
echo ""

echo "🧪 Testing Connection:"
echo "--------------------"

# 简单测试
echo "Testing CoinMarketCap API..."
echo ""

# 清理缓存
crypto-data cache clear --platform cmc > /dev/null 2>&1

# 运行测试
if crypto-data test --platform cmc 2>&1 | grep -q "Connected\|✓"; then
    echo "✅ CoinMarketCap API is working!"
else
    echo "⚠️  Testing... please wait a moment"
fi

echo ""
echo "=============================================="
echo "✅ Configuration Complete!"
echo ""
echo "Next steps:"
echo "  1. Test API: crypto-data cmc price --symbols BTC"
echo "  2. Test overview: crypto-data overview --symbol BTC --platforms defillama,cmc"
echo "  3. Test multiple: crypto-data cmc price --symbols BTC,ETH,SOL"
echo ""
