#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { loadConfig } from './utils/config.js';
import { logger } from './utils/logger.js';
import { ApifoxAPIError } from './utils/errors.js';

// 导入所有工具
import { projectTools } from './tools/project-tools.js';
import { apiTools } from './tools/api-tools.js';
import { folderTools } from './tools/folder-tools.js';
import { importExportTools } from './tools/import-export-tools.js';
import { environmentTools } from './tools/environment-tools.js';
import { schemaTools } from './tools/schema-tools.js';
import { testTools } from './tools/test-tools.js';

// 导入CLI工具
import { runSetup } from './cli/setup.js';

// 加载环境变量
dotenv.config();

// 检查是否为CLI命令
function handleCLI(): boolean {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    return false; // 没有参数，启动MCP服务器
  }

  const command = args[0];
  
  switch (command) {
    case 'setup':
      runSetup();
      return true;
    
    case '--version':
    case '-v':
      console.log('Apifox MCP Pro v1.1.2');
      return true;
    
    case '--help':
    case '-h':
      showHelp();
      return true;
    
    default:
      console.error(`Unknown command: ${command}`);
      console.log('Use --help for usage information');
      process.exit(1);
  }
}

function showHelp(): void {
  console.log(`
🚀 Apifox MCP Pro - Enhanced Apifox MCP Service

Usage:
  apifox-mcp-pro                 Start MCP server (default)
  apifox-mcp-pro setup [options] Setup configuration for IDEs
  apifox-mcp-pro --version       Show version
  apifox-mcp-pro --help          Show this help

Setup Options:
  --cursor         Setup Cursor MCP configuration
  --claude         Setup Claude Desktop MCP configuration  
  --both           Setup both Cursor and Claude Desktop
  --local          Use local node command instead of npx
  --examples       Generate configuration examples only

Examples:
  # Start MCP server
  apifox-mcp-pro
  
  # Setup for Cursor
  apifox-mcp-pro setup --cursor
  
  # Setup for both IDEs
  apifox-mcp-pro setup --both

Environment Variables:
  APIFOX_ACCESS_TOKEN    Your Apifox access token (required)
  APIFOX_BASE_URL        Apifox API base URL (optional)
  LOG_LEVEL              Log level: debug, info, warn, error (default: info)

For more information, visit: https://github.com/guocong-bincai/Apifox_mcp_pro
`);
}

// 处理CLI命令
if (handleCLI()) {
  process.exit(0);
}

// 以下是原来的MCP服务器代码
class ApifoxMCPServer {
  private server: Server;
  private config: any;

  constructor() {
    this.server = new Server(
      {
        name: 'apifox-mcp-pro',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupToolHandlers(): void {
    // 合并所有工具
    const allTools = [
      ...projectTools,
      ...apiTools,
      ...folderTools,
      ...importExportTools,
      ...environmentTools,
      ...schemaTools,
      ...testTools,
    ];

    // 注册工具列表处理器
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: allTools.map(tool => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        })),
      };
    });

    // 注册工具调用处理器
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      logger.info(`Calling tool: ${name}`, { args });

      try {
        // 查找对应的工具
        const tool = allTools.find(t => t.name === name);
        if (!tool) {
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${name}`
          );
        }

        // 调用工具处理器
        const result = await tool.handler(args);
        
        logger.info(`Tool ${name} completed successfully`);
        
        return {
          content: [
            {
              type: 'text',
              text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error: unknown) {
        logger.error(`Tool ${name} failed:`, error);
        
        if (error instanceof ApifoxAPIError) {
          throw new McpError(
            ErrorCode.InternalError,
            `Apifox API error: ${error.message}`,
            error.details
          );
        } else if (error instanceof McpError) {
          throw error;
        } else {
          throw new McpError(
            ErrorCode.InternalError,
            error instanceof Error ? error.message : 'Unknown error'
          );
        }
      }
    });
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      logger.error('Server error:', error);
    };

    process.on('SIGINT', async () => {
      logger.info('Shutting down server...');
      await this.server.close();
      process.exit(0);
    });
  }

  async run(): Promise<void> {
    try {
      // 加载配置
      this.config = await loadConfig();
      logger.info('Configuration loaded successfully');

      // 启动服务器
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      
      logger.info('Apifox MCP Pro server started successfully');
      logger.info(`Available tools: ${[
        ...projectTools,
        ...apiTools,
        ...folderTools,
        ...importExportTools,
        ...environmentTools,
        ...schemaTools,
        ...testTools,
      ].length}`);
      
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

// 启动服务器
const server = new ApifoxMCPServer();
server.run().catch((error) => {
  logger.error('Server startup failed:', error);
  process.exit(1);
}); 