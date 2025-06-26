# PulseMCP Submission Request

## Server Information

**Name**: Apifox MCP Pro  
**Provider**: Apifox MCP Pro Team  
**Classification**: Community  
**GitHub Repository**: https://github.com/guocong-bincai/Apifox_mcp_pro  
**NPM Package**: https://www.npmjs.com/package/apifox-mcp-pro  
**Version**: 1.1.7  
**License**: MIT  
**Release Date**: January 2025  

## Description

Enhanced Apifox MCP Service with diagnostic and information capabilities for Claude Desktop and Cursor.

**⚠️ Important Limitation**: Due to Apifox's extremely limited Open API (only 3 basic import/export endpoints), this project provides 9 diagnostic and information tools instead of full API management capabilities. Most API management functions require using the Apifox web interface or desktop client.

## Key Features

- 🚀 **9 MCP Tools** - Basic diagnostic and information tools
- 📋 **Project Info** - Get basic project information and access status  
- ⚠️ **Limitation Awareness** - Clear documentation of API restrictions
- 🔍 **Diagnostic Tools** - Check token validity and project access
- 💻 **Cross-Platform** - Works with Claude Desktop and Cursor
- 📦 **NPM Package** - Easy installation via npm
- 🛠️ **CLI Tools** - Setup and configuration utilities

## Categories/Tags

- **productivity** - Enhances development workflow
- **development** - Developer tools  
- **api-management** - API-related functionality (limited)
- **diagnostic** - System diagnostic tools
- **information** - Information retrieval tools
- **apifox** - Apifox platform integration
- **mcp-server** - MCP server implementation
- **claude** - Claude Desktop compatible
- **cursor** - Cursor IDE compatible

## Installation

### NPM Installation
```bash
npm install -g apifox-mcp-pro
```

### Quick Setup
```bash
# Setup for Cursor
apifox-mcp-pro setup --cursor

# Setup for Claude Desktop  
apifox-mcp-pro setup --claude
```

## Configuration Examples

### Cursor Configuration
```json
{
  "mcpServers": {
    "apifox-mcp-pro": {
      "command": "npx",
      "args": ["apifox-mcp-pro"],
      "env": {
        "APIFOX_ACCESS_TOKEN": "your_access_token_here"
      }
    }
  }
}
```

### Claude Desktop Configuration
```json
{
  "mcpServers": {
    "apifox-mcp-pro": {
      "command": "npx", 
      "args": ["apifox-mcp-pro"],
      "env": {
        "APIFOX_ACCESS_TOKEN": "your_access_token_here"
      }
    }
  }
}
```

## Available Tools (9 total)

### Project Information (2 tools)
1. **apifox_project_info** - Get MCP functionality overview and limitations
2. **apifox_check_access** - Check token validity and access permissions

### API Information (2 tools)
3. **apifox_api_info** - Get API management limitations explanation
4. **apifox_check_project_access** - Check specific project access

### Feature Limitation Info (5 tools)
5. **apifox_folder_info** - Folder management limitations
6. **apifox_environment_info** - Environment management limitations
7. **apifox_schema_info** - Data model management limitations
8. **apifox_test_info** - Test case management limitations
9. **apifox_import_export_info** - Import/export functionality info

## Requirements

- **Node.js** 16+ 
- **Apifox Access Token** (from Apifox personal settings)
- **MCP-compatible client** (Claude Desktop, Cursor, VS Code, etc.)

## Documentation

- **README**: https://github.com/guocong-bincai/Apifox_mcp_pro/blob/main/README.md
- **Usage Guide**: https://github.com/guocong-bincai/Apifox_mcp_pro/blob/main/USAGE.md
- **Setup Guide**: https://github.com/guocong-bincai/Apifox_mcp_pro/blob/main/CURSOR_SETUP.md

## Compatibility Matrix

| Client | Support | Installation |
|--------|---------|-------------|
| Claude Desktop | ✅ Full | One-click setup |
| Cursor | ✅ Native | CLI setup tool |
| VS Code | ✅ MCP compatible | Manual config |
| Other MCP Clients | ✅ Standard | Standard MCP protocol |

## Status & Metrics

- ✅ **Published on NPM**: Active and maintained
- ✅ **GitHub Repository**: Public with complete documentation
- ✅ **CLI Tools**: Available for easy setup
- ✅ **Cross-Platform**: Works on macOS, Windows, Linux
- ✅ **Open Source**: MIT License

## What Makes This Unique

Unlike other API management MCP servers, Apifox MCP Pro focuses on:

1. **Transparency** - Clear documentation of API limitations
2. **Diagnostic Focus** - Tools to understand what's possible vs. what's not
3. **User Education** - Helps users understand Apifox's API constraints
4. **Easy Setup** - CLI tools for quick configuration
5. **Honest Limitations** - Upfront about what doesn't work due to API restrictions

## Contact Information

- **GitHub Issues**: https://github.com/guocong-bincai/Apifox_mcp_pro/issues
- **NPM Package**: https://www.npmjs.com/package/apifox-mcp-pro
- **Repository**: https://github.com/guocong-bincai/Apifox_mcp_pro

---

**Submission Date**: January 2025  
**Submitted for**: PulseMCP Registry  
**Project Status**: Stable and Actively Maintained 