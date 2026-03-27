#!/bin/bash

# Quick Test - Nansen Endpoint Testing
# Nansen端点快速测试

echo "🔍 Nansen 端点快速测试"
echo "====================="
echo ""

cd /workspace/projects/workspace/skills/crypto-data-aggregator

echo "📊 Testing Nansen API Endpoints:"
echo "---------------------------"

echo "Test 1: 基础连接"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     "https://api.nansen.ai/"

echo ""
echo "Test 2: Smart Money (v1)"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     "https://api.nansen.ai/v1/smart-money" | head -10

echo ""
echo "Test 3: Whale Alerts (v1)"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     "https://api.nansen.ai/v1/whale-alerts" | head -10

echo ""
echo "Test 4: Labels (v1)"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     "https://api.nansen.ai/v1/labels" | head -10

echo ""
echo "Test 5: God Mode (v2)"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     "https://api.nansen.ai/v2/god-mode" | head -10

echo ""
echo "Test 6: Profiler (v2)"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     "https://api.nansen.ai/v2/profiler" | head -10

echo ""
echo "Test 7: Alternative - 无/v2/路径"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     "https://api.nansen.io/smart-money" | head -10

echo ""
echo "===================================="
echo "📊 Test Results:"
echo "---------------"

echo "如果任何一个测试返回有效数据（非404/400），立即修复Nansen代码！"
echo ""

echo "===================================="
echo "💡 DefiLlama 100% 可用:"
echo "-----------------"
echo "crypto-data defillama protocols --limit 10 --format table"
echo ""
echo "===================================="
echo ""
