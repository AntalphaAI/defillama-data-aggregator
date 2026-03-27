# 📥 Crypto Data Aggregator - 下载和使用指南

## 🚀 给小伙伴的下载方式

### 🌟 推荐方式：直接下载项目

**步骤：**

1. **下载项目**（任选一种）：

```bash
# 方式 A：从 GitHub 下载 ZIP 包
# （需要先上传到 GitHub）

# 方式 B：从本地目录复制
# 告诉小伙伴直接从你的服务器/电脑上复制整个项目文件夹：
# /workspace/projects/workspace/skills/crypto-data-aggregator/
```

2. **进入项目目录**
```bash
cd /workspace/projects/workspace/skills/crypto-data-aggregator/
```

3. **安装依赖**
```bash
npm install
```

4. **开始使用**
```bash
# 查看帮助
node src/index.js --help

# 测试基本功能
node src/index.js agg price -s BTC

# 查看平台信息
node src/index.js info platforms
```

---

## 📦 如果需要全局安装（可选）

```bash
# 在项目根目录执行
sudo npm install -g .

# 然后可以在任何地方使用
crypto-data agg price -s BTC
crypto-data info platforms
```

---

## 📚 快速验证

安装完成后，运行这些命令验证：

```bash
# 1. 查看平台信息
node src/index.js info platforms

# 2. 查询 BTC 价格
node src/index.js agg price -s BTC

# 3. 查看帮助
node src/index.js --help
```

---

## 🎯 系统要求

- Node.js >= 14.0.0
- npm >= 6.0.0

**查看版本：**
```bash
node --version
npm --version
```

---

## 📚 完整文档

- **安装指南**：`INSTALLATION_GUIDE.md`
- **功能指南**：`README.md`
- **平台价值**：`COMPLETE_GUIDE.md`
- **优化报告**：`OPTIMIZATION_SUMMARY.md`

---

## 🎉 核心功能

安装后，小伙伴可以：

1. **查询加密货币价格**
   - `node src/index.js agg price -s BTC`
   - `node src/index.js binance price -s BTCUSDT`

2. **技术分析**
   - `node src/index.js ta rsi -s BTC`
   - `node src/index.js ta bollinger -s BTC`

3. **平台对比**
   - `node src/index.js agg compare -s BTC,ETH`

4. **平台信息**
   - `node src/index.js info platforms`
   - `node src/index.js info platform <platform_name>`

5. **更多功能**
   - `node src/index.js --help`

---

**就这么简单！** 😊

**复制项目 → npm install → 开始使用** 🚀
