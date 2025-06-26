# MCP.Bar Submission Request

## Project Information

**Name**: Apifox MCP Pro  
**GitHub Repository**: https://github.com/guocong-bincai/Apifox_mcp_pro  
**NPM Package**: https://www.npmjs.com/package/apifox-mcp-pro  
**Version**: 1.1.6  
**License**: MIT  

## Description

Enhanced Apifox MCP Service with diagnostic and information capabilities for Claude Desktop and Cursor.

**⚠️ Important Note**: Due to Apifox's extremely limited Open API (only 3 basic import/export endpoints), this project provides 9 diagnostic and information tools instead of full API management capabilities. Most API management functions require using the Apifox web interface or desktop client.

## Features

- 🚀 **9 MCP Tools** - Basic diagnostic and information tools
- 📋 **Project Info** - Get basic project information and access status  
- ⚠️ **Limitation Awareness** - Clear documentation of API restrictions
- 🔍 **Diagnostic Tools** - Check token validity and project access
- 💻 **Cross-Platform** - Works with Claude Desktop and Cursor
- 📦 **NPM Package** - Easy installation via npm
- 🛠️ **CLI Tools** - Setup and configuration utilities

## Categories

- **productivity** - Enhances development workflow
- **development** - Developer tools
- **api-management** - API-related functionality (limited)
- **diagnostic** - System diagnostic tools
- **information** - Information retrieval tools

## Keywords/Tags

- apifox
- mcp
- mcp-server
- model-context-protocol
- api-management
- diagnostic
- information
- claude
- cursor
- ai-tools
- productivity
- development

## Installation

### NPM (Recommended)
```bash
npm install -g apifox-mcp-pro
```

### Configuration for Cursor
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

### Configuration for Claude Desktop
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

1. **apifox_project_info** - Get MCP functionality overview and limitations
2. **apifox_check_access** - Check token validity and access permissions
3. **apifox_api_info** - Get API management limitations explanation
4. **apifox_check_project_access** - Check specific project access
5. **apifox_folder_info** - Folder management limitations
6. **apifox_environment_info** - Environment management limitations
7. **apifox_schema_info** - Data model management limitations
8. **apifox_test_info** - Test case management limitations
9. **apifox_import_export_info** - Import/export functionality info

## Documentation

- **README**: https://github.com/guocong-bincai/Apifox_mcp_pro/blob/main/README.md
- **Usage Guide**: https://github.com/guocong-bincai/Apifox_mcp_pro/blob/main/USAGE.md
- **Setup Guide**: https://github.com/guocong-bincai/Apifox_mcp_pro/blob/main/CURSOR_SETUP.md

## Compatibility

- ✅ **Claude Desktop** - Full support
- ✅ **Cursor** - Native support with CLI setup
- ✅ **VS Code** - MCP compatible
- ✅ **Other MCP Clients** - Standard MCP protocol

## Status

- ✅ **Published on NPM**: https://www.npmjs.com/package/apifox-mcp-pro
- ✅ **Published on Smithery**: Listed and verified
- ✅ **GitHub Repository**: Public and maintained
- ✅ **Documentation**: Complete and up-to-date
- ✅ **CLI Tools**: Available for easy setup

## Contact

- **GitHub Issues**: https://github.com/guocong-bincai/Apifox_mcp_pro/issues
- **NPM Package**: https://www.npmjs.com/package/apifox-mcp-pro
- **Repository**: https://github.com/guocong-bincai/Apifox_mcp_pro

---

**Submission Date**: January 2025  
**Submitted by**: Apifox MCP Pro Team  
**Project Status**: Stable and Maintained 