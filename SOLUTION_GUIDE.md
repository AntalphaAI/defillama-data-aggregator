# 🔧 CoinMarketCap网络问题解决方案

## 📊 问题描述

**错误信息：**
```
curl: (35) Recall failure: Connection reset by peer
crypto-data test: ✗ CMC: Network error: No response received from server
```

**原因：**
- 防火墙阻止了到CoinMarketCap的连接
- ISP或网络提供商的限制
- 地理位置限制
- 网络策略配置

---

## 🛠️ 解决方案

### 方案1：测试基本连接

```bash
# 测试DNS解析
nslookup pro-api.coinmarketcap.com

# 测试端口连接
telnet pro-api.coinmarketcap.com 443

# 测试HTTPS连接
curl -I https://pro-api.coinmarketcap.com/v1
```

### 方案2：使用代理或VPN（推荐）

**如果在中国大陆，CoinMarketCap可能被防火墙阻止**

**使用VPN：**
1. 连接到香港/日本/美国等地的VPN
2. 测试连接：
   ```bash
   curl -I https://pro-api.coinmarketcap.com/v1/cryptocurrency/map
   ```

**使用代理：**
```bash
# 使用HTTP代理
export HTTP_PROXY=http://proxy-server:port
export HTTPS_PROXY=http://proxy-server:port

# 测试
curl -I https://pro-api.coinmarketcap.com/v1/cryptocurrency/map
```

### 方案3：检查防火墙规则

```bash
# 检查防火墙状态
sudo ufw status

# 允许CoinMarketCap访问（如果使用ufw）
sudo ufw allow out 443/tcp to any from any
sudo ufw allow out 80/tcp to any from any
```

### 方案4：使用镜像API（临时方案）

如果直接连接失败，可以考虑：

**使用公共API镜像：**
- CoinGecko（免费API，数据类似）
- Coingecko（免费API，数据类似）

**替代方案：**
```bash
# 使用CoinGecko API
curl -s "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10"

# 使用替代的聚合工具
```

---

## 🔧 解决Nansen API问题的方案

## 📊 问题描述

**错误信息：**
```
HTTP/2 404 Not Found
✗ NANSEN: API error (400): Bad Request
```

**可能原因：**
- API密钥格式不正确
- API密钥需要验证或激活
- API端点URL不正确
- 账户状态需要验证

---

## 🛠️ 解决方案

### 方案1：验证API密钥格式

**Nansen API密钥应该是什么样的？**

通常格式：
- 一长串随机字符
- 32-64个字符
- 通常包含字母和数字
- 可能包含特殊字符

**你的密钥：** `xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl`

**格式检查：**
- 长度：32个字符
- 字符：字母和数字混合
- 无特殊字符

看起来格式是正确的。

### 方案2：检查Nansen账户状态

**步骤：**

1. **登录Nansen账户**
   - 访问 https://nansen.ai
   - 使用你的账户登录

2. **检查API Keys页面**
   - 寻找 "API Keys" 或 "API Management"
   - 查看你的API密钥列表
   - 确认密钥状态：
     - ✅ Active
     - ⚠️ Pending
     - ❌ Disabled/Expired

3. **检查账户状态**
   - 查看账户是否需要KYC
   - 检查账户是否需要验证邮箱
   - 检查账户是否有使用限制

### 方案3：验证API密钥权限

**API密钥需要的权限：**
- 基础查询权限
- 读访问权限
- 数据导出权限

**检查步骤：**
1. 在Nansen Dashboard中
2. 找到你的API密钥
3. 检查密钥的权限设置
4. 确认启用了必要的权限

### 方案4：尝试不同的API端点

**Nansen可能有不同的API版本或端点：**

**尝试这些端点：**
```bash
# 测试不同端点
curl -H "X-API-KEY: xnD3Y7LXELBZb3JyvdrLf2qHpW03iXxl" \
     https://api.nansen.ai/v1/gas-tracker

curl -H "X-API-KEY: xnD3Y7LXELBZb3JyvdrLf2qHpW03iXxl" \
     https://api.nansen.ai/v1/wallet-profiling/labels

curl -H "X-API-KEY: xnD3Y7LXELBZb3JyvdrLf2qHpW03iXxl" \
     https://api.nansen.ai/v1/smart-money/activity
```

### 方案5：联系Nansen支持

**如果以上方案都无效：**

1. 访问 https://nansen.ai
2. 查找 "Support" 或 "Help" 页面
3. 提交工单（Ticket）
4. 在工单中描述问题：
   - API密钥：`xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl`
   - 错误信息：404 Not Found / 400 Bad Request
   - 期望的功能：Gas Tracker / Whale Alerts / Smart Money
   - 使用场景：个人DeFi研究

---

## 🚀 推荐的解决方案

### 短期（1-2小时）- 尝试直接修复

**CoinMarketCap：**
```bash
# 1. 检查网络连接
ping -c 3 pro-api.coinmarketcap.com

# 2. 测试HTTPS连接
curl -I https://pro-api.coinmarketcap.com/v1

# 3. 如果都失败，使用VPN后重试
```

**Nansen：**
```bash
# 1. 测试API端点
curl -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     https://api.nansen.ai/v1/gas-tracker

# 2. 检查API密钥权限
# 登录Nansen Dashboard检查

# 3. 如果404，尝试其他端点
```

### 中期（1-2天）- 寻求技术支持

**CoinMarketCap：**
- 检查本地防火墙设置
- 联系网络管理员
- 考虑使用VPN服务

**Nansen：**
- 登录Nansen账户验证API密钥
- 查看Nansen文档确认端点
- 联系Nansen客服

### 长期（1-2周）- 使用替代方案

**如果短期和中期方案都无效：**

**CoinMarketCap替代：**
- **CoinGecko** - 免费API，数据类似
- **Coingecko** - 免费API，数据丰富

**Nansen替代：**
- **Dune Analytics** - 自定义SQL查询
- **DefiLlama** - 部分链上数据

---

## 📝 立即可以尝试的操作

### 1. 测试基本连接

```bash
# 测试CoinMarketCap网络
curl -I https://pro-api.coinmarketcap.com/v1

# 测试Nansen端点
curl -H "X-API-KEY: xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     https://api.nansen.ai/v1/gas-tracker
```

### 2. 检查Nansen账户

访问 https://nansen.ai，检查：
- API Keys页面
- 账户状态
- API密钥权限

### 3. 查看详细文档

```bash
# 查看Nansen API文档
curl https://docs.nansen.ai

# 查看CoinMarketCap文档
curl https://coinmarketcap.com/api/documentation
```

---

## 🎯 推荐优先级

### 优先级1：先解决Nansen（更容易修复）

**原因：**
- 可能只是API端点或密钥验证问题
- 网络层面应该是正常的

**步骤：**
1. 登录Nansen验证API密钥
2. 查看API文档确认正确用法
3. 测试不同的API端点
4. 联系Nansen支持

### 优先级2：再解决CoinMarketCap（可能需要外部支持）

**原因：**
- 可能需要网络配置
- 可能需要管理员权限
- 可能需要VPN

**步骤：**
1. 测试基本网络连接
2. 检查防火墙规则
3. 尝试使用VPN
4. 联系网络管理员

---

## 💡 我的建议

### 1. 立即行动（今天）

**测试Nansen API：**
```bash
curl -H "X-API-SECURITY: Bearer xnD3Y7LXELBZb3JyvDRlf2qHpW03iXxl" \
     https://api.nansen.ai/v1/gas-tracker
```

如果返回有效数据，说明是API端点问题，我可以修复。

### 2. 今天内完成

**登录Nansen账户验证：**
1. 检查API密钥状态
2. 确认账户状态
3. 查看API文档

### 3. 本周内完成

**解决CoinMarketCap网络问题：**
1. 检查网络配置
2. 测试VPN连接
3. 联系网络管理员

---

## 🔧 如果需要我修复代码

如果你确认是API端点或配置问题（而不是网络或验证问题），告诉我：
- Nansen API文档的正确端点
- API密钥的正确格式
- 需要的认证方式

我会立即修复代码并测试！

---

## 📞 需要我立即做什么吗？

**选项1：**
```bash
# 我可以立即尝试不同的API端点来修复Nansen
```

**选项2：**
```bash
# 我可以创建一个测试脚本帮你诊断问题
```

**选项3：**
```bash
# 我可以查看当前的API客户端代码，确认是否需要调整
```

**请告诉我你想要我执行哪个选项，或者你有Nansen的API文档链接，我可以根据文档修复！**
