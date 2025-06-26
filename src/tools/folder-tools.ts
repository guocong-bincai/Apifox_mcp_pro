import { ApifoxClient } from '../client/apifox-client.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 文件夹工具定义 - 由于Apifox开放API限制，功能不可用
export const folderTools: ToolDefinition[] = [
  {
    name: 'apifox_folder_info',
    description: '获取文件夹管理功能的限制说明',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    handler: async (args: any) => {
      return {
        success: false,
        message: '文件夹管理功能不可用',
        data: {
          reason: 'Apifox开放API不支持文件夹管理功能',
          recommendation: '请使用Apifox Web界面或桌面客户端进行文件夹管理'
        }
      };
    },
  }
];

export function createFolderTools(client: ApifoxClient) {
  return folderTools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  }));
}

export async function handleFolderTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  const tool = folderTools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Unknown folder tool: ${name}`);
  }
  return await tool.handler(args);
} 