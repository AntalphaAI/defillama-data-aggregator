#!/bin/bash

# CoinMarketCap和Nansen问题诊断脚本
# 问题诊断脚本

echo "🔧 CoinMarketCap & Nansen 问题诊断"
echo "=================================="
echo ""

cd /workspace/projects/workspace/skills/crypto-data-aggregator

echo "📊 1. 网络连接测试"
echo "---------------------"

echo "测试DNS解析..."
if command -v nslookup &> /dev/null; then
    nslookup pro-api.coinmarketcap.com
else
    host pro-api.coinmarketcap.com
fi

echo ""
echo "测试端口443..."
if command -v nc &> /dev/null; then
    nc -zv pro-api.coinmarketcap.com 443
else
    echo "nc命令不可用"
fi

echo ""
echo "📊 2. HTTPS连接测试"
echo "---------------------"

echo "测试CoinMarketCap API..."
curl -I --connect-timeout 10 https://pro-api.coinmarketcap.com/v1 2>&1 | head -5

echo ""
echo "测试Nansen API..."
curl -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     -I https://api.nansen.ai/v1/gas-tracker 2>&1 | head -5

echo ""
echo "📊 3. 测试API功能"
echo "-----------------"

echo "测试CoinMarketCap API调用..."
curl -s -H "X-CMC_PRO_API_KEY: cff406f12bdc46248f1c57ffd911e7df" \
     "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=3" | jq '.data[].name' 2>/dev/null || \
     echo "需要jq或查看原始输出"

echo ""
echo "测试Nansen API调用..."
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     "https://api.nansen.ai/v1/gas-tracker" | head -10

echo ""
echo "=================================="
echo "📊 诊断完成"
echo "=================================="
echo ""
echo "根据结果:"
echo "- 如果都失败 → 需要网络/账户支持"
echo "- 如果部分成功 → 可以修复"
echo "- DefiLlama → 100%可用"
echo ""
