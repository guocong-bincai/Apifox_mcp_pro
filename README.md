# Apifox MCP Pro

Enhanced Apifox MCP Service with comprehensive API management capabilities for Claude Desktop and Cursor.

## 🆚 与官方 MCP 对比

| 功能 | 官方 MCP | Apifox MCP Pro |
|------|----------|----------------|
| 工具数量 | 3个 | **33+个** |
| 项目管理 | ❌ | ✅ 完整支持 |
| API CRUD | ❌ | ✅ 完整支持 |
| 批量操作 | ❌ | ✅ 支持 |
| Cursor 支持 | ❌ | ✅ 原生支持 |
| NPM 安装 | ❌ | ✅ 一键安装 |
| CLI 工具 | ❌ | ✅ 完整 CLI |

## Features

- 🚀 **33+ MCP Tools** - Comprehensive API management functionality
- 📋 **Project Management** - Create, read, update, delete projects
- 🔧 **API Interface Management** - Full CRUD operations for APIs
- 📁 **Folder Organization** - Organize APIs with folders
- 🔄 **Import/Export** - Support multiple formats (OpenAPI, Postman, etc.)
- 🌍 **Environment Management** - Manage different environments
- 📊 **Data Models** - JSON Schema support
- 🧪 **Test Cases** - Create and run test cases
- 🎯 **Batch Operations** - Efficient bulk operations
- 💻 **Cross-Platform** - Works with Claude Desktop and Cursor
- 📦 **NPM Package** - Easy installation via npm

## Quick Start

### Option 1: NPM Installation (Recommended)

```bash
# Install globally
npm install -g apifox-mcp-pro

# Set your Apifox access token
export APIFOX_ACCESS_TOKEN="your_access_token_here"

# Setup for Cursor
apifox-mcp-pro setup --cursor

# Setup for Claude Desktop
apifox-mcp-pro setup --claude

# Setup for both
apifox-mcp-pro setup --both
```

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/guocong-bincai/Apifox_mcp_pro.git
cd Apifox_mcp_pro

# Install dependencies
npm install

# Build the project
npm run build

# Set environment variables
cp .env.example .env
# Edit .env and add your APIFOX_ACCESS_TOKEN

# Setup local configuration
npm run dev setup --both --local
```

## Configuration

### Environment Variables

Create a `.env` file or set environment variables:

```bash
# Required
APIFOX_ACCESS_TOKEN=your_apifox_access_token_here

# Optional
APIFOX_BASE_URL=https://api.apifox.com  # Default API base URL
LOG_LEVEL=info                          # Log level: debug, info, warn, error
```

### Cursor Configuration

After running `apifox-mcp-pro setup --cursor`, the MCP server will be automatically configured. You can also manually add it to your Cursor settings:

```json
{
  "mcpServers": {
    "apifox-mcp-pro": {
      "command": "npx",
      "args": ["apifox-mcp-pro"],
      "env": {
        "APIFOX_ACCESS_TOKEN": "your_apifox_access_token_here"
      }
    }
  }
}
```

### Claude Desktop Configuration

For Claude Desktop, add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "apifox-mcp-pro": {
      "command": "npx",
      "args": ["apifox-mcp-pro"],
      "env": {
        "APIFOX_ACCESS_TOKEN": "your_apifox_access_token_here"
      }
    }
  }
}
```

## Available Tools

### Project Management (6 tools)
- `apifox_list_projects` - List all projects
- `apifox_get_project` - Get project details
- `apifox_create_project` - Create new project
- `apifox_update_project` - Update project information
- `apifox_delete_project` - Delete project
- `apifox_get_project_stats` - Get project statistics

### API Management (9 tools)
- `apifox_list_apis` - List APIs in project
- `apifox_get_api` - Get API details
- `apifox_create_api` - Create new API
- `apifox_update_api` - Update API information
- `apifox_delete_api` - Delete API
- `apifox_search_apis` - Search APIs
- `apifox_batch_delete_apis` - Batch delete APIs
- `apifox_batch_update_api_status` - Batch update API status
- `apifox_batch_move_apis` - Batch move APIs to folder

### Folder Management (4 tools)
- `apifox_list_folders` - List folders in project
- `apifox_create_folder` - Create new folder
- `apifox_update_folder` - Update folder information
- `apifox_delete_folder` - Delete folder

### Import/Export (4 tools)
- `apifox_import_from_url` - Import from URL
- `apifox_import_from_data` - Import from data
- `apifox_export_project` - Export project data
- `apifox_sync_from_url` - Sync from URL

### Environment Management (4 tools)
- `apifox_list_environments` - List environments
- `apifox_create_environment` - Create new environment
- `apifox_update_environment` - Update environment
- `apifox_delete_environment` - Delete environment

### Data Models (4 tools)
- `apifox_list_schemas` - List data models
- `apifox_create_schema` - Create new data model
- `apifox_update_schema` - Update data model
- `apifox_delete_schema` - Delete data model

### Test Cases (5 tools)
- `apifox_list_test_cases` - List test cases
- `apifox_create_test_case` - Create new test case
- `apifox_update_test_case` - Update test case
- `apifox_delete_test_case` - Delete test case
- `apifox_run_test_case` - Run test case

## Usage Examples

### Creating a New Project

```typescript
// In Claude or Cursor, you can ask:
"Create a new Apifox project called 'My API Project' with description 'A sample API project'"

// This will call:
apifox_create_project({
  name: "My API Project",
  description: "A sample API project",
  visibility: "private"
})
```

### Managing APIs

```typescript
// List all APIs in a project
"Show me all APIs in project 12345"

// Create a new API
"Create a GET API at /users/{id} for getting user details in project 12345"

// Search APIs
"Find all POST APIs in project 12345"
```

### Batch Operations

```typescript
// Batch update API status
"Mark APIs with IDs [1, 2, 3] as 'released'"

// Batch move APIs
"Move APIs [4, 5, 6] to folder 'v2-apis'"
```

## CLI Commands

```bash
# Start MCP server (default)
apifox-mcp-pro

# Setup configuration
apifox-mcp-pro setup --cursor          # Setup for Cursor
apifox-mcp-pro setup --claude          # Setup for Claude Desktop
apifox-mcp-pro setup --both            # Setup for both
apifox-mcp-pro setup --local           # Use local node instead of npx
apifox-mcp-pro setup --examples        # Generate config examples only

# Show version
apifox-mcp-pro --version

# Show help
apifox-mcp-pro --help
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Configuration Files

The setup command generates several configuration files:

- `cursor-mcp-config.json` - Cursor MCP configuration
- `claude-desktop-config.json` - Claude Desktop configuration  
- `local-config-example.json` - Local development configuration

## Troubleshooting

### Common Issues

1. **Access Token Issues**
   ```bash
   # Make sure your token is set correctly
   echo $APIFOX_ACCESS_TOKEN
   
   # Or check in your IDE configuration
   ```

2. **Installation Issues**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   npm install -g apifox-mcp-pro
   ```

3. **Configuration Issues**
   ```bash
   # Regenerate configuration files
   apifox-mcp-pro setup --both --examples
   ```

### Getting Help

- Check the [USAGE.md](./USAGE.md) for detailed usage instructions
- Review the generated configuration files
- Check your Apifox access token permissions
- Verify your IDE MCP configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release with 33 MCP tools
- NPM package support
- Cursor and Claude Desktop integration
- Comprehensive API management features
- CLI setup tools

---

**Note**: This is an enhanced version of the official Apifox MCP service, providing significantly more functionality than the basic official implementation. 