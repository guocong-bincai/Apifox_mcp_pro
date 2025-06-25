# 发布指南

## 发布到NPM

### 1. 准备发布

```bash
# 确保所有更改都已提交
git add .
git commit -m "Prepare for v1.0.0 release"

# 构建项目
npm run build

# 运行测试
npm test

# 检查代码质量
npm run lint
```

### 2. 设置NPM账户

```bash
# 登录NPM (如果还没有登录)
npm login

# 检查当前用户
npm whoami
```

### 3. 发布包

```bash
# 发布到NPM
npm publish

# 或者如果是第一次发布
npm publish --access public
```

### 4. 验证发布

```bash
# 检查包是否可用
npm view apifox-mcp-pro

# 测试安装
npm install -g apifox-mcp-pro

# 测试命令
apifox-mcp-pro --version
apifox-mcp-pro --help
```

## 本地测试

### 1. 本地链接测试

```bash
# 在项目目录中创建全局链接
npm link

# 测试命令
apifox-mcp-pro --version
apifox-mcp-pro setup --examples

# 取消链接
npm unlink -g apifox-mcp-pro
```

### 2. 打包测试

```bash
# 创建tarball
npm pack

# 从tarball安装测试
npm install -g apifox-mcp-pro-1.0.0.tgz

# 测试后清理
npm uninstall -g apifox-mcp-pro
rm apifox-mcp-pro-1.0.0.tgz
```

## 发布后步骤

### 1. 创建Git标签

```bash
# 创建版本标签
git tag v1.0.0
git push origin v1.0.0
```

### 2. 更新文档

- 更新README.md中的安装说明
- 更新CHANGELOG.md
- 创建GitHub Release

### 3. 验证安装

```bash
# 在新环境中测试安装
npm install -g apifox-mcp-pro

# 运行测试脚本
node scripts/test-installation.js
```

## 用户安装指南

发布后，用户可以通过以下方式安装：

### 全局安装

```bash
npm install -g apifox-mcp-pro
```

### 快速设置

```bash
# 设置环境变量
export APIFOX_ACCESS_TOKEN="your_token_here"

# 配置Cursor
apifox-mcp-pro setup --cursor

# 配置Claude Desktop
apifox-mcp-pro setup --claude

# 配置两者
apifox-mcp-pro setup --both
```

### 验证安装

```bash
# 检查版本
apifox-mcp-pro --version

# 查看帮助
apifox-mcp-pro --help

# 生成配置示例
apifox-mcp-pro setup --examples
```

## 故障排除

### 常见问题

1. **权限问题**
   ```bash
   # 使用sudo (不推荐)
   sudo npm install -g apifox-mcp-pro
   
   # 或配置npm前缀 (推荐)
   npm config set prefix ~/.npm-global
   export PATH=~/.npm-global/bin:$PATH
   ```

2. **版本冲突**
   ```bash
   # 清理缓存
   npm cache clean --force
   
   # 重新安装
   npm uninstall -g apifox-mcp-pro
   npm install -g apifox-mcp-pro
   ```

3. **配置问题**
   ```bash
   # 重新生成配置
   apifox-mcp-pro setup --both --examples
   ```

## 开发者注意事项

- 确保`package.json`中的`files`字段包含所有必要文件
- `bin`字段正确指向编译后的入口文件
- `postinstall`脚本在用户安装时自动运行
- 所有依赖都在`dependencies`中，开发依赖在`devDependencies`中
- 使用语义化版本控制 (semver) 