# Serena MCP Server Setup

## Overview
Serena is a Model Context Protocol (MCP) server that provides advanced capabilities for AI assistants. This guide covers both uvx (quick start) and local installation methods.

## Method 1: Quick Start with uvx (Recommended)

### Prerequisites
- Install `uvx` if not already installed:
```bash
pip install uvx
```

### Installation and Startup
Run the latest version of Serena directly from the repository:

```bash
uvx --from git+https://github.com/oraios/serena serena start-mcp-server
```

## Method 2: Local Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/oraios/serena
cd serena
```

### Step 2: Install Dependencies
```bash
# Install uv if not already installed
pip install uv

# Install project dependencies
uv sync
```

### Step 3: Configuration (Optional)
Edit the configuration file in your home directory:

```bash
uv run serena config edit
```

Note: You can skip this step to use default configuration. A config file will be created automatically on first run.

### Step 4: Run the Server

From within the serena directory:
```bash
uv run serena start-mcp-server
```

From outside the serena directory:
```bash
uv run --directory /absolute/path/to/serena serena start-mcp-server
```

## Claude Desktop Configuration

Add Serena to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "serena": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/oraios/serena",
        "serena",
        "start-mcp-server"
      ]
    }
  }
}
```

For local installation, use:
```json
{
  "mcpServers": {
    "serena": {
      "command": "uv",
      "args": [
        "run",
        "--directory",
        "/absolute/path/to/serena",
        "serena",
        "start-mcp-server"
      ]
    }
  }
}
```

## Integration with Existing Scripts

### start_all_mcp.sh
Serena can be added to your MCP startup script. Since it runs as a Python package, it can be started alongside other MCP servers.

### test_mcp_servers.sh
Add testing logic to verify Serena's connection and functionality.

## CLI Options and Customization

Explore Serena's CLI options:

```bash
# Show all available commands
uv run serena --help

# Show MCP server specific options
uv run serena start-mcp-server --help
```

Common customizations may include:
- Port configuration
- Logging levels
- Custom model settings
- Tool permissions

## Troubleshooting

### Common Issues

1. **uvx command not found**
   - Install with: `pip install uvx`

2. **Permission errors**
   - Ensure proper Python environment permissions
   - Consider using a virtual environment

3. **Connection timeouts**
   - Check if the server is running on the expected port
   - Verify firewall settings

4. **Module not found errors**
   - Ensure all dependencies are installed: `uv sync`

### Verification

To verify Serena is running correctly:

1. Check Claude Desktop recognizes the server
2. Look for Serena tools in the Claude interface
3. Check server logs for any error messages

## Resources

- Official Repository: https://github.com/oraios/serena
- MCP Documentation: https://modelcontextprotocol.io/
- Claude Desktop Documentation: https://docs.anthropic.com/claude/docs/claude-desktop