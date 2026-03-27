/**
 * Curl-based HTTP client for bypassing TLS fingerprinting
 * Falls back to curl when Node.js connections are blocked
 */

const { spawn } = require('child_process');
const NodeCache = require('node-cache');

class CurlHttpClient {
  constructor(config = {}) {
    this.cache = new NodeCache({
      stdTTL: config.defaultCacheDuration || 300,
      checkperiod: 60
    });
    this.timeout = config.timeout || 30000;
    this.debug = config.debug || false;

    // IP 直连配置
    this.useIpDirect = config.useIpDirect || false;
    this.ipBaseUrl = config.ipBaseUrl || null;
    this.hostHeader = config.hostHeader || null;
  }

  /**
   * Make HTTP request using curl
   */
  async request(options) {
    const cacheKey = this.getCacheKey(options);

    // Check cache first
    if (!options.noCache && this.cache.has(cacheKey)) {
      this.log('Cache hit', cacheKey);
      return this.cache.get(cacheKey);
    }

    try {
      const response = await this.curlRequest(options);

      // Cache the response
      if (!options.noCache) {
        this.cache.set(cacheKey, response, options.cacheDuration);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Execute curl command
   */
  curlRequest(options) {
    return new Promise((resolve, reject) => {
      // 构建 URL
      let url = options.url;
      if (this.useIpDirect && this.ipBaseUrl && url) {
        const originalUrl = new URL(url);
        const ipUrl = new URL(this.ipBaseUrl);
        url = `${this.ipBaseUrl}${originalUrl.pathname}${originalUrl.search}`;
        this.log('IP Direct URL:', url);
      }

      // 构建 curl 参数
      const args = [
        '-s', // silent mode
        '-L', // follow redirects
        '--max-time', Math.floor(this.timeout / 1000),
        '-H', `User-Agent: crypto-data-aggregator/1.0`
      ];

      // 添加 Host 头（IP 直连时需要）
      if (this.useIpDirect && this.hostHeader) {
        args.push('-H', `Host: ${this.hostHeader}`);
      }

      // 添加自定义 headers
      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          if (key.toLowerCase() !== 'user-agent') { // 避免重复
            args.push('-H', `${key}: ${value}`);
          }
        });
      }

      // IP 直连时禁用证书验证
      if (this.useIpDirect) {
        args.push('-k'); // insecure mode
      }

      // 添加 URL
      args.push(url);

      this.log('Executing curl:', args.join(' '));

      const curl = spawn('curl', args);
      let stdout = '';
      let stderr = '';

      curl.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      curl.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      curl.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Curl failed with code ${code}: ${stderr || 'Unknown error'}`));
        } else {
          try {
            // 尝试解析为 JSON
            const parsed = JSON.parse(stdout);
            resolve(parsed);
          } catch (e) {
            // 如果不是 JSON，返回原始字符串
            resolve(stdout.trim());
          }
        }
      });

      curl.on('error', (err) => {
        reject(new Error(`Curl spawn error: ${err.message}`));
      });
    });
  }

  /**
   * Generate cache key
   */
  getCacheKey(options) {
    const key = {
      url: options.url,
      method: options.method || 'GET',
      params: options.params || {},
      data: options.data || {}
    };
    return JSON.stringify(key);
  }

  /**
   * Clear cache
   */
  clearCache(pattern = null) {
    if (pattern) {
      const keys = this.cache.keys();
      keys.forEach(key => {
        if (key.includes(pattern)) {
          this.cache.del(key);
        }
      });
    } else {
      this.cache.flushAll();
    }
  }

  /**
   * Debug logging
   */
  log(...args) {
    if (this.debug) {
      console.log('[CurlHttpClient]', ...args);
    }
  }
}

module.exports = CurlHttpClient;
