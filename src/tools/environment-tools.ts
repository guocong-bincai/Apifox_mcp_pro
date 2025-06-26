import { ApifoxClient } from '../client/apifox-client.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 环境工具定义 - 由于Apifox开放API限制，功能不可用
export const environmentTools: ToolDefinition[] = [
  {
    name: 'apifox_environment_info',
    description: '获取环境管理功能的限制说明',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    handler: async (args: any) => {
      return {
        success: false,
        message: '环境管理功能不可用',
        data: {
          reason: 'Apifox开放API不支持环境管理功能',
          recommendation: '请使用Apifox Web界面或桌面客户端进行环境管理'
        }
      };
    },
  }
];

export function createEnvironmentTools(client: ApifoxClient) {
  return environmentTools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  }));
}

export async function handleEnvironmentTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  const tool = environmentTools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Unknown environment tool: ${name}`);
  }
  return await tool.handler(args);
} 