#!/bin/bash

# Crypto Data Aggregator - Quick Start Script
# 一键快速开始使用所有功能

echo "🚀 Crypto Data Aggregator - Quick Start"
echo "========================================"
echo ""

echo "📊 1. 测试DefiLlama (免费功能)"
echo "--------------------------------"
crypto-data defillama protocols --limit 3 --format table
echo ""

echo "📈 2. 获取TVL数据"
echo "----------------"
crypto-data defillama tvl --format json | jq '.[0:3]' 2>/dev/null || echo "Install jq for better formatting"
echo ""

echo "💰 3. 查看AAVE协议"
echo "------------------"
crypto-data defillama protocol --name aave --format pretty
echo ""

echo "🔍 4. 测试API连接"
echo "-----------------"
crypto-data test --platform defillama
echo ""

echo "🧹 5. 查看缓存状态"
echo "------------------"
crypto-data cache status
echo ""

echo "========================================"
echo "✅ Quick Start Complete!"
echo ""
echo "📚 更多功能:"
echo "  crypto-data --help"
echo "  crypto-data-agg --help"
echo ""
echo "📖 查看文档:"
echo "  cat README.md"
echo "  cat EXAMPLES.md"
echo "  cat PLATFORM_SELECTION.md"
echo ""
echo "🔑 添加API密钥以解锁完整功能:"
echo "  nano config/keys.js"
echo ""
