# Cursor 设置指南

本指南将帮助您在 Cursor 中设置和使用 Apifox MCP Pro。

## 快速设置

### 1. 安装 Apifox MCP Pro

```bash
npm install -g apifox-mcp-pro
```

### 2. 获取 Apifox 访问令牌

1. 登录 [Apifox](https://www.apifox.com)
2. 进入个人设置
3. 生成 Personal Access Token
4. 复制令牌备用

### 3. 自动配置 Cursor

```bash
# 设置环境变量
export APIFOX_ACCESS_TOKEN="your_apifox_access_token_here"

# 自动配置 Cursor
apifox-mcp-pro setup --cursor
```

### 4. 重启 Cursor

重启 Cursor 以应用 MCP 配置。

## 手动配置

如果自动配置不起作用，您可以手动配置：

### 1. 打开 Cursor 设置

- 按 `Cmd+,` (macOS) 或 `Ctrl+,` (Windows/Linux)
- 搜索 "MCP" 或 "Model Context Protocol"

### 2. 添加 MCP 服务器配置

在 MCP 设置中添加以下配置：

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

### 3. 保存并重启

保存设置并重启 Cursor。

## 验证安装

### 1. 检查 MCP 状态

在 Cursor 中，您应该能看到 "apifox-mcp-pro" 服务器已连接。

### 2. 测试功能

尝试以下对话：

```
"列出我的 Apifox 项目"
```

或

```
"创建一个名为 'Test API' 的新 Apifox 项目"
```

## 使用示例

### 项目管理

```
# 列出所有项目
"显示我的所有 Apifox 项目"

# 创建新项目
"创建一个名为 'Mobile API' 的新项目，描述为 '移动应用的API接口'"

# 获取项目详情
"获取项目ID为 12345 的详细信息"

# 获取项目统计
"显示项目 12345 的统计信息"
```

### API 管理

```
# 列出项目中的API
"显示项目 12345 中的所有API"

# 创建新API
"在项目 12345 中创建一个GET接口，路径为 /users/{id}，用于获取用户详情"

# 搜索API
"在项目 12345 中搜索包含 'user' 的API"

# 批量操作
"将API ID为 [1,2,3] 的接口状态更新为 'released'"
```

### 文件夹管理

```
# 列出文件夹
"显示项目 12345 中的所有文件夹"

# 创建文件夹
"在项目 12345 中创建一个名为 'User APIs' 的文件夹"

# 移动API到文件夹
"将API [4,5,6] 移动到文件夹 'user-apis'"
```

### 导入导出

```
# 从URL导入
"从 https://example.com/api-docs 导入API到项目 12345"

# 导出项目
"将项目 12345 导出为JSON格式"
```

## 故障排除

### 常见问题

1. **MCP 服务器未连接**
   - 检查 Apifox 访问令牌是否正确
   - 确认 apifox-mcp-pro 已全局安装
   - 重启 Cursor

2. **权限错误**
   - 验证访问令牌的权限
   - 检查 Apifox 账户状态

3. **命令不响应**
   - 检查网络连接
   - 验证 Apifox API 可访问性

### 调试步骤

1. **检查安装**
   ```bash
   apifox-mcp-pro --version
   ```

2. **测试连接**
   ```bash
   # 设置环境变量
   export APIFOX_ACCESS_TOKEN="your_token"
   
   # 测试API连接
   curl -H "Authorization: Bearer $APIFOX_ACCESS_TOKEN" https://api.apifox.com/v1/projects
   ```

3. **重新配置**
   ```bash
   apifox-mcp-pro setup --cursor --examples
   ```

## 高级配置

### 环境变量

您可以设置以下环境变量来自定义行为：

```bash
# 必需
export APIFOX_ACCESS_TOKEN="your_token_here"

# 可选
export APIFOX_BASE_URL="https://api.apifox.com"  # 自定义API基础URL
export LOG_LEVEL="info"                          # 日志级别
```

### 本地开发配置

如果您想使用本地构建版本：

```json
{
  "mcpServers": {
    "apifox-mcp-pro": {
      "command": "node",
      "args": ["/path/to/apifox-mcp-pro/dist/index.js"],
      "env": {
        "APIFOX_ACCESS_TOKEN": "your_apifox_access_token_here"
      }
    }
  }
}
```

## 功能列表

Apifox MCP Pro 提供 33+ 个工具，涵盖：

- ✅ 项目管理 (6个工具)
- ✅ API接口管理 (9个工具)
- ✅ 文件夹管理 (4个工具)
- ✅ 导入导出 (4个工具)
- ✅ 环境管理 (4个工具)
- ✅ 数据模型管理 (4个工具)
- ✅ 测试用例管理 (5个工具)

## 获取帮助

- 查看 [README.md](./README.md) 了解完整功能
- 查看 [USAGE.md](./USAGE.md) 了解详细用法
- 提交 Issue 报告问题
- 加入社区讨论

---

**提示**: 这是增强版的 Apifox MCP 服务，功能远超官方基础版本！ 