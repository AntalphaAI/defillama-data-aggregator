/**
 * Alert System Manager
 * Manages shared AlertSystem instance
 */

const AlertSystem = require('./alert-system');

class AlertSystemManager {
  constructor() {
    this.alertSystem = null;
    this.initialized = false;
  }

  async getInstance() {
    if (!this.alertSystem) {
      this.alertSystem = new AlertSystem();
    }
    
    if (!this.initialized) {
      await this.alertSystem.loadAlerts();
      this.initialized = true;
    }
    
    return this.alertSystem;
  }
}

module.exports = new AlertSystemManager();
