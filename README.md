# Apifox MCP Pro

[![NPM Version](https://img.shields.io/npm/v/apifox-mcp-pro)](https://www.npmjs.com/package/apifox-mcp-pro)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/guocong-bincai/Apifox_mcp_pro)](https://github.com/guocong-bincai/Apifox_mcp_pro/stargazers)
[![MCP.Bar](https://img.shields.io/badge/MCP.Bar-Ready-green)](https://www.mcp.bar)
[![Smithery](https://img.shields.io/badge/Smithery-Compatible-blue)](https://smithery.ai)

[English](#english) | [中文](#中文)

---

## English

**⚠️ 项目状态说明 / Project Status**

由于Apifox官方开放API功能极其有限（仅提供3个基础导入导出接口），本项目已从最初计划的33+个工具简化为9个诊断和信息查询工具。大部分API管理功能需要使用Apifox Web界面或桌面客户端。

Due to Apifox's extremely limited Open API (only 3 basic import/export endpoints), this project has been simplified from the originally planned 33+ tools to 9 diagnostic and information tools. Most API management features require using the Apifox web interface or desktop client.

---

Enhanced Apifox MCP Service with basic diagnostic and information capabilities for Claude Desktop and Cursor.

### 🆚 Comparison with Official MCP

| Feature | Official MCP | Apifox MCP Pro |
|---------|--------------|----------------|
| Tool Count | 3 tools | **9 tools** (Limited) |
| Project Management | ❌ | ⚠️ Basic info only |
| API CRUD | ❌ | ❌ Not supported |
| Batch Operations | ❌ | ❌ Not supported |
| Cursor Support | ❌ | ✅ Native support |
| NPM Installation | ❌ | ✅ One-click install |
| CLI Tools | ❌ | ✅ Complete CLI |

### ⚠️ Important Limitations

**Due to Apifox's extremely limited Open API, most advanced features are not available:**

- ❌ **API Interface Management** - Cannot list, create, update, or delete APIs
- ❌ **Folder Management** - No folder operations supported
- ❌ **Environment Management** - Cannot manage environments
- ❌ **Data Model Management** - No schema operations
- ❌ **Test Case Management** - Cannot manage test cases
- ❌ **Search Functionality** - API search not supported
- ❌ **Batch Operations** - No bulk operations available

**What IS available:**
- ✅ **Basic Project Info** - Get project information and access checks
- ✅ **Limitation Explanations** - Clear documentation of what's not supported
- ✅ **Token Validation** - Check if your access token works
- ✅ **Diagnostic Tools** - Help understand API limitations

**Reason:** Apifox officially provides only 3 basic import/export API endpoints. Most management functions require using the Apifox web interface or desktop client.

### Features

- 🚀 **9 MCP Tools** - Basic diagnostic and information tools
- 📋 **Project Info** - Get basic project information and access status
- ⚠️ **Limitation Awareness** - Clear documentation of API restrictions
- 🔍 **Diagnostic Tools** - Check token validity and project access
- 💻 **Cross-Platform** - Works with Claude Desktop and Cursor
- 📦 **NPM Package** - Easy installation via npm
- 🛠️ **CLI Tools** - Setup and configuration utilities

**Note:** Due to Apifox's limited Open API, advanced management features are not available. This tool primarily serves as a diagnostic and information utility.

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

#### Getting Your Apifox Access Token

1. 登录 [Apifox 官网](https://www.apifox.cn/)
2. 进入个人设置 → API 访问令牌
3. 创建新的访问令牌
4. 复制生成的令牌（格式通常为 `APS-xxxxxxxxxx`）

⚠️ **安全提醒**：
- 请妥善保管您的访问令牌，不要在代码中硬编码
- 不要在公共仓库中提交包含真实令牌的配置文件
- 使用环境变量或配置文件来管理令牌

#### Environment Variables

Create a `.env` file or set environment variables:

```bash
# Required - 从Apifox个人设置中获取
APIFOX_ACCESS_TOKEN=your_apifox_access_token_here

# Optional
APIFOX_BASE_URL=https://api.apifox.com  # Default API base URL
LOG_LEVEL=info                          # Log level: debug, info, warn, error
```

**示例 .env 文件**：
```bash
# .env 文件示例（请替换为您的真实令牌）
APIFOX_ACCESS_TOKEN=APS-your-actual-token-here
LOG_LEVEL=info
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

### Available Tools (9 total)

#### Project Information (2 tools)
- `apifox_project_info` - Get MCP functionality overview and limitations
- `apifox_check_access` - Check token validity and access permissions

#### API Information (2 tools)
- `apifox_api_info` - Get API management limitations explanation
- `apifox_check_project_access` - Check specific project access

#### Feature Limitation Info (5 tools)
- `apifox_folder_info` - Folder management limitations
- `apifox_environment_info` - Environment management limitations  
- `apifox_schema_info` - Data model management limitations
- `apifox_test_info` - Test case management limitations
- `apifox_import_export_info` - Import/export functionality info

### ❌ Removed Tools (Previously Listed but Not Functional)

The following tools were removed because Apifox's Open API doesn't support them:

#### API Management (9 removed)
- ~~`apifox_list_apis`~~ - API listing not supported
- ~~`apifox_get_api`~~ - API details not accessible
- ~~`apifox_create_api`~~ - API creation not supported
- ~~`apifox_update_api`~~ - API updates not supported
- ~~`apifox_delete_api`~~ - API deletion not supported
- ~~`apifox_search_apis`~~ - Search functionality unavailable
- ~~`apifox_batch_delete_apis`~~ - Batch operations not supported
- ~~`apifox_batch_update_api_status`~~ - Status updates not supported
- ~~`apifox_batch_move_apis`~~ - Moving APIs not supported

#### Project Management (4 removed)
- ~~`apifox_list_projects`~~ - Limited API access
- ~~`apifox_create_project`~~ - Creation not supported
- ~~`apifox_update_project`~~ - Updates not supported
- ~~`apifox_delete_project`~~ - Deletion not supported

#### All Other Management Tools (14 removed)
- All folder, environment, schema, test case, and import/export management tools

**Reason for Removal:** Apifox's Open API is extremely limited and only provides 3 basic import/export endpoints. All management operations require using the Apifox web interface or desktop application.

### Usage Examples

#### Getting MCP Information

```typescript
// In Claude or Cursor, you can ask:
"What Apifox MCP Pro features are available?"

// This will call:
apifox_project_info()
```

#### Checking Access

```typescript
// Check if your token works:
"Check my Apifox access permissions"

// This will call:
apifox_check_access()
```

#### Understanding Limitations

```typescript
// Get information about API management limitations:
"Why can't I list APIs in my Apifox project?"

// This will call:
apifox_api_info()
```

#### Alternative Solutions

Since most management features are not available through the API, consider these alternatives:

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

**⚠️ 项目状态说明**

由于Apifox官方开放API功能极其有限（仅提供3个基础导入导出接口），本项目已从最初计划的33+个工具简化为9个诊断和信息查询工具。大部分API管理功能需要使用Apifox Web界面或桌面客户端。

---

为 Claude Desktop 和 Cursor 提供基础诊断和信息功能的 Apifox MCP 服务。

### 🆚 与官方 MCP 对比

| 功能 | 官方 MCP | Apifox MCP Pro |
|------|----------|----------------|
| 工具数量 | 3个 | **9个工具**（受限） |
| 项目管理 | ❌ | ⚠️ 仅基础信息 |
| API CRUD | ❌ | ❌ 不支持 |
| 批量操作 | ❌ | ❌ 不支持 |
| Cursor 支持 | ❌ | ✅ 原生支持 |
| NPM 安装 | ❌ | ✅ 一键安装 |
| CLI 工具 | ❌ | ✅ 完整 CLI |

### ⚠️ 重要限制

**由于Apifox开放API功能极其有限，大部分高级功能不可用：**

- ❌ **API接口管理** - 无法列出、创建、更新或删除API
- ❌ **文件夹管理** - 不支持文件夹操作
- ❌ **环境管理** - 无法管理环境
- ❌ **数据模型管理** - 不支持Schema操作
- ❌ **测试用例管理** - 无法管理测试用例
- ❌ **搜索功能** - 不支持API搜索
- ❌ **批量操作** - 不支持批量操作

**可用功能：**
- ✅ **基础项目信息** - 获取项目信息和访问检查
- ✅ **限制说明** - 清晰的不支持功能文档
- ✅ **令牌验证** - 检查访问令牌是否有效
- ✅ **诊断工具** - 帮助理解API限制

**原因：** Apifox官方仅提供3个基础导入导出API端点。大部分管理功能需要使用Apifox Web界面或桌面客户端。

### 功能特性

- 🚀 **9个MCP工具** - 基础诊断和信息工具
- 📋 **项目信息** - 获取基础项目信息和访问状态
- ⚠️ **限制说明** - 清晰的API限制文档
- 🔍 **诊断工具** - 检查令牌有效性和项目访问
- 💻 **跨平台** - 支持 Claude Desktop 和 Cursor
- 📦 **NPM 包** - 通过 npm 轻松安装
- 🛠️ **CLI 工具** - 设置和配置工具

**注意：** 由于Apifox开放API限制，高级管理功能不可用。此工具主要作为诊断和信息查询工具使用。

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

### 可用工具（共9个）

#### 项目信息（2个工具）
- `apifox_project_info` - 获取MCP功能概览和限制信息
- `apifox_check_access` - 检查令牌有效性和访问权限

#### API信息（2个工具）
- `apifox_api_info` - 获取API管理限制说明
- `apifox_check_project_access` - 检查特定项目访问权限

#### 功能限制信息（5个工具）
- `apifox_folder_info` - 文件夹管理限制说明
- `apifox_environment_info` - 环境管理限制说明
- `apifox_schema_info` - 数据模型管理限制说明
- `apifox_test_info` - 测试用例管理限制说明
- `apifox_import_export_info` - 导入导出功能信息

### ❌ 已删除的工具（之前列出但不可用）

由于Apifox开放API不支持，以下工具已被删除：

#### API管理（9个已删除）
- ~~`apifox_list_apis`~~ - 不支持API列表查询
- ~~`apifox_get_api`~~ - 无法访问API详情
- ~~`apifox_create_api`~~ - 不支持API创建
- ~~`apifox_update_api`~~ - 不支持API更新
- ~~`apifox_delete_api`~~ - 不支持API删除
- ~~`apifox_search_apis`~~ - 搜索功能不可用
- ~~`apifox_batch_delete_apis`~~ - 不支持批量操作
- ~~`apifox_batch_update_api_status`~~ - 不支持状态更新
- ~~`apifox_batch_move_apis`~~ - 不支持移动API

#### 项目管理（4个已删除）
- ~~`apifox_list_projects`~~ - API访问受限
- ~~`apifox_create_project`~~ - 不支持创建
- ~~`apifox_update_project`~~ - 不支持更新
- ~~`apifox_delete_project`~~ - 不支持删除

#### 其他所有管理工具（14个已删除）
- 所有文件夹、环境、数据模型、测试用例和导入导出管理工具

**删除原因：** Apifox开放API功能极其有限，仅提供3个基础导入导出端点。所有管理操作需要使用Apifox Web界面或桌面应用程序。

### 使用示例

#### 获取MCP信息

```typescript
// 在 Claude 或 Cursor 中，您可以询问：
"Apifox MCP Pro 有哪些可用功能？"

// 这将调用：
apifox_project_info()
```

#### 检查访问权限

```typescript
// 检查令牌是否有效：
"检查我的 Apifox 访问权限"

// 这将调用：
apifox_check_access()
```

#### 了解限制

```typescript
// 获取API管理限制信息：
"为什么我无法列出 Apifox 项目中的 API？"

// 这将调用：
apifox_api_info()
```

#### 替代解决方案

由于大部分管理功能通过API不可用，请考虑以下替代方案：

- 使用 [Apifox Web界面](https://www.apifox.cn/) 进行完整的API管理
- 使用 Apifox 桌面客户端获得最佳体验
- 等待官方完善开放API功能

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