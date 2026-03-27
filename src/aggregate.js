#!/usr/bin/env node

/**
 * Aggregated Data Command
 * Query the same data type from multiple platforms
 */

const { Command } = require('commander');
const chalk = require('chalk');
const path = require('path');

// Load configuration
let config;
try {
  config = require(path.join(__dirname, '../config/keys.js'));
} catch (error) {
  console.error(chalk.red('Error: config/keys.js not found'));
  process.exit(1);
}

// Import platforms
const DefiLlamaClient = require('./platforms/defillama');
const CoinMarketCapClient = require('./platforms/coinmarketcap');
const CoinglassClient = require('./platforms/coinglass');

// Import utilities
const DataFormatter = require('./utils/formatter');

// Initialize clients
const defillama = new DefiLlamaClient(config);
const cmc = new CoinMarketCapClient(config);
const coinglass = new CoinglassClient(config);

// Output helper
function output(data, format) {
  switch (format.toLowerCase()) {
    case 'json':
      console.log(JSON.stringify(data, null, 2));
      break;
    case 'table':
      console.log(DataFormatter.table(data));
      break;
    case 'csv':
      console.log(DataFormatter.csv(data));
      break;
    case 'pretty':
      console.log(DataFormatter.pretty(data));
      break;
    default:
      console.log(JSON.stringify(data, null, 2));
  }
}

// Aggregated commands
const program = new Command();

program
  .name('defillama-data')
  .description('DefiLlama aggregated data queries across platforms');

program
  .command('price')
  .description('Get price data from multiple platforms')
  .requiredOption('-s, --symbols <symbols>', 'Token symbols (comma-separated)')
  .option('-p, --platforms <names>', 'Platforms to query (comma-separated: cmc,defillama)', 'cmc')
  .option('-f, --format <type>', 'Output format (json, table, csv, pretty)', 'pretty')
  .action(async (options) => {
    try {
      const symbols = options.symbols.split(',').map(s => s.trim().toUpperCase());
      const platforms = options.platforms.split(',').map(p => p.trim());

      const results = {};
      const errors = {};

      for (const symbol of symbols) {
        results[symbol] = {};

        for (const platform of platforms) {
          try {
            if (platform === 'cmc') {
              const data = await cmc.getQuotes([symbol]);
              results[symbol].cmc = data;
            } else if (platform === 'defillama') {
              const data = await defillama.getTokenPrice(symbol.toLowerCase());
              results[symbol].defillama = data;
            }
          } catch (error) {
            errors[`${symbol}-${platform}`] = error.message;
          }
        }
      }

      const response = {
        timestamp: new Date().toISOString(),
        symbols: symbols,
        platforms: platforms,
        results: results
      };

      if (Object.keys(errors).length > 0) {
        response.errors = errors;
      }

      output(response, options.format);
    } catch (error) {
      console.error(chalk.red('Error:', error.message));
      process.exit(1);
    }
  });

program
  .command('tvl')
  .description('Get TVL data from multiple platforms')
  .option('-n, --names <names>', 'Protocol names (comma-separated)')
  .option('-c, --chains <chains>', 'Chain names (comma-separated)')
  .option('-p, --platforms <names>', 'Platforms to query (comma-separated: defillama)', 'defillama')
  .option('-f, --format <type>', 'Output format (json, table, csv, pretty)', 'pretty')
  .action(async (options) => {
    try {
      const platforms = options.platforms.split(',').map(p => p.trim());
      const results = {};

      for (const platform of platforms) {
        try {
          if (platform === 'defillama') {
            if (options.names) {
              const names = options.names.split(',').map(n => n.trim());
              const protocolData = await Promise.all(
                names.map(name => defillama.getProtocolTvl(name))
              );
              results.defillama = { protocols: protocolData };
            } else if (options.chains) {
              const chains = options.chains.split(',').map(c => c.trim());
              const chainData = await Promise.all(
                chains.map(chain => defillama.getChainTvl(chain))
              );
              results.defillama = { chains: chainData };
            } else {
              results.defillama = await defillama.getTotalTvl();
            }
          }
        } catch (error) {
          console.error(chalk.red(`${platform} error:`, error.message));
        }
      }

      const response = {
        timestamp: new Date().toISOString(),
        platforms: platforms,
        results: results
      };

      output(response, options.format);
    } catch (error) {
      console.error(chalk.red('Error:', error.message));
      process.exit(1);
    }
  });

program
  .command('market')
  .description('Get market overview from multiple platforms')
  .option('-p, --platforms <names>', 'Platforms to query (comma-separated: cmc,defillama)', 'cmc,defillama')
  .option('--limit <number>', 'Limit results', 50)
  .option('-f, --format <type>', 'Output format (json, table, csv, pretty)', 'pretty')
  .action(async (options) => {
    try {
      const platforms = options.platforms.split(',').map(p => p.trim());
      const results = {};
      const errors = {};

      for (const platform of platforms) {
        try {
          if (platform === 'cmc') {
            results.cmc = await cmc.getMarketOverview(options.limit);
          } else if (platform === 'defillama') {
            const protocols = await defillama.getProtocols({});
            results.defillama = protocols.slice(0, options.limit);
          }
        } catch (error) {
          errors[platform] = error.message;
        }
      }

      const response = {
        timestamp: new Date().toISOString(),
        platforms: platforms,
        limit: options.limit,
        results: results
      };

      if (Object.keys(errors).length > 0) {
        response.errors = errors;
      }

      output(response, options.format);
    } catch (error) {
      console.error(chalk.red('Error:', error.message));
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
