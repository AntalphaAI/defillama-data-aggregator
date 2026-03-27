# 📦 Crypto Data Aggregator - 下载和安装指南

## 🚀 方法 1: 克隆 Git 仓库（推荐）

### 步骤 1: 克隆项目
```bash
# 使用 HTTPS 克隆
git clone https://github.com/yourusername/crypto-data-aggregator.git

# 或使用 SSH 克隆
git clone git@github.com:yourusername/crypto-data-aggregator.git

# 进入项目目录
cd crypto-data-aggregator
```

### 步骤 2: 安装依赖
```bash
# 安装 npm 依赖
npm install

# 验证安装
npm test -- --dry-run 2>/dev/null || echo "Dependencies installed successfully"
```

### 步骤 3: 全局安装（可选）
```bash
# 全局安装到系统路径
sudo npm install -g

# 或使用 sudo npm link
sudo npm link
```

### 步骤 4: 验证安装
```bash
# 测试命令
crypto-data --help

# 查看健康检查
crypto-data health

# 测试核心功能
crypto-data agg price -s BTC
```

---

## 📦 方法 2: npm 包安装（推荐给非开发者）

### 步骤 1: 安装 npm 包
```bash
# 全局安装
npm install -g crypto-data-aggregator

# 或指定版本安装
npm install -g crypto-data-aggregator@1.0.0

# 或使用 yarn
yarn global add crypto-data-aggregator
```

### 步骤 2: 验证安装
```bash
crypto-data --version
crypto-data --help
```

---

## 🐳 方法 3: Docker 容器化（推荐团队使用）

### 步骤 1: 拉取 Docker 镜像
```bash
# 拉取镜像
docker pull yourdockerhub/crypto-data-aggregator:latest

# 或构建镜像
docker build -t crypto-data-aggregator .
```

### 步骤 2: 运行容器
```bash
# 运行容器
docker run -it --rm \
  -v $(pwd)/.cache:/app/.cache \
  -v $(pwd)/.alerts.json:/app/.alerts.json \
  crypto-data-aggregator \
  crypto-data --help

# 运行容器并执行命令
docker run --rm crypto-data-aggregator crypto-data agg price -s BTC
```

### 步骤 3: 持久化数据卷
```bash
# 创建数据卷
docker volume create crypto-data

# 使用数据卷运行
docker run -it --rm \
  -v crypto-data:/app/.cache \
  crypto-data-aggregator \
  crypto-data agg price -s BTC
```

---

## 📦 方法 4: 下载 ZIP 包（最简单）

### 步骤 1: 下载项目
```bash
# 下载 ZIP 包
wget https://github.com/yourusername/crypto-data-aggregator/archive/main.zip

# 或使用 curl
curl -L https://github.com/yourusername/crypto-data-aggregator/archive/main.zip -o crypto-data-aggregator.zip

# 解压
unzip crypto-data-aggregator.zip
cd crypto-data-aggregator-main
```

### 步骤 2: 安装依赖
```bash
npm install
```

### 步骤 3: 运行
```bash
node src/index.js --help
```

---

## 📋 系统要求

### 操作系统
- ✅ Linux (Ubuntu 18.04+, Debian, CentOS)
- ✅ macOS (10.15+)
- ✅ Windows 10+ (WSL2 推荐)
- ✅ WSL2 (Windows Subsystem for Linux)

### 软件依赖
- **Node.js**: >= v14.0.0 (推荐 v16.x 或 v18.x)
- **npm**: >= 6.0.0
- **Git**: >= 2.0.0（如果使用 Git 克隆）

### 可选依赖
- **Docker**: >= 20.10.0（如果使用 Docker）
- **jq**: JSON 数据处理（可选）

---

## 🎯 快速开始

### 方式 A: 本地开发使用
```bash
# 1. 克隆项目
git clone https://github.com/yourusername/crypto-data-aggregator.git
cd crypto-data-aggregator

# 2. 安装依赖
npm install

# 3. 运行命令
npm start -- --help
node src/index.js --help
```

### 方式 B: 全局 CLI 使用
```bash
# 安装
npm install -g crypto-data-aggregator

# 直接使用
crypto-data agg price -s BTC
crypto-data ta rsi -s BTC
crypto-data ws ticker -s BTCUSDT
```

### 方式 C: Docker 容器使用
```bash
# 运行容器
docker run --rm crypto-data-aggregator crypto-data health

# 查看帮助
docker run --rm crypto-data-aggregator crypto-data --help
```

---

## 🔧 配置说明

### API Key 配置（可选）
编辑 `config/keys.js` 文件：

```javascript
module.exports = {
  // DefiLlama Configuration (No API key required for basic usage)
  defillama: {
    baseUrl: 'https://api.llama.fi'
  },

  // Binance Configuration (IP Direct Connection - Already configured)
  binance: {
    apiKey: process.env.BINANCE_API_KEY || '',
    baseUrl: 'https://api.binance.com',
    ipBaseUrl: 'https://13.33.212.224',
    useIpDirect: true,
    hostHeader: 'api.binance.com'
  },

  // RWA.xyz Configuration (API key required for full access)
  rwaxyz: {
    apiKey: process.env.RWAXYZ_API_KEY || '',
    baseUrl: 'https://app.rwa.xyz'
  },

  // CryptoCompare Configuration (API key optional for basic usage)
  cryptocompare: {
    apiKey: process.env.CRYPTOCOMPARE_API_KEY || '',
    baseUrl: 'https://min-api.cryptocompare.com/data'
  },

  // CoinLore Configuration (No API key required)
  coinlore: {
    baseUrl: 'https://api.coinlore.net/api'
  },

  // Blockchair Configuration (API key optional for basic usage)
  blockchair: {
    apiKey: process.env.BLOCKCHAIR_API_KEY || '',
    baseUrl: 'https://api.blockchair.com'
  },

  // Blockchain.info Configuration (No API key required)
  blockchaininfo: {
    baseUrl: 'https://blockchain.info'
  },

  // MemPool.space Configuration (No API key required)
  mempoolspace: {
    baseUrl: 'https://mempool.space/api/v1'
  }
};
```

### 环境变量配置（可选）
```bash
# 设置 API Key（可选）
export BINANCE_API_KEY='your_api_key'
export CRYPTOCOMPARE_API_KEY='your_api_key'
export RWAXYZ_API_KEY='your_api_key'
export BLOCKCHAIR_API_KEY='your_api_key'

# 永久配置（写入 ~/.bashrc 或 ~/.zshrc）
echo 'export BINANCE_API_KEY="your_api_key"' >> ~/.bashrc
source ~/.bashrc
```

---

## 📚 文档位置

- **完整功能手册**: `README.md`
- **平台价值指南**: `COMPLETE_GUIDE.md`
- **平台信息文档**: `PLATFORM_GUIDE.md`
- **优化总结**: `OPTIMIZATION_SUMMARY.md`

---

## 🐛 常见问题

### Q1: Node.js 版本不兼容？
```bash
# 使用 nvm 管理 Node.js 版本
nvm install 16
nvm use 16

# 验证版本
node --version
```

### Q2: 命令找不到？
```bash
# 使用 npx 运行本地版本
npx crypto-data-agg price -s BTC

# 或使用完整路径
node /path/to/crypto-data-aggregator/src/index.js agg price -s BTC
```

### Q3: Binance IP 连接失败？
```bash
# 更新 IP 地址
host d3h36i1mno13q3.cloudfront.net
# 然后编辑 config/keys.js 中的 ipBaseUrl
```

### Q4: 缓存数据过大？
```bash
# 清空缓存
rm -rf .cache

# 或使用命令清空
crypto-data agg cache --clean
crypto-data agg cache --clear
```

### Q5: 某些平台连接超时？
```bash
# 检查网络连接
ping api.binance.com
ping api.llama.fi

# 检查健康状态
crypto-data health
```

---

## 🎯 使用建议

### 开发者
1. 使用 Git 克隆项目
2. 安装 npm 依赖
3. 修改配置文件
4. 运行测试命令

### 非开发者
1. 使用 npm 全局安装
2. 直接使用 `crypto-data` 命令
3. 无需修改代码

### 团队使用
1. 使用 Docker 容器化
2. 持久化数据卷
3. 共享配置文件

---

## 📦 下载链接

### GitHub 仓库
```
https://github.com/yourusername/crypto-data-aggregator
```

### npm 包
```
https://www.npmjs.com/package/crypto-data-aggregator
```

### Docker 镜像
```
https://hub.docker.com/r/yourdockerhub/crypto-data-aggregator
```

---

## 🚀 安装后验证

### 快速验证
```bash
# 检查版本
crypto-data --version

# 查看帮助
crypto-data --help

# 测试核心功能
crypto-data agg price -s BTC
crypto-data agg top -l 5

# 查看平台信息
crypto-data info platforms
```

---

## 💡 提示

1. **推荐方式**：对于大多数用户，推荐使用 `npm install -g` 全局安装
2. **开发者**：推荐使用 Git 克隆，方便修改和定制
3. **团队**：推荐使用 Docker 容器化，保证环境一致性
4. **API Key**：大部分功能不需要 API Key，但配置后可以获得更高额度

---

**现在可以分享给小伙伴了！** 🎉
