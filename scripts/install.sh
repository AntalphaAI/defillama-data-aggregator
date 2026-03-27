#!/bin/bash

# Crypto Data Aggregator Installation Script

set -e

echo "🚀 Installing Crypto Data Aggregator..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 16.0.0"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version must be >= 16.0.0. Current version: $(node -v)"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo ""

# Navigate to skill directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --silent
echo "✓ Dependencies installed"
echo ""

# Create config file if it doesn't exist
if [ ! -f "config/keys.js" ]; then
    echo "🔑 Creating config file..."
    cp config/keys.example.js config/keys.js
    echo "✓ Config file created: config/keys.js"
    echo ""
    echo "⚠️  Please edit config/keys.js to add your API keys."
    echo ""
else
    echo "✓ Config file already exists: config/keys.js"
    echo ""
fi

# Link CLI command
echo "🔗 Linking CLI command..."
npm link
echo "✓ CLI command linked: crypto-data"
echo ""

# Test installation
echo "🧪 Testing installation..."
if command -v crypto-data &> /dev/null; then
    echo "✓ Installation successful!"
    echo ""
    echo "📝 Usage:"
    echo "  crypto-data --help"
    echo "  crypto-data cmc price --symbols BTC,ETH"
    echo "  crypto-data defillama tvl"
    echo "  crypto-data coinglass funding --symbol BTCUSDT"
    echo ""
else
    echo "❌ Installation failed. CLI command not available."
    exit 1
fi
