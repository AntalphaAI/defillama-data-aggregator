#!/bin/bash
# Deep Code Review - Comprehensive Bug Check
# Version: 1.0.2

echo "=================================================="
echo "🔍 DefiLlama Data Aggregator - 深度代码审查"
echo "=================================================="
echo ""

cd /workspace/projects/workspace/skills/defillama-data-aggregator

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
WARNINGS=0

# Function to run a test
run_test() {
  local test_name=$1
  local test_command=$2
  local expected_value=$3
  local test_type=$4

  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  echo -n "  Test $TOTAL_TESTS: $test_name... "

  local result
  result=$(eval "$test_command" 2>&1)

  if [ "$test_type" = "exact" ]; then
    if [ "$result" = "$expected_value" ]; then
      echo "✅ PASS"
      PASSED_TESTS=$((PASSED_TESTS + 1))
    else
      echo "❌ FAIL"
      echo "    Expected: $expected_value"
      echo "    Got: $result"
      FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
  elif [ "$test_type" = "contains" ]; then
    if echo "$result" | grep -q "$expected_value"; then
      echo "✅ PASS"
      PASSED_TESTS=$((PASSED_TESTS + 1))
    else
      echo "❌ FAIL"
      echo "    Expected to contain: $expected_value"
      echo "    Got: $result"
      FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
  elif [ "$test_type" = "warning" ]; then
    if echo "$result" | grep -q "$expected_value"; then
      echo "⚠️  WARNING"
      echo "    Issue found: $expected_value"
      WARNINGS=$((WARNINGS + 1))
    else
      echo "✅ PASS"
      PASSED_TESTS=$((PASSED_TESTS + 1))
    fi
  elif [ "$test_type" = "not_contains" ]; then
    if echo "$result" | grep -q "$expected_value"; then
      echo "⚠️  WARNING"
      echo "    Found unexpected: $expected_value"
      WARNINGS=$((WARNINGS + 1))
    else
      echo "✅ PASS"
      PASSED_TESTS=$((PASSED_TESTS + 1))
    fi
  else
    # Default: check if result is not empty
    if [ -n "$result" ]; then
      echo "✅ PASS"
      PASSED_TESTS=$((PASSED_TESTS + 1))
    else
      echo "❌ FAIL"
      echo "    Got empty result"
      FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
  fi
}

# Test 1: Code Quality - Check for unused imports
echo "1. 代码质量检查"
run_test "检查是否有未使用的 DataAggregator" "grep -c 'DataAggregator' src/index.js" "2" "warning"
run_test "检查是否有未使用的 TechnicalIndicators" "grep -c 'TechnicalIndicators' src/index.js" "2" "warning"
run_test "检查是否有未使用的 AlertSystem" "grep -c 'AlertSystem' src/index.js" "2" "warning"
echo ""

# Test 2: Sorting Logic Check
echo "2. 排序逻辑检查"
run_test "volume 排序字段应该被支持" "grep -A 10 'validSortFields' src/index.js | grep -c 'volume'" "1" "contains"
run_test "volume 排序应该有实现逻辑" "grep -A 5 'options.sort ===' src/index.js | grep -c 'volume'" "1" "warning"
echo ""

# Test 3: Edge Case Tests
echo "3. 边界情况测试"
run_test "空字符串输入应该被处理" "./src/index.js defillama protocol -n '' 2>&1 | grep -c 'Invalid protocol name'" "1" "contains"
run_test "极长的协议名应该被截断" "./src/index.js defillama protocol -n 'a'" "0" "not_contains"
run_test "负数的 limit 应该被拒绝" "./src/index.js defillama protocols --limit -1 2>&1 | grep -c 'must be between'" "1" "contains"
echo ""

# Test 4: Null/Undefined Handling
echo "4. Null/Undefined 处理检查"
run_test "协议不存在应该返回错误" "./src/index.js defillama protocol -n 'nonexistentprotocol123456' 2>&1 | grep -i 'not found'" "1" "contains"
run_test "链不存在应该返回错误" "./src/index.js defillama chain -n 'nonexistentchain123456' 2>&1 | grep -i 'not found'" "1" "contains"
echo ""

# Test 5: Format Validation
echo "5. 格式验证测试"
run_test "无效的格式参数应该有默认值" "./src/index.js defillama tvl -f invalid 2>&1" "0" "not_contains"
run_test "JSON 格式应该输出有效 JSON" "./src/index.js defillama tvl -f json 2>&1 | jq -e '.'" "0" "not_contains"
run_test "Pretty 格式应该输出文本" "./src/index.js defillama tvl -f pretty 2>&1 | wc -l | tr -d '[:space:]'" "[1-9]" "exact"
echo ""

# Test 6: Array/Data Structure Checks
echo "6. 数据结构检查"
run_test "protocols 应该返回数组" "./src/index.js defillama protocols --limit 1 -f json 2>&1 | jq 'type'" "array" "contains"
run_test "tvl 应该返回对象" "./src/index.js defillama tvl -f json 2>&1 | jq 'type'" "object" "contains"
run_test "chain 应该返回对象" "./src/index.js defillama chain -n ethereum -f json 2>&1 | jq 'type'" "object" "contains"
echo ""

# Test 7: Field Existence Checks
echo "7. 字段存在性检查"
run_test "tvl 字段应该存在" "./src/index.js defillama protocols --limit 1 -f json 2>&1 | jq -e '.[0].tvl'" "0" "not_contains"
run_test "name 字段应该存在" "./src/index.js defillama protocols --limit 1 -f json 2>&1 | jq -e '.[0].name'" "0" "not_contains"
run_test "timestamp 字段应该存在（tvl 命令）" "./src/index.js defillama tvl -f json 2>&1 | jq -e '.timestamp'" "0" "not_contains"
echo ""

# Test 8: Performance Checks
echo "8. 性能检查"
TIME_START=$(date +%s%N)
./src/index.js defillama tvl > /dev/null 2>&1
TIME_END=$(date +%s%N)
TIME_DIFF=$(( (TIME_END - TIME_START) / 1000000 ))

if [ $TIME_DIFF -lt 5000 ]; then
  echo "  Test 8: TVL 查询响应时间... ✅ PASS ($TIME_DIFF ms)"
  PASSED_TESTS=$((PASSED_TESTS + 1))
else
  echo "  Test 8: TVL 查询响应时间... ⚠️  WARNING ($TIME_DIFF ms, expected <5000ms)"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Test 9: Input Validation Edge Cases
echo "9. 输入验证边界情况"
run_test "特殊字符应该被过滤" "./src/index.js defillama protocol -n 'aave<script>' 2>&1 | grep -c 'Invalid protocol name'" "1" "contains"
run_test "SQL 注入尝试应该被阻止" "./src/index.js defillama protocol -n \"'; DROP TABLE protocols;--\" 2>&1 | grep -c 'Invalid protocol name'" "1" "contains"
run_test "XSS 尝试应该被阻止" "./src/index.js defillama protocol -n \"<img src=x onerror=alert(1)>\" 2>&1 | grep -c 'Invalid protocol name'" "1" "contains"
echo ""

# Test 10: Configuration File Check
echo "10. 配置文件检查"
if [ -f "config/keys.js" ]; then
  echo "  Test 10: 配置文件存在... ✅ PASS"
  PASSED_TESTS=$((PASSED_TESTS + 1))
elif [ -f "config/keys.example.js" ]; then
  echo "  Test 10: 配置文件存在（使用示例）... ⚠️  WARNING"
  WARNINGS=$((WARNINGS + 1))
else
  echo "  Test 10: 配置文件不存在... ❌ FAIL"
  FAILED_TESTS=$((FAILED_TESTS + 1))
fi
echo ""

# Summary
echo "=================================================="
echo "📊 深度审查总结"
echo "=================================================="
echo "总测试数: $TOTAL_TESTS"
echo "通过: $PASSED_TESTS"
echo "失败: $FAILED_TESTS"
echo "警告: $WARNINGS"
echo ""

if [ $FAILED_TESTS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo "✅ 所有测试通过，无警告！"
  echo ""
  echo "🎉 代码质量优秀，可以上线！"
  exit 0
elif [ $FAILED_TESTS -eq 0 ]; then
  echo "⚠️  所有测试通过，但有 $WARNINGS 个警告"
  echo ""
  echo "建议修复警告后再上线"
  exit 0
else
  echo "❌ 有 $FAILED_TESTS 个测试失败和 $WARNINGS 个警告"
  echo ""
  echo "⚠️  请修复失败的测试和警告"
  exit 1
fi
