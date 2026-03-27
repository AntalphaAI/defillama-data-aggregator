/**
 * Persistent File Cache
 * Stores cached data to disk for cross-session persistence
 */

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

class FileCache {
  constructor(options = {}) {
    this.cacheDir = options.cacheDir || path.join(process.cwd(), '.cache');
    this.defaultTTL = options.defaultTTL || 30 * 60 * 1000; // 30 minutes default
    
    // Create cache directory synchronously
    try {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    } catch (error) {
      // Directory exists or error
    }
  }

  /**
   * Get cache key filename
   */
  getKeyFilename(key) {
    // Hash the key to create a safe filename
    const hash = require('crypto').createHash('md5').update(key).digest('hex');
    return path.join(this.cacheDir, `${hash}.json`);
  }

  /**
   * Get cached value
   */
  async get(key) {
    try {
      const filename = this.getKeyFilename(key);
      const data = await fsPromises.readFile(filename, 'utf8');
      const cached = JSON.parse(data);

      // Check if expired
      const now = Date.now();
      const ttl = cached.ttl || this.defaultTTL;
      if (now - cached.timestamp > ttl) {
        // Expired, delete and return null
        await this.delete(key);
        return null;
      }

      return cached.data;
    } catch (error) {
      // File doesn't exist or error
      return null;
    }
  }

  /**
   * Set cached value
   */
  async set(key, value, ttl) {
    try {
      const filename = this.getKeyFilename(key);
      const cached = {
        key,
        data: value,
        timestamp: Date.now(),
        ttl: ttl || this.defaultTTL
      };

      await fsPromises.writeFile(filename, JSON.stringify(cached, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error('Failed to write cache:', error.message);
      return false;
    }
  }

  /**
   * Delete cached value
   */
  async delete(key) {
    try {
      const filename = this.getKeyFilename(key);
      await fsPromises.unlink(filename);
      return true;
    } catch (error) {
      // File doesn't exist or error
      return false;
    }
  }

  /**
   * Clear all cache
   */
  async clear() {
    try {
      const files = await fsPromises.readdir(this.cacheDir);
      for (const file of files) {
        await fsPromises.unlink(path.join(this.cacheDir, file));
      }
      return true;
    } catch (error) {
      console.error('Failed to clear cache:', error.message);
      return false;
    }
  }

  /**
   * Get cache stats
   */
  async getStats() {
    try {
      const files = await fsPromises.readdir(this.cacheDir);
      const entries = [];

      for (const file of files) {
        const filepath = path.join(this.cacheDir, file);
        const stats = await fsPromises.stat(filepath);
        const data = JSON.parse(await fsPromises.readFile(filepath, 'utf8'));

        entries.push({
          key: data.key,
          age: Date.now() - data.timestamp,
          size: stats.size,
          ttl: data.ttl,
          expiresAt: data.timestamp + data.ttl
        });
      }

      return {
        size: entries.length,
        entries
      };
    } catch (error) {
      return {
        size: 0,
        entries: []
      };
    }
  }

  /**
   * Clean expired cache entries
   */
  async clean() {
    try {
      const files = await fsPromises.readdir(this.cacheDir);
      const now = Date.now();
      let cleaned = 0;

      for (const file of files) {
        const filepath = path.join(this.cacheDir, file);
        const data = JSON.parse(await fsPromises.readFile(filepath, 'utf8'));
        
        if (now - data.timestamp > (data.ttl || this.defaultTTL)) {
          await fsPromises.unlink(filepath);
          cleaned++;
        }
      }

      return cleaned;
    } catch (error) {
      return 0;
    }
  }
}

module.exports = FileCache;
