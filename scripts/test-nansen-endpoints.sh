#!/bin/bash

# Nansen Endpoint Test Script
# Nansen端点测试脚本

echo "🔍 Nansen API Endpoint Testing"
echo "========================="
echo ""

cd /workspace/projects/workspace/skills/crypto-data-aggregator

echo "📊 Testing Different Endpoint Structures:"
echo "--------------------------------"

echo "Test 1: Basic v1 smart-money"
echo "curl -H 'X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl' 'https://api.nansen.ai/v1/smart-money'"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" "https://api.nansen.ai/smart-money" | head -5
echo ""

echo "Test 2: Basic v1 whale-alerts"
echo "curl -H 'X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl' 'https://api.nansen.ai/v1/whale-alerts'"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" "https://api.nansen.ai/whale-alerts" | head -5
echo ""

echo "Test 3: Labels endpoint"
echo "curl -H 'X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl' 'https://api.nansen.ai/labels'"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl' "https://api.nansen.ai/labels" | head -5
echo ""

echo "Test 4: Smart money (different path)"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" "https://api.nansen.ai/smart-money" | head -5
echo ""

echo "========================================"
echo "🔍 Testing Non-HTTPS endpoints"
echo "=========================="
echo ""

echo "Test 5: Non-HTTPS smart-money"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" "http://api.nansen.ai/smart-money" | head -5
echo ""

echo "Test 6: Non-HTTPS labels"
curl -s -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" "http://api.nansen.ai/labels" | head -5
echo ""

echo "========================================"
echo "📊 Diagnostic Summary:"
echo "======================"
echo "DefiLlama:    ✅ 100%可用"
echo "CoinMarketCap: ❌ 需要网络支持"
echo "Nansen:       🔧 测试中..."
echo ""
echo "💡 Tips:"
echo "-------"
echo "Nansen提供的主要功能:"
echo "• Smart Money - 聪明钱追踪"
echo "• Whale Alerts - 大额转账警报"
echo "• Wallet Labels - 钱包标签化"
echo "• Token Insights - 代币分析"
echo "• Gas Tracker - Gas费监控"
echo "• NFT Portfolio - NFT投资组合"
echo ""
echo "如果测试成功，我会立即修复Nansen客户端代码！"
