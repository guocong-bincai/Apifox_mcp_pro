import { ApifoxClient } from '../client/apifox-client.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 导入导出工具定义 - 官方仅提供有限支持
export const importExportTools: ToolDefinition[] = [
  {
    name: 'apifox_import_export_info',
    description: '获取导入导出功能的说明信息',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    handler: async (args: any) => {
      return {
        success: true,
        message: '导入导出功能说明',
        data: {
          status: '部分支持',
          available_apis: [
            '从URL导入API文档（官方提供）',
            '从数据导入API（官方提供）',
            '导出项目数据（官方提供）'
          ],
          note: 'Apifox官方仅提供3个基础的导入导出API接口',
          official_endpoints: [
            'POST /api/v1/import/url',
            'POST /api/v1/import/data', 
            'GET /api/v1/export'
          ],
          recommendation: '对于复杂的导入导出需求，建议使用Apifox Web界面或桌面客户端'
        }
      };
    },
  }
];

export function createImportExportTools(client: ApifoxClient) {
  return importExportTools.map(tool => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  }));
}

export async function handleImportExportTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  const tool = importExportTools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Unknown import/export tool: ${name}`);
  }
  return await tool.handler(args);
} 