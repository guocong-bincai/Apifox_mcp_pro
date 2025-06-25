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

// 项目工具定义
export const projectTools: ToolDefinition[] = [
  {
    name: 'apifox_list_projects',
    description: '获取Apifox项目列表',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    handler: async (args: any) => {
      const client = await getClient();
      return await client.getProjects();
    },
  },
  {
    name: 'apifox_get_project',
    description: '获取指定项目的详细信息',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
      },
      required: ['projectId'],
    },
    handler: async (args: any) => {
      const client = await getClient();
      return await client.getProject(args.projectId);
    },
  },
  {
    name: 'apifox_create_project',
    description: '创建新的Apifox项目',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: '项目名称',
        },
        description: {
          type: 'string',
          description: '项目描述',
        },
        visibility: {
          type: 'string',
          enum: ['private', 'public', 'team'],
          description: '项目可见性',
          default: 'private',
        },
      },
      required: ['name'],
    },
    handler: async (args: any) => {
      const client = await getClient();
      return await client.createProject({
        name: args.name,
        description: args.description,
        visibility: args.visibility || 'private',
      });
    },
  },
  {
    name: 'apifox_update_project',
    description: '更新项目信息',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        name: {
          type: 'string',
          description: '项目名称',
        },
        description: {
          type: 'string',
          description: '项目描述',
        },
        visibility: {
          type: 'string',
          enum: ['private', 'public', 'team'],
          description: '项目可见性',
        },
      },
      required: ['projectId'],
    },
    handler: async (args: any) => {
      const client = await getClient();
      const updates: any = {};
      if (args.name) updates.name = args.name;
      if (args.description) updates.description = args.description;
      if (args.visibility) updates.visibility = args.visibility;
      return await client.updateProject(args.projectId, updates);
    },
  },
  {
    name: 'apifox_delete_project',
    description: '删除项目',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
      },
      required: ['projectId'],
    },
    handler: async (args: any) => {
      const client = await getClient();
      await client.deleteProject(args.projectId);
      return { success: true, message: '项目删除成功' };
    },
  },
  {
    name: 'apifox_get_project_stats',
    description: '获取项目统计信息',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
      },
      required: ['projectId'],
    },
    handler: async (args: any) => {
      const client = await getClient();
      return await client.getProjectStats(args.projectId);
    },
  },
];

// 保持向后兼容的导出
export function createProjectTools(client: ApifoxClient) {
  return projectTools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  }));
}

export async function handleProjectTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  const tool = projectTools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Unknown project tool: ${name}`);
  }
  return await tool.handler(args);
} 