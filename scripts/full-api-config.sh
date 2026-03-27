#!/bin/bash

# Comprehensive API Configuration Script
# 完整的API配置脚本

echo "🔑 Comprehensive API Configuration Guide"
echo "======================================="
echo ""
echo "This script will guide you through configuring all 4 platforms."
echo ""

cd /workspace/projects/workspace/skills/crypto-data-aggregator

# Step 1: CoinMarketCap
echo "📊 STEP 1: CoinMarketCap Configuration"
echo "-------------------------------------"
echo "1. Visit: https://pro.coinmarketcap.com/signup"
echo "2. Create a free account"
echo "3. Go to Dashboard > API Key Management"
echo "4. Generate your API key"
echo ""
echo "Your API key will look like: 'cmc_xxxxxxxxxxxxxxxxxxxx'"
echo ""
read -p "Enter your CoinMarketCap API key (or press Enter to skip): " cmc_key

if [ ! -z "$cmc_key" ]; then
    echo "CoinMarketCap API key entered: ${cmc_key:0:10}..."
else
    echo "CoinMarketCap configuration skipped"
fi
echo ""

# Step 2: Coinglass
echo "📈 STEP 2: Coinglass Configuration"
echo "-----------------------------------"
echo "1. Visit: https://coinglass.com/pricing"
echo "2. Select the free plan"
echo "3. Register your account"
echo "4. Get your API key from dashboard"
echo ""
echo "Your API key will be a long string of characters"
echo ""
read -p "Enter your Coinglass API key (or press Enter to skip): " coinglass_key

if [ ! -z "$coinglass_key" ]; then
    echo "Coinglass API key entered: ${coinglass_key:0:10}..."
else
    echo "Coinglass configuration skipped"
fi
echo ""

# Step 3: Nansen
echo "🐋 STEP 3: Nansen Configuration"
echo "--------------------------------"
echo "1. Visit: https://nansen.ai"
echo "2. Click 'Get Started'"
echo "3. Choose the free plan"
echo "4. Get your API key"
echo ""
echo "Your API key will be a long string"
echo ""
read -p "Enter your Nansen API key (or press Enter to skip): " nansen_key

if [ ! -z "$nansen_key" ]; then
    echo "Nansen API key entered: ${nansen_key:0:10}..."
else
    echo "Nansen configuration skipped"
fi
echo ""

# Step 4: Dune (optional)
echo "🔍 STEP 4: Dune Configuration (Optional)"
echo "------------------------------------------"
echo "1. Visit: https://www.dune.com/auth/login"
echo "2. Create account or login"
echo "3. Get your API key from settings"
echo ""
read -p "Enter your Dune API key (or press Enter to skip): " dune_key

if [ ! -z "$dune_key" ]; then
    echo "Dune API key entered: ${dune_key:0:10}..."
else
    echo "Dune configuration skipped"
fi
echo ""

# Step 5: Create updated config file
echo "⚙️  STEP 5: Creating Configuration File"
echo "--------------------------------------"

if [ ! -z "$cmc_key" ] || [ ! -z "$coinglass_key" ] || [ ! -z "$nansen_key" ] || [ ! -z "$dune_key" ]; then
    # Backup current config
    if [ -f "config/keys.js" ]; then
        cp config/keys.js config/keys.backup.$(date +%Y%m%d_%H%M%S).js
        echo "✓ Backed up current config"
    fi

    # Create new config file
    cat > config/keys.js << EOF
/**
 * API Keys Configuration
 * Auto-generated: $(date)
 */

module.exports = {
  // CoinMarketCap API Key
  coinmarketcap: {
    apiKey: process.env.COINMARKETCAP_API_KEY || '$cmc_key',
    baseUrl: 'https://pro-api.coinmarketcap.com/v1'
  },

  // Coinglass API Key
  coinglass: {
    apiKey: process.env.COINGLASS_API_KEY || '$coinglass_key',
    baseUrl: 'https://open-api.coinglass.com'
  },

  // Nansen API Key
  nansen: {
    apiKey: process.env.NANSEN_API_KEY || '$nansen_key',
    baseUrl: 'https://api.nansen.ai'
  },

  // Dune API Key
  dune: {
    apiKey: process.env.DUNE_API_KEY || '$dune_key',
    baseUrl: 'https://api.dune.com/api/v1'
  },

  // DefiLlama Configuration (No API key required)
  defillama: {
    baseUrl: 'https://api.llama.fi'
  },

  // Global settings
  settings: {
    defaultCacheDuration: 300,
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
    debug: process.env.DEBUG === 'true'
  }
};
EOF

    echo "✓ Configuration file created: config/keys.js"
    echo ""
else
    echo "⚠️  No API keys entered. Skipping configuration file creation."
    echo ""
    echo "You can still configure manually by editing config/keys.js"
    echo ""
fi

# Step 6: Test configuration
echo "🧪 STEP 6: Testing Configuration"
echo "----------------------------------"

if [ ! -z "$cmc_key" ] || [ ! -z "$coinglass_key" ] || [ ! -z "$nansen_key" ] || [ ! -z "$dune_key" ]; then
    echo "Testing configured platforms..."
    echo ""
    echo "You can test by running:"
    echo "  crypto-data test --all"
    echo ""
else
    echo "No keys configured. Cannot test."
    echo ""
fi

# Summary
echo "======================================"
echo "✅ Configuration Summary"
echo "======================================"
echo ""
echo "Configured Platforms:"
if [ ! -z "$cmc_key" ]; then
    echo "  ✅ CoinMarketCap"
else
    echo "  ❌ CoinMarketCap (not configured)"
fi

if [ ! -z "$coinglass_key" ]; then
    echo "  ✅ Coinglass"
else
    echo "  ❌ Coinglass (not configured)"
fi

if [ ! -z "$nansen_key" ]; then
    echo "  ✅ Nansen"
else
    echo "  ❌ Nansen (not configured)"
fi

if [ ! -z "$dune_key" ]; then
    echo "  ✅ Dune"
else
    echo "  ❌ Dune (not configured)"
fi

echo ""
echo "✅ DefiLlama (always available, no API key needed)"
echo ""

# Next steps
echo "======================================"
echo "🎯 Next Steps"
echo "======================================"
echo ""

if [ ! -z "$cmc_key" ] || [ ! -z "$coinglass_key" ] || [ ! -z "$nansen_key" ] || [ ! -z "$dune_key" ]; then
    echo "1. Test your configuration:"
    echo "   crypto-data test --all"
    echo ""
    echo "2. Try some commands:"
    echo "   crypto-data cmc price --symbols BTC,ETH"
    echo "   crypto-data coinglass funding --symbol BTCUSDT"
    echo "   crypto-data nansen whale --min-value 1000000"
    echo ""
else
    echo "1. Get your free API keys from:"
    echo "   - CoinMarketCap: https://pro.coinmarketcap.com/signup"
    echo "   - Coinglass: https://coinglass.com/pricing"
    echo "   - Nansen: https://nansen.ai/pricing"
    echo ""
    echo "2. Run this script again:"
    echo "   bash scripts/full-api-config.sh"
    echo ""
fi

echo "3. Or configure manually:"
echo "   nano config/keys.js"
echo ""

echo "======================================"
echo "✅ Setup Complete!"
echo ""
