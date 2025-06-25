import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApifoxClient } from '../client/apifox-client.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 环境工具定义
export const environmentTools: ToolDefinition[] = [
  {
    name: 'apifox_list_environments',
    description: '获取项目环境列表',
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
      return { message: '环境列表功能待实现', projectId: args.projectId };
    },
  },
  {
    name: 'apifox_create_environment',
    description: '创建新环境',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        name: {
          type: 'string',
          description: '环境名称',
        },
      },
      required: ['projectId', 'name'],
    },
    handler: async (args: any) => {
      return { message: '创建环境功能待实现', name: args.name };
    },
  },
  {
    name: 'apifox_update_environment',
    description: '更新环境信息',
    inputSchema: {
      type: 'object',
      properties: {
        environmentId: {
          type: 'string',
          description: '环境ID',
        },
        name: {
          type: 'string',
          description: '环境名称',
        },
      },
      required: ['environmentId'],
    },
    handler: async (args: any) => {
      return { message: '更新环境功能待实现', environmentId: args.environmentId };
    },
  },
  {
    name: 'apifox_delete_environment',
    description: '删除环境',
    inputSchema: {
      type: 'object',
      properties: {
        environmentId: {
          type: 'string',
          description: '环境ID',
        },
      },
      required: ['environmentId'],
    },
    handler: async (args: any) => {
      return { message: '删除环境功能待实现', environmentId: args.environmentId };
    },
  },
];

export function createEnvironmentTools(client: ApifoxClient): Tool[] {
  return [
    {
      name: 'apifox_list_environments',
      description: '获取项目环境列表',
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
    },
    {
      name: 'apifox_create_environment',
      description: '创建新环境',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          name: {
            type: 'string',
            description: '环境名称',
          },
          variables: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                value: { type: 'string' },
                description: { type: 'string' },
                enabled: { type: 'boolean', default: true },
              },
              required: ['name', 'value'],
            },
            description: '环境变量列表',
          },
          isDefault: {
            type: 'boolean',
            description: '是否为默认环境',
            default: false,
          },
        },
        required: ['projectId', 'name'],
      },
    },
    {
      name: 'apifox_update_environment',
      description: '更新环境信息',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          envId: {
            type: 'string',
            description: '环境ID',
          },
          name: {
            type: 'string',
            description: '环境名称',
          },
          variables: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                value: { type: 'string' },
                description: { type: 'string' },
                enabled: { type: 'boolean' },
              },
              required: ['name', 'value'],
            },
            description: '环境变量列表',
          },
          isDefault: {
            type: 'boolean',
            description: '是否为默认环境',
          },
        },
        required: ['projectId', 'envId'],
      },
    },
    {
      name: 'apifox_delete_environment',
      description: '删除环境',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          envId: {
            type: 'string',
            description: '环境ID',
          },
        },
        required: ['projectId', 'envId'],
      },
    },
  ];
}

export async function handleEnvironmentTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  switch (name) {
    case 'apifox_list_environments':
      return await client.getEnvironments(args.projectId);

    case 'apifox_create_environment':
      return await client.createEnvironment(args.projectId, {
        name: args.name,
        projectId: args.projectId,
        variables: args.variables || [],
        isDefault: args.isDefault || false,
      });

    case 'apifox_update_environment':
      const updates: any = {};
      if (args.name) updates.name = args.name;
      if (args.variables) updates.variables = args.variables;
      if (args.isDefault !== undefined) updates.isDefault = args.isDefault;
      return await client.updateEnvironment(args.projectId, args.envId, updates);

    case 'apifox_delete_environment':
      await client.deleteEnvironment(args.projectId, args.envId);
      return { success: true, message: '环境删除成功' };

    default:
      throw new Error(`Unknown environment tool: ${name}`);
  }
} 