# MCP.so 发布指南

本文档介绍如何将 Apifox MCP Pro 发布到 mcp.so 平台。

## 前置条件

1. 项目已在 GitHub 上托管
2. 项目已发布到 NPM
3. 拥有 mcp.so 账户

## 发布步骤

### 1. 准备配置文件

项目已包含以下配置文件：
- `mcp.json` - MCP 服务描述文件
- `.mcprc.json` - MCP 运行时配置
- `package.json` 中的 mcp 字段

### 2. 验证配置

确保所有配置文件格式正确：

```bash
# 验证 JSON 格式
cat mcp.json | jq .
cat .mcprc.json | jq .
```

### 3. 提交到版本控制

```bash
git add mcp.json .mcprc.json MCP_SO_PUBLISH.md
git commit -m "Add mcp.so configuration files"
git push origin main
```

### 4. 发布到 mcp.so

有以下几种方式发布到 mcp.so：

#### 方式一：通过 Web 界面
1. 访问 https://mcp.so
2. 登录账户
3. 点击 "Add MCP Server"
4. 填写项目信息：
   - Name: `apifox-mcp-pro`
   - GitHub URL: `https://github.com/guocong-bincai/Apifox_mcp_pro`
   - NPM Package: `apifox-mcp-pro`
   - Description: Enhanced Apifox MCP Service with diagnostic and information capabilities

#### 方式二：通过 CLI 工具（如果支持）
```bash
# 安装 mcp.so CLI（如果有）
npm install -g @mcp/cli

# 登录
mcp login

# 发布
mcp publish
```

#### 方式三：通过 GitHub Integration
1. 在 mcp.so 中连接 GitHub 账户
2. 授权访问仓库
3. 选择 `Apifox_mcp_pro` 仓库
4. 系统会自动读取 `mcp.json` 配置

### 5. 验证发布

发布成功后：
1. 在 mcp.so 上搜索 "apifox-mcp-pro"
2. 确认信息显示正确
3. 测试安装命令

## 配置说明

### mcp.json 主要字段

- `name`: MCP 服务名称
- `displayName`: 显示名称
- `description`: 简短描述
- `longDescription`: 详细描述
- `tools`: 工具列表和描述
- `server`: 服务器启动配置
- `installation`: 安装方式
- `configuration`: 配置示例

### .mcprc.json 字段

- `registry`: MCP 注册表地址
- `server`: 服务器运行配置
- `environment`: 环境变量设置

## 更新发布

当需要更新时：

1. 更新版本号：
```bash
npm version patch  # 或 minor/major
```

2. 更新配置文件中的版本号

3. 重新发布：
```bash
npm run build
npm publish
git push origin main --tags
```

4. 在 mcp.so 上触发更新（通常会自动检测）

## 注意事项

1. **版本同步**: 确保 `package.json`、`mcp.json`、`.mcprc.json` 中的版本号一致
2. **依赖检查**: 确保所有依赖都在 `package.json` 中正确声明
3. **文档更新**: 保持 README.md 和 USAGE.md 文档最新
4. **测试验证**: 发布前在本地测试 MCP 服务器功能
5. **标签管理**: 使用合适的标签和分类便于用户发现

## 故障排除

### 常见问题

1. **配置文件格式错误**
   - 使用 `jq` 验证 JSON 格式
   - 检查字段拼写和结构

2. **版本号不匹配**
   - 确保所有配置文件版本号一致
   - 使用 `npm version` 命令统一更新

3. **权限问题**
   - 确认 GitHub 仓库权限
   - 检查 NPM 包发布权限

4. **依赖缺失**
   - 运行 `npm install` 检查依赖
   - 确保 `package.json` 完整

### 联系支持

如果遇到问题：
- 查看 mcp.so 官方文档
- 在 GitHub Issues 中提问
- 联系 mcp.so 支持团队

## 相关链接

- [mcp.so 官网](https://mcp.so)
- [MCP 协议文档](https://modelcontextprotocol.io)
- [项目 GitHub](https://github.com/guocong-bincai/Apifox_mcp_pro)
- [NPM 包](https://www.npmjs.com/package/apifox-mcp-pro) 