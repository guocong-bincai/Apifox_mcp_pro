import { ApifoxClient } from '../client/apifox-client.js';
import { loadConfig } from '../utils/config.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 创建客户端实例
async function getClient(): Promise<ApifoxClient> {
  const config = await loadConfig();
  return new ApifoxClient(config);
}

// API工具定义
export const apiTools: ToolDefinition[] = [
  {
    name: 'apifox_list_apis',
    description: '获取项目中的API列表',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        folderId: {
          type: 'string',
          description: '文件夹ID（可选）',
        },
      },
      required: ['projectId'],
    },
    handler: async (args: any) => {
      return { message: 'API列表功能待实现', projectId: args.projectId };
    },
  },
  {
    name: 'apifox_get_api',
    description: '获取指定API的详细信息',
    inputSchema: {
      type: 'object',
      properties: {
        apiId: {
          type: 'string',
          description: 'API ID',
        },
      },
      required: ['apiId'],
    },
    handler: async (args: any) => {
      return { message: 'API详情功能待实现', apiId: args.apiId };
    },
  },
  {
    name: 'apifox_create_api',
    description: '创建新的API',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        name: {
          type: 'string',
          description: 'API名称',
        },
        method: {
          type: 'string',
          enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
          description: 'HTTP方法',
        },
        path: {
          type: 'string',
          description: 'API路径',
        },
        description: {
          type: 'string',
          description: 'API描述',
        },
        folderId: {
          type: 'string',
          description: '文件夹ID（可选）',
        },
      },
      required: ['projectId', 'name', 'method', 'path'],
    },
    handler: async (args: any) => {
      return { message: '创建API功能待实现', name: args.name, method: args.method };
    },
  },
  {
    name: 'apifox_update_api',
    description: '更新API信息',
    inputSchema: {
      type: 'object',
      properties: {
        apiId: {
          type: 'string',
          description: 'API ID',
        },
        name: {
          type: 'string',
          description: 'API名称',
        },
        description: {
          type: 'string',
          description: 'API描述',
        },
        method: {
          type: 'string',
          enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
          description: 'HTTP方法',
        },
        path: {
          type: 'string',
          description: 'API路径',
        },
      },
      required: ['apiId'],
    },
    handler: async (args: any) => {
      return { message: '更新API功能待实现', apiId: args.apiId };
    },
  },
  {
    name: 'apifox_delete_api',
    description: '删除API',
    inputSchema: {
      type: 'object',
      properties: {
        apiId: {
          type: 'string',
          description: 'API ID',
        },
      },
      required: ['apiId'],
    },
    handler: async (args: any) => {
      return { message: '删除API功能待实现', apiId: args.apiId };
    },
  },
  {
    name: 'apifox_search_apis',
    description: '搜索API',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        keyword: {
          type: 'string',
          description: '搜索关键词',
        },
        method: {
          type: 'string',
          description: 'HTTP方法过滤',
        },
      },
      required: ['projectId', 'keyword'],
    },
    handler: async (args: any) => {
      return { message: '搜索API功能待实现', keyword: args.keyword };
    },
  },
  {
    name: 'apifox_batch_delete_apis',
    description: '批量删除API',
    inputSchema: {
      type: 'object',
      properties: {
        apiIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'API ID列表',
        },
      },
      required: ['apiIds'],
    },
    handler: async (args: any) => {
      return { message: '批量删除API功能待实现', count: args.apiIds.length };
    },
  },
  {
    name: 'apifox_batch_update_api_status',
    description: '批量更新API状态',
    inputSchema: {
      type: 'object',
      properties: {
        apiIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'API ID列表',
        },
        status: {
          type: 'string',
          enum: ['developing', 'testing', 'released', 'deprecated'],
          description: 'API状态',
        },
      },
      required: ['apiIds', 'status'],
    },
    handler: async (args: any) => {
      return { message: '批量更新API状态功能待实现', status: args.status };
    },
  },
  {
    name: 'apifox_batch_move_apis',
    description: '批量移动API到指定文件夹',
    inputSchema: {
      type: 'object',
      properties: {
        apiIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'API ID列表',
        },
        targetFolderId: {
          type: 'string',
          description: '目标文件夹ID',
        },
      },
      required: ['apiIds', 'targetFolderId'],
    },
    handler: async (args: any) => {
      return { message: '批量移动API功能待实现', targetFolderId: args.targetFolderId };
    },
  },
];

// 保持向后兼容的导出
export function createApiTools(client: ApifoxClient) {
  return apiTools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  }));
}

export async function handleApiTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  const tool = apiTools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Unknown API tool: ${name}`);
  }
  return await tool.handler(args);
} 