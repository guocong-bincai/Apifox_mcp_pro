# 使用官方Node.js运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY dist/ ./dist/
COPY scripts/ ./scripts/
COPY *.json ./
COPY *.md ./
COPY .env.example ./

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp -u 1001

# 更改文件所有权
RUN chown -R mcp:nodejs /app
USER mcp

# 暴露端口（如果需要）
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 启动命令
CMD ["node", "dist/index.js"] 