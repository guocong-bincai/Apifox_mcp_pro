# Apifox MCP Pro

[English](#english) | [中文](#中文)

---

## English

Enhanced Apifox MCP Service with comprehensive API management capabilities for Claude Desktop and Cursor.

### 🆚 Comparison with Official MCP

| Feature | Official MCP | Apifox MCP Pro |
|---------|--------------|----------------|
| Tool Count | 3 tools | **33+ tools** |
| Project Management | ❌ | ✅ Full support |
| API CRUD | ❌ | ✅ Full support |
| Batch Operations | ❌ | ✅ Supported |
| Cursor Support | ❌ | ✅ Native support |
| NPM Installation | ❌ | ✅ One-click install |
| CLI Tools | ❌ | ✅ Complete CLI |

### Features

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

### Quick Start

#### Option 1: NPM Installation (Recommended)

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

#### Option 2: Local Development

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

### Configuration

#### Environment Variables

Create a `.env` file or set environment variables:

```bash
# Required
APIFOX_ACCESS_TOKEN=your_apifox_access_token_here

# Optional
APIFOX_BASE_URL=https://api.apifox.com  # Default API base URL
LOG_LEVEL=info                          # Log level: debug, info, warn, error
```

#### Cursor Configuration

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

#### Claude Desktop Configuration

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

### Available Tools

#### Project Management (6 tools)
- `apifox_list_projects` - List all projects
- `apifox_get_project` - Get project details
- `apifox_create_project` - Create new project
- `apifox_update_project` - Update project information
- `apifox_delete_project` - Delete project
- `apifox_get_project_stats` - Get project statistics

#### API Management (9 tools)
- `apifox_list_apis` - List APIs in project
- `apifox_get_api` - Get API details
- `apifox_create_api` - Create new API
- `apifox_update_api` - Update API information
- `apifox_delete_api` - Delete API
- `apifox_search_apis` - Search APIs
- `apifox_batch_delete_apis` - Batch delete APIs
- `apifox_batch_update_api_status` - Batch update API status
- `apifox_batch_move_apis` - Batch move APIs to folder

#### Folder Management (4 tools)
- `apifox_list_folders` - List folders in project
- `apifox_create_folder` - Create new folder
- `apifox_update_folder` - Update folder information
- `apifox_delete_folder` - Delete folder

#### Import/Export (4 tools)
- `apifox_import_from_url` - Import from URL
- `apifox_import_from_data` - Import from data
- `apifox_export_project` - Export project data
- `apifox_sync_from_url` - Sync from URL

#### Environment Management (4 tools)
- `apifox_list_environments` - List environments
- `apifox_create_environment` - Create new environment
- `apifox_update_environment` - Update environment
- `apifox_delete_environment` - Delete environment

#### Data Models (4 tools)
- `apifox_list_schemas` - List data models
- `apifox_create_schema` - Create new data model
- `apifox_update_schema` - Update data model
- `apifox_delete_schema` - Delete data model

#### Test Cases (5 tools)
- `apifox_list_test_cases` - List test cases
- `apifox_create_test_case` - Create new test case
- `apifox_update_test_case` - Update test case
- `apifox_delete_test_case` - Delete test case
- `apifox_run_test_case` - Run test case

### Usage Examples

#### Creating a New Project

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

#### Managing APIs

```typescript
// List all APIs in a project
"Show me all APIs in project 12345"

// Create a new API
"Create a GET API at /users/{id} for getting user details in project 12345"

// Search APIs
"Find all POST APIs in project 12345"
```

#### Batch Operations

```typescript
// Batch update API status
"Mark APIs with IDs [1, 2, 3] as 'released'"

// Batch move APIs
"Move APIs [4, 5, 6] to folder 'v2-apis'"
```

### CLI Commands

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

### Development

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

### Configuration Files

The setup command generates several configuration files:

- `cursor-mcp-config.json` - Cursor MCP configuration
- `claude-desktop-config.json` - Claude Desktop configuration  
- `local-config-example.json` - Local development configuration

### Troubleshooting

#### Common Issues

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

#### Getting Help

- Check the [USAGE.md](./USAGE.md) for detailed usage instructions
- Review the generated configuration files
- Check your Apifox access token permissions
- Verify your IDE MCP configuration

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### License

MIT License - see [LICENSE](LICENSE) file for details.

### Changelog

#### v1.0.0
- Initial release with 33 MCP tools
- NPM package support
- Cursor and Claude Desktop integration
- Comprehensive API management features
- CLI setup tools

---

**Note**: This is an enhanced version of the official Apifox MCP service, providing significantly more functionality than the basic official implementation.

---

## 中文

为 Claude Desktop 和 Cursor 提供全面 API 管理功能的增强版 Apifox MCP 服务。

### 🆚 与官方 MCP 对比

| 功能 | 官方 MCP | Apifox MCP Pro |
|------|----------|----------------|
| 工具数量 | 3个 | **33+个** |
| 项目管理 | ❌ | ✅ 完整支持 |
| API CRUD | ❌ | ✅ 完整支持 |
| 批量操作 | ❌ | ✅ 支持 |
| Cursor 支持 | ❌ | ✅ 原生支持 |
| NPM 安装 | ❌ | ✅ 一键安装 |
| CLI 工具 | ❌ | ✅ 完整 CLI |

### 功能特性

- 🚀 **33+ MCP 工具** - 全面的 API 管理功能
- 📋 **项目管理** - 创建、查询、更新、删除项目
- 🔧 **API 接口管理** - 完整的 API CRUD 操作
- 📁 **文件夹组织** - 使用文件夹组织 API
- 🔄 **导入导出** - 支持多种格式（OpenAPI、Postman 等）
- 🌍 **环境管理** - 管理不同环境
- 📊 **数据模型** - JSON Schema 支持
- 🧪 **测试用例** - 创建和运行测试用例
- 🎯 **批量操作** - 高效的批量操作
- 💻 **跨平台** - 支持 Claude Desktop 和 Cursor
- 📦 **NPM 包** - 通过 npm 轻松安装

### 快速开始

#### 方式一：NPM 安装（推荐）

```bash
# 全局安装
npm install -g apifox-mcp-pro

# 设置 Apifox 访问令牌
export APIFOX_ACCESS_TOKEN="your_access_token_here"

# 配置 Cursor
apifox-mcp-pro setup --cursor

# 配置 Claude Desktop
apifox-mcp-pro setup --claude

# 同时配置两者
apifox-mcp-pro setup --both
```

#### 方式二：本地开发

```bash
# 克隆仓库
git clone https://github.com/guocong-bincai/Apifox_mcp_pro.git
cd Apifox_mcp_pro

# 安装依赖
npm install

# 构建项目
npm run build

# 设置环境变量
cp .env.example .env
# 编辑 .env 文件并添加你的 APIFOX_ACCESS_TOKEN

# 设置本地配置
npm run dev setup --both --local
```

### 配置

#### 环境变量

创建 `.env` 文件或设置环境变量：

```bash
# 必需
APIFOX_ACCESS_TOKEN=your_apifox_access_token_here

# 可选
APIFOX_BASE_URL=https://api.apifox.com  # 默认 API 基础 URL
LOG_LEVEL=info                          # 日志级别：debug, info, warn, error
```

#### Cursor 配置

运行 `apifox-mcp-pro setup --cursor` 后，MCP 服务器将自动配置。您也可以手动添加到 Cursor 设置中：

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

#### Claude Desktop 配置

对于 Claude Desktop，添加到您的 `claude_desktop_config.json`：

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

### 可用工具

#### 项目管理（6个工具）
- `apifox_list_projects` - 列出所有项目
- `apifox_get_project` - 获取项目详情
- `apifox_create_project` - 创建新项目
- `apifox_update_project` - 更新项目信息
- `apifox_delete_project` - 删除项目
- `apifox_get_project_stats` - 获取项目统计

#### API 管理（9个工具）
- `apifox_list_apis` - 列出项目中的 API
- `apifox_get_api` - 获取 API 详情
- `apifox_create_api` - 创建新 API
- `apifox_update_api` - 更新 API 信息
- `apifox_delete_api` - 删除 API
- `apifox_search_apis` - 搜索 API
- `apifox_batch_delete_apis` - 批量删除 API
- `apifox_batch_update_api_status` - 批量更新 API 状态
- `apifox_batch_move_apis` - 批量移动 API 到文件夹

#### 文件夹管理（4个工具）
- `apifox_list_folders` - 列出项目中的文件夹
- `apifox_create_folder` - 创建新文件夹
- `apifox_update_folder` - 更新文件夹信息
- `apifox_delete_folder` - 删除文件夹

#### 导入导出（4个工具）
- `apifox_import_from_url` - 从 URL 导入
- `apifox_import_from_data` - 从数据导入
- `apifox_export_project` - 导出项目数据
- `apifox_sync_from_url` - 从 URL 同步

#### 环境管理（4个工具）
- `apifox_list_environments` - 列出环境
- `apifox_create_environment` - 创建新环境
- `apifox_update_environment` - 更新环境
- `apifox_delete_environment` - 删除环境

#### 数据模型（4个工具）
- `apifox_list_schemas` - 列出数据模型
- `apifox_create_schema` - 创建新数据模型
- `apifox_update_schema` - 更新数据模型
- `apifox_delete_schema` - 删除数据模型

#### 测试用例（5个工具）
- `apifox_list_test_cases` - 列出测试用例
- `apifox_create_test_case` - 创建新测试用例
- `apifox_update_test_case` - 更新测试用例
- `apifox_delete_test_case` - 删除测试用例
- `apifox_run_test_case` - 运行测试用例

### 使用示例

#### 创建新项目

```typescript
// 在 Claude 或 Cursor 中，您可以询问：
"创建一个名为 'My API Project' 的新 Apifox 项目，描述为 'A sample API project'"

// 这将调用：
apifox_create_project({
  name: "My API Project",
  description: "A sample API project",
  visibility: "private"
})
```

#### 管理 API

```typescript
// 列出项目中的所有 API
"显示项目 12345 中的所有 API"

// 创建新 API
"在项目 12345 中创建一个 GET API，路径为 /users/{id}，用于获取用户详情"

// 搜索 API
"在项目 12345 中查找所有 POST API"
```

#### 批量操作

```typescript
// 批量更新 API 状态
"将 ID 为 [1, 2, 3] 的 API 标记为 'released'"

// 批量移动 API
"将 API [4, 5, 6] 移动到文件夹 'v2-apis'"
```

### CLI 命令

```bash
# 启动 MCP 服务器（默认）
apifox-mcp-pro

# 设置配置
apifox-mcp-pro setup --cursor          # 设置 Cursor
apifox-mcp-pro setup --claude          # 设置 Claude Desktop
apifox-mcp-pro setup --both            # 设置两者
apifox-mcp-pro setup --local           # 使用本地 node 而不是 npx
apifox-mcp-pro setup --examples        # 仅生成配置示例

# 显示版本
apifox-mcp-pro --version

# 显示帮助
apifox-mcp-pro --help
```

### 开发

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 开发模式运行
npm run dev

# 运行测试
npm test

# 代码检查
npm run lint

# 格式化代码
npm run format
```

### 配置文件

setup 命令会生成几个配置文件：

- `cursor-mcp-config.json` - Cursor MCP 配置
- `claude-desktop-config.json` - Claude Desktop 配置
- `local-config-example.json` - 本地开发配置

### 故障排除

#### 常见问题

1. **访问令牌问题**
   ```bash
   # 确保您的令牌设置正确
   echo $APIFOX_ACCESS_TOKEN
   
   # 或检查您的 IDE 配置
   ```

2. **安装问题**
   ```bash
   # 清除 npm 缓存并重新安装
   npm cache clean --force
   npm install -g apifox-mcp-pro
   ```

3. **配置问题**
   ```bash
   # 重新生成配置文件
   apifox-mcp-pro setup --both --examples
   ```

#### 获取帮助

- 查看 [USAGE.md](./USAGE.md) 了解详细使用说明
- 查看生成的配置文件
- 检查您的 Apifox 访问令牌权限
- 验证您的 IDE MCP 配置

### 贡献

1. Fork 仓库
2. 创建功能分支
3. 进行更改
4. 如适用，添加测试
5. 提交 Pull Request

### 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

### 更新日志

#### v1.0.0
- 首次发布，包含 33 个 MCP 工具
- NPM 包支持
- Cursor 和 Claude Desktop 集成
- 全面的 API 管理功能
- CLI 设置工具

---

**注意**：这是官方 Apifox MCP 服务的增强版本，提供比基础官方实现更多的功能。 