import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApifoxClient } from '../client/apifox-client.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 测试工具定义
export const testTools: ToolDefinition[] = [
  {
    name: 'apifox_list_test_cases',
    description: '获取项目测试用例列表',
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
      return { message: '测试用例列表功能待实现', projectId: args.projectId };
    },
  },
  {
    name: 'apifox_create_test_case',
    description: '创建新测试用例',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        name: {
          type: 'string',
          description: '测试用例名称',
        },
      },
      required: ['projectId', 'name'],
    },
    handler: async (args: any) => {
      return { message: '创建测试用例功能待实现', name: args.name };
    },
  },
  {
    name: 'apifox_update_test_case',
    description: '更新测试用例',
    inputSchema: {
      type: 'object',
      properties: {
        testCaseId: {
          type: 'string',
          description: '测试用例ID',
        },
        name: {
          type: 'string',
          description: '测试用例名称',
        },
      },
      required: ['testCaseId'],
    },
    handler: async (args: any) => {
      return { message: '更新测试用例功能待实现', testCaseId: args.testCaseId };
    },
  },
  {
    name: 'apifox_delete_test_case',
    description: '删除测试用例',
    inputSchema: {
      type: 'object',
      properties: {
        testCaseId: {
          type: 'string',
          description: '测试用例ID',
        },
      },
      required: ['testCaseId'],
    },
    handler: async (args: any) => {
      return { message: '删除测试用例功能待实现', testCaseId: args.testCaseId };
    },
  },
  {
    name: 'apifox_run_test_case',
    description: '运行测试用例',
    inputSchema: {
      type: 'object',
      properties: {
        testCaseId: {
          type: 'string',
          description: '测试用例ID',
        },
      },
      required: ['testCaseId'],
    },
    handler: async (args: any) => {
      return { message: '运行测试用例功能待实现', testCaseId: args.testCaseId };
    },
  },
];

export function createTestTools(client: ApifoxClient): Tool[] {
  return [
    {
      name: 'apifox_list_test_cases',
      description: '获取项目测试用例列表',
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
      name: 'apifox_create_test_case',
      description: '创建新的测试用例',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          name: {
            type: 'string',
            description: '测试用例名称',
          },
          apiId: {
            type: 'string',
            description: '关联的API接口ID，可选',
          },
          steps: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                type: { type: 'string', enum: ['api', 'delay', 'script'] },
                config: { type: 'object' },
              },
              required: ['name', 'type', 'config'],
            },
            description: '测试步骤列表',
          },
          variables: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                value: { type: 'string' },
                type: { type: 'string', enum: ['string', 'number', 'boolean'] },
              },
              required: ['name', 'value', 'type'],
            },
            description: '测试变量列表',
          },
        },
        required: ['projectId', 'name'],
      },
    },
    {
      name: 'apifox_update_test_case',
      description: '更新测试用例',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          testCaseId: {
            type: 'string',
            description: '测试用例ID',
          },
          name: {
            type: 'string',
            description: '测试用例名称',
          },
          apiId: {
            type: 'string',
            description: '关联的API接口ID',
          },
          steps: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                type: { type: 'string', enum: ['api', 'delay', 'script'] },
                config: { type: 'object' },
              },
              required: ['name', 'type', 'config'],
            },
            description: '测试步骤列表',
          },
          variables: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                value: { type: 'string' },
                type: { type: 'string', enum: ['string', 'number', 'boolean'] },
              },
              required: ['name', 'value', 'type'],
            },
            description: '测试变量列表',
          },
        },
        required: ['projectId', 'testCaseId'],
      },
    },
    {
      name: 'apifox_delete_test_case',
      description: '删除测试用例',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          testCaseId: {
            type: 'string',
            description: '测试用例ID',
          },
        },
        required: ['projectId', 'testCaseId'],
      },
    },
    {
      name: 'apifox_run_test_case',
      description: '运行测试用例',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          testCaseId: {
            type: 'string',
            description: '测试用例ID',
          },
        },
        required: ['projectId', 'testCaseId'],
      },
    },
  ];
}

export async function handleTestTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  switch (name) {
    case 'apifox_list_test_cases':
      return await client.getTestCases(args.projectId);

    case 'apifox_create_test_case':
      return await client.createTestCase(args.projectId, {
        name: args.name,
        projectId: args.projectId,
        apiId: args.apiId,
        steps: args.steps || [],
        variables: args.variables || [],
      });

    case 'apifox_update_test_case':
      const updates: any = {};
      if (args.name) updates.name = args.name;
      if (args.apiId !== undefined) updates.apiId = args.apiId;
      if (args.steps) updates.steps = args.steps;
      if (args.variables) updates.variables = args.variables;
      return await client.updateTestCase(args.projectId, args.testCaseId, updates);

    case 'apifox_delete_test_case':
      await client.deleteTestCase(args.projectId, args.testCaseId);
      return { success: true, message: '测试用例删除成功' };

    case 'apifox_run_test_case':
      const result = await client.runTestCase(args.projectId, args.testCaseId);
      return { success: true, message: '测试用例执行完成', result };

    default:
      throw new Error(`Unknown test tool: ${name}`);
  }
} 