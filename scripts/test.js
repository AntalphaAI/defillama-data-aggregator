#!/usr/bin/env node

/**
 * Quick test script to verify installation
 */

const path = require('path');

// Load configuration
let config;
try {
  config = require(path.join(__dirname, '../config/keys.js'));
} catch (error) {
  console.error('❌ config/keys.js not found. Copy config/keys.example.js to config/keys.js');
  process.exit(1);
}

console.log('✓ Configuration loaded');

// Import clients
const DefiLlamaClient = require('../src/platforms/defillama');
const CoinMarketCapClient = require('../src/platforms/coinmarketcap');
const CoinglassClient = require('../src/platforms/coinglass');
const NansenClient = require('../src/platforms/nansen');
const DuneClient = require('../src/platforms/dune');

console.log('✓ All clients imported');

// Test initialization
const defillama = new DefiLlamaClient(config);
const cmc = new CoinMarketCapClient(config);
const coinglass = new CoinglassClient(config);
const nansen = new NansenClient(config);
const dune = new DuneClient(config);

console.log('✓ All clients initialized');
console.log('');
console.log('✅ Installation verified successfully!');
console.log('');
console.log('You can now use the crypto-data CLI:');
console.log('  crypto-data --help');
console.log('  crypto-data defillama tvl');
console.log('  crypto-data cmc price --symbols BTC,ETH');
console.log('');
