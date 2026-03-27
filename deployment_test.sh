#!/bin/bash
# DefiLlama Data Aggregator Deployment Test
# Version: 1.0.2

set -e  # Exit on any error

echo "=================================================="
echo "🚀 DefiLlama Data Aggregator - 部署验证测试"
echo "=================================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run a test
run_test() {
  local test_name=$1
  local test_command=$2
  local expected_value=$3
  local use_exact_match=$4

  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  echo -n "  Test $TOTAL_TESTS: $test_name... "

  local result
  result=$(eval "$test_command" 2>/dev/null)

  if [ "$use_exact_match" = "true" ]; then
    if [ "$result" = "$expected_value" ]; then
      echo "✅ PASS"
      PASSED_TESTS=$((PASSED_TESTS + 1))
    else
      echo "❌ FAIL"
      echo "    Expected: $expected_value"
      echo "    Got: $result"
      FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
  else
    if echo "$result" | grep -q "$expected_value"; then
      echo "✅ PASS"
      PASSED_TESTS=$((PASSED_TESTS + 1))
    else
      echo "❌ FAIL"
      echo "    Expected to contain: $expected_value"
      echo "    Got: $result"
      FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
  fi
}

# Test 1: Version Check
echo "1. 版本检查"
run_test "版本号应该是 1.0.2" "./src/index.js --version" "1.0.2" "true"
echo ""

# Test 2: Health Check
echo "2. 健康检查"
run_test "健康检查应该显示 1 个健康平台" "./src/index.js health --quiet" "Healthy: 1" "false"
echo ""

# Test 3: TVL Query
echo "3. TVL 查询"
run_test "TVL 应该大于 0" "./src/index.js defillama tvl -f json | jq -r '.totalTvl'" "^[0-9]" "false"
echo ""

# Test 4: Protocol Query
echo "4. 协议查询"
run_test "Aave 协议名称应该是 'Aave'" "./src/index.js defillama protocol -n aave -f json | jq -r '.name'" "Aave" "true"
echo ""

# Test 5: Sorting Function
echo "5. 排序功能"
run_test "排序应该是降序（第一个 TVL > 第二个 TVL）" "./src/index.js defillama protocols --sort tvl --limit 2 -f json | jq '[.[0].tvl, .[1].tvl] | .[0] >= .[1]'" "true" "false"
echo ""

# Test 6: Chain Query
echo "6. 链查询"
run_test "Ethereum 链名称应该是 'Ethereum'" "./src/index.js defillama chain -n ethereum -f json | jq -r '.name'" "Ethereum" "true"
echo ""

# Test 7: Yields Query
echo "7. 收益池查询"
run_test "收益池应该返回数据" "./src/index.js defillama yields --limit 1 -f json | jq 'length'" "[1-9]" "false"
echo ""

# Test 8: Input Validation
echo "8. 输入验证"
run_test "无效协议名应该被拒绝" "./src/index.js defillama protocol -n \"aave<script>\" 2>&1" "Invalid protocol name" "false"
echo ""

# Test 9: Output Formats
echo "9. 输出格式"
run_test "Pretty 格式应该输出数据" "./src/index.js defillama tvl -f pretty | grep -c 'tvl'" "[1-9]" "false"
run_test "JSON 格式应该输出 JSON" "./src/index.js defillama tvl -f json | jq -c '.totalTvl'" "[0-9]" "false"
echo ""

# Test 10: Range Validation
echo "10. 范围验证"
run_test "超出范围的 limit 应该被拒绝" "./src/index.js defillama protocols --limit 600 2>&1" "must be between" "false"
echo ""

# Summary
echo "=================================================="
echo "📊 测试总结"
echo "=================================================="
echo "总测试数: $TOTAL_TESTS"
echo "通过: $PASSED_TESTS"
echo "失败: $FAILED_TESTS"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
  echo "✅ 所有测试通过！"
  echo ""
  echo "🎉 部署验证成功，可以上线！"
  exit 0
else
  echo "❌ 有 $FAILED_TESTS 个测试失败"
  echo ""
  echo "⚠️  请修复失败的测试后重新部署"
  exit 1
fi
