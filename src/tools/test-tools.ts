import { ApifoxClient } from '../client/apifox-client.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 测试工具定义 - 由于Apifox开放API限制，功能不可用
export const testTools: ToolDefinition[] = [
  {
    name: 'apifox_test_info',
    description: '获取测试用例管理功能的限制说明',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    handler: async (args: any) => {
      return {
        success: false,
        message: '测试用例管理功能不可用',
        data: {
          reason: 'Apifox开放API不支持测试用例管理功能',
          recommendation: '请使用Apifox Web界面或桌面客户端进行测试用例管理'
        }
      };
    },
  }
];

export function createTestTools(client: ApifoxClient) {
  return testTools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  }));
}

export async function handleTestTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  const tool = testTools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Unknown test tool: ${name}`);
  }
  return await tool.handler(args);
} 