/**
 * Price Alert System
 * Monitor prices and trigger alerts when conditions are met
 */

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class AlertSystem {
  constructor(options = {}) {
    this.alertsFile = options.alertsFile || path.join(process.cwd(), '.alerts.json');
    this.alerts = [];
    this.activeAlerts = [];
    this.debug = options.debug || false;
    
    // Load existing alerts
    this.loadAlerts().catch(err => {
      if (this.debug) console.warn('Failed to load alerts:', err.message);
    });
  }

  /**
   * Load alerts from file
   */
  async loadAlerts() {
    try {
      const data = await fs.readFile(this.alertsFile, 'utf8');
      const loadedAlerts = JSON.parse(data);
      this.alerts = loadedAlerts || [];
      if (this.debug) console.log(`Loaded ${this.alerts.length} alerts`);
    } catch (error) {
      this.alerts = [];
    }
    return this.alerts;
  }

  /**
   * Save alerts to file
   */
  async saveAlerts() {
    try {
      await fs.mkdir(path.dirname(this.alertsFile), { recursive: true });
      await fs.writeFile(this.alertsFile, JSON.stringify(this.alerts, null, 2), 'utf8');
      if (this.debug) console.log(`Saved ${this.alerts.length} alerts`);
    } catch (error) {
      console.error('Failed to save alerts:', error.message);
      throw error;
    }
  }

  /**
   * Generate unique alert ID
   */
  generateId() {
    return crypto.randomBytes(8).toString('hex');
  }

  /**
   * Add a new alert
   */
  async addAlert(alert) {
    const id = this.generateId();
    const newAlert = {
      id,
      symbol: alert.symbol.toUpperCase(),
      condition: alert.condition, // 'above', 'below', 'change-above', 'change-below'
      value: alert.value,
      threshold: alert.threshold || 0,
      enabled: true,
      triggered: false,
      triggerCount: 0,
      createdAt: new Date().toISOString(),
      lastTriggeredAt: null,
      notes: alert.notes || ''
    };

    this.alerts.push(newAlert);
    await this.saveAlerts();
    return newAlert;
  }

  /**
   * Remove an alert
   */
  async removeAlert(id) {
    const index = this.alerts.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Alert with ID ${id} not found`);
    }

    const removed = this.alerts.splice(index, 1)[0];
    await this.saveAlerts();
    return removed;
  }

  /**
   * Enable/Disable an alert
   */
  async toggleAlert(id, enabled) {
    const alert = this.alerts.find(a => a.id === id);
    if (!alert) {
      throw new Error(`Alert with ID ${id} not found`);
    }

    alert.enabled = enabled;
    await this.saveAlerts();
    return alert;
  }

  /**
   * Get all alerts
   */
  getAlerts(options = {}) {
    let alerts = this.alerts;

    if (options.symbol) {
      alerts = alerts.filter(a => a.symbol === options.symbol.toUpperCase());
    }

    if (options.enabled !== undefined) {
      alerts = alerts.filter(a => a.enabled === options.enabled);
    }

    if (options.triggered !== undefined) {
      alerts = alerts.filter(a => a.triggered === options.triggered);
    }

    return alerts;
  }

  /**
   * Get single alert
   */
  getAlert(id) {
    return this.alerts.find(a => a.id === id);
  }

  /**
   * Clear all alerts
   */
  async clearAlerts() {
    this.alerts = [];
    await this.saveAlerts();
  }

  /**
   * Check price against alerts and return triggered alerts
   */
  async checkPrice(symbol, price, previousPrice = null) {
    const symbolUpper = symbol.toUpperCase();
    const triggered = [];

    for (const alert of this.alerts) {
      if (!alert.enabled || alert.symbol !== symbolUpper) continue;

      let shouldTrigger = false;
      let message = '';

      switch (alert.condition) {
        case 'above':
          shouldTrigger = price > alert.value;
          message = `Price is above $${alert.value}`;
          break;

        case 'below':
          shouldTrigger = price < alert.value;
          message = `Price is below $${alert.value}`;
          break;

        case 'change-above':
          if (previousPrice !== null) {
            const change = ((price - previousPrice) / previousPrice * 100);
            shouldTrigger = change > alert.value;
            message = `Price changed by ${change.toFixed(2)}% (above ${alert.value}%)`;
          }
          break;

        case 'change-below':
          if (previousPrice !== null) {
            const change = ((price - previousPrice) / previousPrice * 100);
            shouldTrigger = change < -alert.value;
            message = `Price dropped by ${Math.abs(change).toFixed(2)}% (below ${alert.value}%)`;
          }
          break;
      }

      if (shouldTrigger) {
        alert.triggered = true;
        alert.triggerCount++;
        alert.lastTriggeredAt = new Date().toISOString();

        triggered.push({
          alert,
          currentPrice: price,
          previousPrice,
          message,
          triggeredAt: alert.lastTriggeredAt
        });

        if (this.debug) {
          console.log(`Alert triggered: ${symbol} - ${message}`);
        }
      }
    }

    if (triggered.length > 0) {
      await this.saveAlerts();
    }

    return triggered;
  }

  /**
   * Get alert summary
   */
  getSummary() {
    const summary = {
      total: this.alerts.length,
      enabled: this.alerts.filter(a => a.enabled).length,
      disabled: this.alerts.filter(a => !a.enabled).length,
      triggered: this.alerts.filter(a => a.triggered).length,
      bySymbol: {},
      byCondition: {}
    };

    this.alerts.forEach(alert => {
      summary.bySymbol[alert.symbol] = (summary.bySymbol[alert.symbol] || 0) + 1;
      summary.byCondition[alert.condition] = (summary.byCondition[alert.condition] || 0) + 1;
    });

    return summary;
  }

  /**
   * Get alert history
   */
  getHistory(limit = 50) {
    const history = [];

    this.alerts.forEach(alert => {
      if (alert.lastTriggeredAt) {
        history.push({
          id: alert.id,
          symbol: alert.symbol,
          condition: alert.condition,
          value: alert.value,
          triggeredAt: alert.lastTriggeredAt,
          triggerCount: alert.triggerCount
        });
      }
    });

    // Sort by triggered time (most recent first)
    history.sort((a, b) => new Date(b.triggeredAt) - new Date(a.triggeredAt));

    return history.slice(0, limit);
  }

  /**
   * Export alerts
   */
  async exportAlerts(format = 'json') {
    if (format === 'json') {
      return JSON.stringify(this.alerts, null, 2);
    } else if (format === 'csv') {
      const headers = ['id', 'symbol', 'condition', 'value', 'enabled', 'triggered', 'triggerCount', 'createdAt', 'lastTriggeredAt'];
      const rows = this.alerts.map(a => 
        headers.map(h => a[h]).join(',')
      );
      return [headers.join(','), ...rows].join('\n');
    } else {
      throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Import alerts
   */
  async importAlerts(data, format = 'json') {
    let imported = [];

    if (format === 'json') {
      const alerts = JSON.parse(data);
      for (const alert of alerts) {
        const newAlert = await this.addAlert(alert);
        imported.push(newAlert);
      }
    } else {
      throw new Error(`Unsupported import format: ${format}`);
    }

    return imported;
  }
}

module.exports = AlertSystem;
