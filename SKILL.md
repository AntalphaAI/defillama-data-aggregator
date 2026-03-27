---
name: defillama-data-aggregator
description: Professional DefiLlama data aggregator that provides unified access to DeFi TVL, protocols, chains, and yields data. Includes automatic health checking, security validation, and bug fixes (v1.0.3).
allowed-tools: Bash(npx defillama-data:*), Bash(defillama-data:*)
---

# DefiLlama Data Aggregator

A professional-grade DefiLlama data aggregation skill that provides unified access to DefiLlama's comprehensive DeFi data including TVL, protocols, chains, and yields with built-in security validation and error handling.

## Current Status

### Available Platforms (1/1)
| Platform | Status | Features |
|----------|--------|----------|
| **DefiLlama** | ✅ Available | DeFi TVL, protocol data, chain statistics, yields |

### Security Features
- ✅ **Input Sanitization** - All user inputs are validated and sanitized to prevent injection attacks
- ✅ **Error Sanitization** - API errors are filtered to prevent information leakage
- ✅ **Range Validation** - Numeric inputs are validated against allowed ranges
- ✅ **Input Length Limits** - String inputs are limited to prevent abuse
- ✅ **Pattern Validation** - Protocol and chain names follow strict naming rules

## Quick Start

### Check System Status
```bash
# View health check results
defillama-data health

# Quick health summary
defillama-data health --quiet

# Full system status
defillama-data status
```

### Use Available Features

#### 1. Get Total DeFi TVL
```bash
defillama-data defillama tvl
```

#### 2. Get Protocol TVL
```bash
# Get specific protocol TVL
defillama-data defillama protocol -n aave
defillama-data defillama protocol -n uniswap
defillama-data defillama protocol -n compound
```

#### 3. Get All Protocols
```bash
# Get all protocols
defillama-data defillama protocols

# Filter by category
defillama-data defillama protocols -c lending

# Filter by minimum TVL
defillama-data defillama protocols --min-tvl 100000000

# Limit results and sort
defillama-data defillama protocols --limit 20 --sort tvl

# Combined filters
defillama-data defillama protocols -c lending --min-tvl 100000000 --limit 50 --sort tvl
```

#### 4. Get Chain TVL
```bash
# Get specific chain TVL
defillama-data defillama chain -n ethereum
defillama-data defillama chain -n solana
defillama-data defillama chain -n polygon
```

#### 5. Get Yield Pools
```bash
# Get all yield pools
defillama-data defillama yields

# Filter by minimum APY
defillama-data defillama yields --min-apy 5

# Filter by chain
defillama-data defillama yields --chain ethereum

# Filter by minimum TVL
defillama-data defillama yields --min-tvl 1000000

# Filter by stablecoin only
defillama-data defillama yields --stablecoin

# Combined filters
defillama-data defillama yields --min-apy 10 --chain ethereum --min-tvl 1000000 --limit 20
```

## Output Formats

All commands support multiple output formats:

```bash
# Pretty print (default, human-readable)
defillama-data defillama tvl -f pretty

# JSON format (for scripts)
defillama-data defillama tvl -f json

# Table format
defillama-data defillama protocols --limit 10 -f table

# CSV format (for spreadsheets)
defillama-data defillama protocols --limit 50 -f csv
```

## Health Monitoring

### Check Platform Health
```bash
# Full health check
defillama-data health

# Quiet mode (summary only)
defillama-data health --quiet

# JSON output
defillama-data health 2>/dev/null | jq
```

### Health Check Output Example
```
{
  "DefiLlama": {
    "healthy": true
  }
}
```

### System Status
```bash
defillama-data status
```

Output:
```
📊 System Status

✓ Available Platforms:
  - DefiLlama (DeFi data aggregator)

Recommendations:
  All platforms are configured and ready to use!
  Run `defillama-data health` to check real-time status
```

## Security & Validation

### Input Validation Rules

#### Protocol Names
- **Allowed characters**: Alphanumeric (a-z, A-Z, 0-9) and hyphens (-)
- **Length**: 1-50 characters
- **Example**: `aave`, `uniswap-v3`, `compound-protocol`
- **Invalid**: `aave<script>`, `uni/swap`, `aave&x`

#### Chain Names
- **Allowed characters**: Alphanumeric, spaces, and hyphens
- **Length**: 1-50 characters
- **Example**: `ethereum`, `solana`, `polygon-pos`
- **Invalid**: `eth<script>`, `eth/bsc`, `chain&x`

#### Category Names
- **Allowed characters**: Alphanumeric, spaces, and hyphens
- **Length**: 1-50 characters
- **Example**: `lending`, `dex`, `derivatives`
- **Invalid**: `lending<script>`, `dex/swap`, `category&x`

#### Numeric Inputs
- **Minimum TVL**: 0 to Infinity
- **Minimum APY**: 0 to 1000%
- **Limit**: 1 to 500

### Error Handling

The skill provides enhanced error handling with:

1. **Error Categorization**
   - API errors (4xx, 5xx)
   - Network errors (timeout, connection refused)
   - Validation errors
   - Application errors

2. **User-Friendly Messages**
   - Clear error descriptions
   - Actionable suggestions
   - Contextual help

3. **Information Protection**
   - Sanitized error messages
   - Removed sensitive data (API keys, tokens)
   - Limited error detail exposure

#### Error Examples

```
❌ Error occurred at 2026-03-27T09:00:00.000Z

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Application Error:
Invalid protocol name: "aave<script>". Only alphanumeric characters and hyphens are allowed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

```
❌ Error occurred at 2026-03-27T09:00:00.000Z

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 Client Error (404):
The requested resource was not found

💡 Suggestion: The requested resource was not found. Please check the protocol or chain name.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Installation

### 1. Setup Environment Variables (Optional)
```bash
cd /workspace/projects/workspace/skills/defillama-data-aggregator

# Copy example config (optional - DefiLlama doesn't need API keys)
cp config/keys.example.js config/keys.js
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup CLI Command
```bash
# Create symlink for easy access
npm link
```

## Configuration

### API Keys (Optional for DefiLlama)
DefiLlama doesn't require an API key for basic usage. However, you can configure other settings:

```javascript
// config/keys.js
module.exports = {
  defillama: {
    baseUrl: 'https://api.llama.fi'
  },
  settings: {
    // Default cache duration in seconds
    defaultCacheDuration: 300,

    // Request timeout in milliseconds
    timeout: 30000,

    // Maximum retry attempts
    maxRetries: 3,

    // Retry delay in milliseconds
    retryDelay: 1000,

    // Enable debug logging
    debug: process.env.DEBUG === 'true'
  }
};
```

## Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `defillama tvl` | Get total DeFi TVL | `defillama-data defillama tvl` |
| `defillama protocol` | Get protocol TVL | `defillama-data defillama protocol -n aave` |
| `defillama protocols` | Get all protocols | `defillama-data defillama protocols --limit 50` |
| `defillama chain` | Get chain TVL | `defillama-data defillama chain -n ethereum` |
| `defillama yields` | Get yield pools | `defillama-data defillama yields --min-apy 5` |
| `health` | Check API health | `defillama-data health` |
| `status` | Show system status | `defillama-data status` |

## Troubleshooting

### Common Issues

#### 1. Invalid Protocol/Chain Name
**Error:** `Invalid protocol name: "...". Only alphanumeric characters and hyphens are allowed.`

**Solution:** Use only alphanumeric characters and hyphens in protocol/chain names.

#### 2. Network Timeout
**Error:** `⏱️ Request Timeout`

**Solution:** Check your internet connection and try again.

#### 3. Resource Not Found (404)
**Error:** `The requested resource was not found`

**Solution:** Verify the protocol or chain name is correct. Use lowercase letters.

#### 4. Rate Limit Exceeded (429)
**Error:** `Rate limit exceeded`

**Solution:** Wait a few seconds before making another request.

### Debug Mode
```bash
# Enable debug logging to see stack traces
DEBUG=true defillama-data defillama tvl
```

## Examples

### Example 1: Monitor TVL of Top Lending Protocols
```bash
defillama-data defillama protocols -c lending --limit 10 --sort tvl -f table
```

### Example 2: Find High-Yield Pools on Ethereum
```bash
defillama-data defillama yields --chain ethereum --min-apy 10 --min-tvl 1000000 --limit 20 -f table
```

### Example 3: Compare Chain TVLs
```bash
# Ethereum
defillama-data defillama chain -n ethereum -f json | jq '.tvl'

# Solana
defillama-data defillama chain -n solana -f json | jq '.tvl'

# Polygon
defillama-data defillama chain -n polygon -f json | jq '.tvl'
```

### Example 4: Export Protocol Data to CSV
```bash
defillama-data defillama protocols --limit 100 -f csv > protocols.csv
```

## API Documentation

For detailed API documentation:
- DefiLlama: https://docs.llama.fi/

## Best Practices

1. **Always sanitize inputs** - The skill does this automatically, but be aware of validation rules
2. **Use appropriate output formats** - Use JSON for scripts, table for human reading, CSV for data export
3. **Check health status** - Run `defillama-data health` before batch operations
4. **Respect rate limits** - Avoid making too many requests in quick succession
5. **Handle errors gracefully** - The skill provides helpful error messages and suggestions

## License

MIT License - Feel free to use and modify for your needs.

## Changelog

### v1.0.3 (2026-03-27)
- ✅ Added comprehensive input validation and sanitization
- ✅ Enhanced error handling with user-friendly messages
- ✅ Added security measures to prevent injection attacks
- ✅ Improved error sanitization to prevent information leakage
- ✅ Added numeric input range validation
- ✅ Fixed protocols sorting functionality
- ✅ Fixed health command
- ✅ Removed unused volume sort option
- ✅ Added empty array validation
- ✅ Translated all documentation to English
- ✅ Updated documentation to match current implementation

### v1.0.2 (2026-03-27)
- ✅ Added comprehensive input validation and sanitization
- ✅ Enhanced error handling with user-friendly messages
- ✅ Added security measures to prevent injection attacks
- ✅ Improved error sanitization to prevent information leakage
- ✅ Added numeric input range validation
- ✅ Fixed protocols sorting functionality
- ✅ Fixed health command
- ✅ Removed unused volume sort option
- ✅ Added empty array validation
- ✅ Updated documentation to match current implementation

### v1.0.1 (2026-03-27)
- ✅ Added comprehensive input validation and sanitization
- ✅ Enhanced error handling with user-friendly messages
- ✅ Added security measures to prevent injection attacks
- ✅ Improved error sanitization to prevent information leakage
- ✅ Added numeric input range validation
- ✅ Updated documentation to match current implementation

### v1.0.0 (2026-03-25)
- ✅ Initial release
- ✅ DefiLlama TVL, protocols, chains, and yields data
- ✅ Health checking system
- ✅ Multiple output formats (JSON, table, CSV, pretty)
- ✅ Basic caching support
