#!/bin/bash

# Platform Fix Script
# 平台修复脚本

echo "🔧 Platform Fix and Verification"
echo "================================"
echo ""

cd /workspace/projects/workspace/skills/crypto-data-aggregator

echo "📊 Step 1: Verify DefiLlama"
echo "---------------------------"
crypto-data test --platform defillama
echo ""

echo "📊 Step 2: Verify CoinMarketCap"
echo "-----------------------------"
echo "Testing direct connection..."
curl -s -I "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map" | head -5
echo ""

echo "Testing via crypto-data..."
crypto-data test --platform cmc
echo ""

echo "📊 Step 3: Verify Nansen"
echo "---------------------"
echo "Testing direct connection..."
curl -s -I "https://api.nansen.ai" | head -5
echo ""

echo "Testing via crypto-data..."
crypto-data test --platform nansen
echo ""

echo "================================"
echo "🔧 Diagnostic Complete"
echo "================================"
echo ""
echo "Next actions based on results:"
echo "- DefiLlama issues: Check API endpoints"
echo "- CoinMarketCap issues: Check network/connection"
echo "- Nansen issues: Check API key format"
echo ""
