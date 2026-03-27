#!/usr/bin/env node

/**
 * API Status Checker
 * Tests all API connections and reports status
 */

const path = require('path');

// Load configuration
let config;
try {
  config = require(path.join(__dirname, '../config/keys.js'));
} catch (error) {
  console.error('❌ config/keys.js not found');
  process.exit(1);
}

const chalk = require('chalk');

// Import clients
const DefiLlamaClient = require('../src/platforms/defillama');
const CoinMarketCapClient = require('../src/platforms/coinmarketcap');
const CoinglassClient = require('../src/platforms/coinglass');
const NansenClient = require('../src/platforms/nansen');
const DuneClient = require('../src/platforms/dune');

// Test functions
async function testDefiLlama() {
  try {
    const client = new DefiLlamaClient(config);
    await client.getProtocols();
    return { status: '✓', error: null };
  } catch (error) {
    return { status: '✗', error: error.message };
  }
}

async function testCoinMarketCap() {
  try {
    const client = new CoinMarketCapClient(config);
    await client.getQuotes(['BTC']);
    return { status: '✓', error: null };
  } catch (error) {
    return { status: '✗', error: error.message };
  }
}

async function testCoinglass() {
  try {
    const client = new CoinglassClient(config);
    await client.getFundingRates('BTCUSDT');
    return { status: '✓', error: null };
  } catch (error) {
    return { status: '✗', error: error.message };
  }
}

async function testNansen() {
  try {
    const client = new NansenClient(config);
    await client.getGasTracker();
    return { status: '✓', error: null };
  } catch (error) {
    return { status: '✗', error: error.message };
  }
}

async function testDune() {
  try {
    const client = new DuneClient(config);
    await client.getPopularQueries(1);
    return { status: '✓', error: null };
  } catch (error) {
    return { status: '✗', error: error.message };
  }
}

async function main() {
  console.log('\n📊 Crypto Data Aggregator - API Status Check\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const platforms = [
    { name: 'DefiLlama', test: testDefiLlama, apiKey: 'Not required', baseUrl: config.defillama.baseUrl },
    { name: 'CoinMarketCap', test: testCoinMarketCap, apiKey: config.coinmarketcap.apiKey, baseUrl: config.coinmarketcap.baseUrl },
    { name: 'Coinglass', test: testCoinglass, apiKey: config.coinglass.apiKey, baseUrl: config.coinglass.baseUrl },
    { name: 'Nansen', test: testNansen, apiKey: config.nansen.apiKey, baseUrl: config.nansen.baseUrl },
    { name: 'Dune', test: testDune, apiKey: config.dune.apiKey, baseUrl: config.dune.baseUrl }
  ];

  for (const platform of platforms) {
    const hasApiKey = platform.apiKey && !platform.apiKey.includes('YOUR_') && !platform.apiKey.includes('N/A');
    const apiKeyStatus = hasApiKey ? '✓ Configured' : '✗ Not configured';

    process.stdout.write(`Testing ${platform.name.padEnd(20)} ... `);

    const result = await platform.test();

    if (result.status === '✓') {
      console.log(chalk.green('✓ CONNECTED'));
    } else {
      console.log(chalk.red('✗ FAILED'));
    }

    console.log(`  API Key:       ${apiKeyStatus}`);
    console.log(`  Base URL:      ${platform.baseUrl}`);
    if (result.error) {
      console.log(`  Error:         ${chalk.red(result.error)}`);
    }
    console.log('');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('💡 Tips:');
  console.log('');
  console.log('  • DefiLlama is free and should always work');
  console.log('  • Other platforms require API keys to function');
  console.log('  • Add API keys in config/keys.js or via environment variables');
  console.log('  • Get free API keys from each platform documentation');
  console.log('');
}

main().catch(error => {
  console.error(chalk.red('Fatal error:', error.message));
  process.exit(1);
});
