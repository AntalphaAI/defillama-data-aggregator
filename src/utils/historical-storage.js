/**
 * Historical Data Storage
 * Store and query historical price data
 */

const fs = require('fs').promises;
const path = require('path');

class HistoricalDataStorage {
  constructor(options = {}) {
    this.dataDir = options.dataDir || path.join(process.cwd(), '.historical');
    this.dbFile = options.dbFile || path.join(this.dataDir, 'prices.json');
    this.data = new Map();
    this.maxEntries = options.maxEntries || 10000;
    
    this.initialize();
  }

  /**
   * Initialize storage
   */
  async initialize() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
      await this.load();
    } catch (error) {
      console.warn('Failed to initialize historical storage:', error.message);
    }
  }

  /**
   * Load data from file
   */
  async load() {
    try {
      const data = await fs.readFile(this.dbFile, 'utf8');
      const json = JSON.parse(data);
      
      // Convert back to Map
      this.data = new Map(Object.entries(json));
      
      if (json && typeof json === 'object') {
        Object.entries(json).forEach(([symbol, entries]) => {
          this.data.set(symbol, entries);
        });
      }
    } catch (error) {
      // File doesn't exist or is empty
      this.data = new Map();
    }
  }

  /**
   * Save data to file
   */
  async save() {
    try {
      // Convert Map to object
      const obj = {};
      this.data.forEach((value, key) => {
        obj[key] = value;
      });

      await fs.writeFile(this.dbFile, JSON.stringify(obj, null, 2), 'utf8');
    } catch (error) {
      console.error('Failed to save historical data:', error.message);
      throw error;
    }
  }

  /**
   * Add price data point
   */
  async addPrice(symbol, price, timestamp = Date.now()) {
    const key = symbol.toUpperCase();
    
    if (!this.data.has(key)) {
      this.data.set(key, []);
    }

    const entries = this.data.get(key);
    entries.push({
      price: parseFloat(price),
      timestamp,
      date: new Date(timestamp).toISOString()
    });

    // Limit entries
    if (entries.length > this.maxEntries) {
      entries.shift();
    }

    // Auto-save
    await this.save();
  }

  /**
   * Get price history for a symbol
   */
  async getPriceHistory(symbol, options = {}) {
    const key = symbol.toUpperCase();
    const entries = this.data.get(key) || [];

    let filtered = entries;

    // Filter by date range
    if (options.from || options.to) {
      const from = options.from ? new Date(options.from).getTime() : 0;
      const to = options.to ? new Date(options.to).getTime() : Date.now();
      filtered = entries.filter(e => e.timestamp >= from && e.timestamp <= to);
    }

    // Limit
    if (options.limit) {
      filtered = filtered.slice(-options.limit);
    }

    return filtered;
  }

  /**
   * Get all symbols
   */
  async getSymbols() {
    return Array.from(this.data.keys());
  }

  /**
   * Get statistics for a symbol
   */
  async getStats(symbol) {
    const entries = await this.getPriceHistory(symbol);
    
    if (entries.length === 0) {
      return null;
    }

    const prices = entries.map(e => e.price);
    const sorted = [...prices].sort((a, b) => a - b);

    return {
      symbol: symbol.toUpperCase(),
      count: entries.length,
      firstPrice: sorted[0],
      lastPrice: sorted[sorted.length - 1],
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: prices.reduce((a, b) => a + b, 0) / prices.length,
      change: sorted[sorted.length - 1] - sorted[0],
      changePercent: ((sorted[sorted.length - 1] - sorted[0]) / sorted[0] * 100).toFixed(2),
      firstTimestamp: entries[0].timestamp,
      lastTimestamp: entries[entries.length - 1].timestamp
    };
  }

  /**
   * Search for price patterns
   */
  async search(pattern) {
    const results = [];

    for (const [symbol, entries] of this.data.entries()) {
      const matches = entries.filter(e => 
        symbol.toLowerCase().includes(pattern.toLowerCase()) ||
        JSON.stringify(e).toLowerCase().includes(pattern.toLowerCase())
      );

      if (matches.length > 0) {
        results.push({
          symbol,
          matches: matches.length,
          lastPrice: entries[entries.length - 1].price
        });
      }
    }

    return results;
  }

  /**
   * Clear data for a symbol
   */
  async clearSymbol(symbol) {
    this.data.delete(symbol.toUpperCase());
    await this.save();
  }

  /**
   * Clear all data
   */
  async clearAll() {
    this.data.clear();
    await this.save();
  }

  /**
   * Get storage info
   */
  async getStorageInfo() {
    const stats = await fs.stat(this.dbFile).catch(() => ({ size: 0 }));
    
    const symbolStats = {};
    this.data.forEach((entries, symbol) => {
      symbolStats[symbol] = {
        count: entries.length,
        oldest: entries[0]?.timestamp,
        newest: entries[entries.length - 1]?.timestamp
      };
    });

    return {
      file: this.dbFile,
      size: stats.size || 0,
      symbols: this.data.size,
      totalEntries: Array.from(this.data.values()).reduce((sum, entries) => sum + entries.length, 0),
      symbolStats
    };
  }

  /**
   * Export data
   */
  async export(format = 'json', options = {}) {
    const symbols = options.symbols || await this.getSymbols();

    if (format === 'json') {
      const data = {};
      for (const symbol of symbols) {
        data[symbol] = await this.getPriceHistory(symbol, options);
      }
      return JSON.stringify(data, null, 2);
    } else if (format === 'csv') {
      const headers = ['Symbol', 'Price', 'Timestamp', 'Date'];
      const rows = [headers.join(',')];

      for (const symbol of symbols) {
        const entries = await this.getPriceHistory(symbol, options);
        entries.forEach(e => {
          rows.push(`${symbol},${e.price},${e.timestamp},${e.date}`);
        });
      }

      return rows.join('\n');
    } else {
      throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Import data
   */
  async import(data, format = 'json') {
    if (format === 'json') {
      const json = JSON.parse(data);
      
      for (const [symbol, entries] of Object.entries(json)) {
        if (Array.isArray(entries)) {
          for (const entry of entries) {
            await this.addPrice(symbol, entry.price, entry.timestamp || Date.now());
          }
        }
      }

      return { imported: Object.keys(json).length };
    } else {
      throw new Error(`Unsupported import format: ${format}`);
    }
  }
}

module.exports = HistoricalDataStorage;
