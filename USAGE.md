# Apifox MCP Pro 使用指南

## 快速开始

### 1. 获取Apifox访问令牌

1. 登录 [Apifox](https://apifox.com)
2. 进入个人设置 → API 访问
3. 生成 Personal Access Token
4. 复制生成的令牌

### 2. 配置环境变量

创建 `.env` 文件：
```bash
cp .env.example .env
```

编辑 `.env` 文件，设置你的访问令牌：
```env
APIFOX_ACCESS_TOKEN=your_actual_token_here
```

### 3. 在Claude Desktop中配置

编辑Claude Desktop配置文件，通常位于：
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

添加以下配置：
```json
{
  "mcpServers": {
    "apifox-mcp-pro": {
      "command": "node",
      "args": ["/path/to/your/apifox-mcp-pro/dist/index.js"],
      "env": {
        "APIFOX_ACCESS_TOKEN": "your_actual_token_here"
      }
    }
  }
}
```

**注意**：请将 `/path/to/your/apifox-mcp-pro` 替换为实际的项目路径。

### 4. 重启Claude Desktop

重启Claude Desktop应用程序以加载新的MCP服务器。

## 可用工具详解

### 项目管理

#### 获取项目列表
```
使用工具：apifox_list_projects
描述：获取当前用户的所有Apifox项目
参数：无
```

#### 获取项目详情
```
使用工具：apifox_get_project
描述：获取指定项目的详细信息
参数：
  - projectId (必需): 项目ID
```

#### 创建项目
```
使用工具：apifox_create_project
描述：创建新的Apifox项目
参数：
  - name (必需): 项目名称
  - description (可选): 项目描述
  - visibility (可选): 项目可见性 (private/public/team)
```

#### 更新项目
```
使用工具：apifox_update_project
描述：更新项目信息
参数：
  - projectId (必需): 项目ID
  - name (可选): 新的项目名称
  - description (可选): 新的项目描述
  - visibility (可选): 新的项目可见性
```

#### 删除项目
```
使用工具：apifox_delete_project
描述：删除指定项目
参数：
  - projectId (必需): 项目ID
```

#### 获取项目统计
```
使用工具：apifox_get_project_stats
描述：获取项目的统计信息
参数：
  - projectId (必需): 项目ID
```

### API接口管理

#### 获取API列表
```
使用工具：apifox_list_apis
描述：获取项目中的API接口列表
参数：
  - projectId (必需): 项目ID
  - folderId (可选): 文件夹ID，限制在特定文件夹内
```

#### 获取API详情
```
使用工具：apifox_get_api
描述：获取指定API接口的详细信息
参数：
  - projectId (必需): 项目ID
  - apiId (必需): API接口ID
```

#### 创建API接口
```
使用工具：apifox_create_api
描述：创建新的API接口
参数：
  - projectId (必需): 项目ID
  - name (必需): 接口名称
  - method (必需): HTTP方法 (GET/POST/PUT/DELETE/PATCH/HEAD/OPTIONS)
  - path (必需): 接口路径
  - description (可选): 接口描述
  - folderId (可选): 所属文件夹ID
  - tags (可选): 标签列表
  - status (可选): 接口状态 (designing/developing/testing/completed/deprecated)
```

#### 更新API接口
```
使用工具：apifox_update_api
描述：更新API接口信息
参数：
  - projectId (必需): 项目ID
  - apiId (必需): API接口ID
  - name (可选): 接口名称
  - method (可选): HTTP方法
  - path (可选): 接口路径
  - description (可选): 接口描述
  - folderId (可选): 所属文件夹ID
  - tags (可选): 标签列表
  - status (可选): 接口状态
```

#### 删除API接口
```
使用工具：apifox_delete_api
描述：删除指定API接口
参数：
  - projectId (必需): 项目ID
  - apiId (必需): API接口ID
```

#### 搜索API接口
```
使用工具：apifox_search_apis
描述：搜索API接口
参数：
  - keyword (可选): 搜索关键词
  - projectId (可选): 项目ID
  - folderId (可选): 文件夹ID
  - method (可选): HTTP方法筛选
  - status (可选): 状态筛选
  - tags (可选): 标签筛选
  - limit (可选): 返回结果数量限制，默认20
  - offset (可选): 偏移量，默认0
```

### 批量操作

#### 批量删除API
```
使用工具：apifox_batch_delete_apis
描述：批量删除API接口
参数：
  - projectId (必需): 项目ID
  - apiIds (必需): API接口ID列表
```

#### 批量更新API状态
```
使用工具：apifox_batch_update_api_status
描述：批量更新API接口状态
参数：
  - projectId (必需): 项目ID
  - apiIds (必需): API接口ID列表
  - status (必需): 目标状态
```

#### 批量移动API
```
使用工具：apifox_batch_move_apis
描述：批量移动API接口到指定文件夹
参数：
  - projectId (必需): 项目ID
  - apiIds (必需): API接口ID列表
  - targetFolderId (可选): 目标文件夹ID，留空表示移动到根目录
```

### 文件夹管理

#### 获取文件夹列表
```
使用工具：apifox_list_folders
描述：获取项目中的文件夹列表
参数：
  - projectId (必需): 项目ID
```

#### 创建文件夹
```
使用工具：apifox_create_folder
描述：创建新的文件夹
参数：
  - projectId (必需): 项目ID
  - name (必需): 文件夹名称
  - parentId (可选): 父文件夹ID，留空表示在根目录创建
```

#### 更新文件夹
```
使用工具：apifox_update_folder
描述：更新文件夹信息
参数：
  - projectId (必需): 项目ID
  - folderId (必需): 文件夹ID
  - name (可选): 文件夹名称
  - parentId (可选): 父文件夹ID
```

#### 删除文件夹
```
使用工具：apifox_delete_folder
描述：删除文件夹（注意：会同时删除文件夹内的所有API接口）
参数：
  - projectId (必需): 项目ID
  - folderId (必需): 文件夹ID
```

### 导入导出

#### 从URL导入
```
使用工具：apifox_import_from_url
描述：从URL导入API文档
参数：
  - projectId (必需): 项目ID
  - url (必需): 文档URL
  - folderId (可选): 目标文件夹ID
  - overwrite (可选): 是否覆盖已存在的接口，默认false
  - generateMock (可选): 是否生成Mock数据，默认true
  - generateTest (可选): 是否生成测试用例，默认false
```

#### 从数据导入
```
使用工具：apifox_import_from_data
描述：从数据导入API文档
参数：
  - projectId (必需): 项目ID
  - data (必需): API文档数据（JSON格式）
  - format (必需): 数据格式 (openapi/postman)
  - folderId (可选): 目标文件夹ID
  - overwrite (可选): 是否覆盖已存在的接口，默认false
  - generateMock (可选): 是否生成Mock数据，默认true
  - generateTest (可选): 是否生成测试用例，默认false
```

#### 导出项目
```
使用工具：apifox_export_project
描述：导出项目API文档
参数：
  - projectId (必需): 项目ID
  - format (必需): 导出格式 (openapi/postman/markdown/html)
  - includeExamples (可选): 是否包含示例，默认true
  - includeSchemas (可选): 是否包含数据模型，默认true
  - folderId (可选): 指定文件夹ID
```

#### 从URL同步
```
使用工具：apifox_sync_from_url
描述：从URL同步API文档
参数：
  - projectId (必需): 项目ID
  - url (必需): 同步URL
  - interval (可选): 同步间隔（分钟）
```

### 环境管理

#### 获取环境列表
```
使用工具：apifox_list_environments
描述：获取项目环境列表
参数：
  - projectId (必需): 项目ID
```

#### 创建环境
```
使用工具：apifox_create_environment
描述：创建新环境
参数：
  - projectId (必需): 项目ID
  - name (必需): 环境名称
  - variables (可选): 环境变量列表
  - isDefault (可选): 是否为默认环境，默认false
```

#### 更新环境
```
使用工具：apifox_update_environment
描述：更新环境信息
参数：
  - projectId (必需): 项目ID
  - envId (必需): 环境ID
  - name (可选): 环境名称
  - variables (可选): 环境变量列表
  - isDefault (可选): 是否为默认环境
```

#### 删除环境
```
使用工具：apifox_delete_environment
描述：删除环境
参数：
  - projectId (必需): 项目ID
  - envId (必需): 环境ID
```

### 数据模型管理

#### 获取数据模型列表
```
使用工具：apifox_list_schemas
描述：获取项目数据模型列表
参数：
  - projectId (必需): 项目ID
```

#### 创建数据模型
```
使用工具：apifox_create_schema
描述：创建新的数据模型
参数：
  - projectId (必需): 项目ID
  - name (必需): 模型名称
  - schema (必需): JSON Schema定义
  - type (可选): 数据类型，默认object
  - description (可选): 模型描述
```

#### 更新数据模型
```
使用工具：apifox_update_schema
描述：更新数据模型
参数：
  - projectId (必需): 项目ID
  - schemaId (必需): 模型ID
  - name (可选): 模型名称
  - type (可选): 数据类型
  - schema (可选): JSON Schema定义
  - description (可选): 模型描述
```

#### 删除数据模型
```
使用工具：apifox_delete_schema
描述：删除数据模型
参数：
  - projectId (必需): 项目ID
  - schemaId (必需): 模型ID
```

### 测试用例管理

#### 获取测试用例列表
```
使用工具：apifox_list_test_cases
描述：获取项目测试用例列表
参数：
  - projectId (必需): 项目ID
```

#### 创建测试用例
```
使用工具：apifox_create_test_case
描述：创建新的测试用例
参数：
  - projectId (必需): 项目ID
  - name (必需): 测试用例名称
  - apiId (可选): 关联的API接口ID
  - steps (可选): 测试步骤列表
  - variables (可选): 测试变量列表
```

#### 更新测试用例
```
使用工具：apifox_update_test_case
描述：更新测试用例
参数：
  - projectId (必需): 项目ID
  - testCaseId (必需): 测试用例ID
  - name (可选): 测试用例名称
  - apiId (可选): 关联的API接口ID
  - steps (可选): 测试步骤列表
  - variables (可选): 测试变量列表
```

#### 删除测试用例
```
使用工具：apifox_delete_test_case
描述：删除测试用例
参数：
  - projectId (必需): 项目ID
  - testCaseId (必需): 测试用例ID
```

#### 运行测试用例
```
使用工具：apifox_run_test_case
描述：运行测试用例
参数：
  - projectId (必需): 项目ID
  - testCaseId (必需): 测试用例ID
```

## 使用示例

### 示例1：创建项目并添加API

```
1. 创建项目：
   工具：apifox_create_project
   参数：{
     "name": "我的新项目",
     "description": "这是一个测试项目",
     "visibility": "private"
   }

2. 创建API接口：
   工具：apifox_create_api
   参数：{
     "projectId": "项目ID",
     "name": "获取用户信息",
     "method": "GET",
     "path": "/api/users/:id",
     "description": "根据用户ID获取用户详细信息"
   }
```

### 示例2：导入OpenAPI文档

```
工具：apifox_import_from_url
参数：{
  "projectId": "项目ID",
  "url": "https://petstore.swagger.io/v2/swagger.json",
  "generateMock": true,
  "generateTest": false
}
```

### 示例3：批量更新API状态

```
工具：apifox_batch_update_api_status
参数：{
  "projectId": "项目ID",
  "apiIds": ["api1", "api2", "api3"],
  "status": "completed"
}
```

## 故障排除

### 常见问题

1. **认证失败**
   - 检查 `APIFOX_ACCESS_TOKEN` 是否正确设置
   - 确认令牌是否已过期
   - 验证令牌是否有足够的权限

2. **网络连接问题**
   - 检查网络连接
   - 确认防火墙设置
   - 验证代理配置

3. **工具调用失败**
   - 检查参数是否正确
   - 确认项目ID和其他ID是否存在
   - 查看错误消息获取详细信息

### 调试模式

设置环境变量启用调试模式：
```bash
DEBUG=true
```

这将输出详细的调试信息，帮助诊断问题。

## 限制和注意事项

1. **API限制**：Apifox API可能有频率限制，请合理使用
2. **数据安全**：请妥善保管访问令牌，不要在代码中硬编码
3. **版本兼容性**：本工具基于Apifox当前API版本开发，API变更可能影响功能
4. **批量操作**：大批量操作请分批进行，避免超时

## 支持

如有问题或建议，请：
1. 查看项目README和文档
2. 检查GitHub Issues
3. 提交新的Issue描述问题 