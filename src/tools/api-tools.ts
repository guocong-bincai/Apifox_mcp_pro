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

// API工具定义 - 由于Apifox开放API限制，大部分功能不可用
export const apiTools: ToolDefinition[] = [
  {
    name: 'apifox_api_info',
    description: '获取Apifox开放API的使用说明和限制信息',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    handler: async (args: any) => {
      return {
        success: true,
        message: 'Apifox开放API使用说明',
        data: {
          status: '功能受限',
          available_apis: [
            '项目列表查询（有限支持）',
            '导入导出功能（官方仅提供3个接口）'
          ],
          unavailable_apis: [
            'API接口列表查询',
            'API接口详情获取',
            'API接口创建/更新/删除',
            '搜索功能',
            '文件夹管理',
            '环境管理',
            '数据模型管理',
            '测试用例管理'
          ],
          reason: 'Apifox官方开放API功能极其有限，目前仅提供3个基础的导入导出接口',
          recommendation: [
            '使用Apifox Web界面查看项目详情',
            '使用Apifox桌面客户端进行API管理',
            '等待官方完善开放API功能',
            '考虑使用Apifox插件开发方案'
          ],
          official_docs: 'https://www.apifox.cn/help/'
        }
      };
    },
  },
  {
    name: 'apifox_check_project_access',
    description: '检查指定项目的访问权限',
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
      try {
        const client = await getClient();
        // 尝试获取项目信息来检查访问权限
        await client.getProject(args.projectId);
        return {
          success: true,
          message: `项目 ${args.projectId} 访问权限正常`,
          data: {
            projectId: args.projectId,
            accessible: true,
            note: '但由于Apifox开放API限制，仍无法获取详细的API接口信息'
          }
        };
      } catch (error: any) {
        return {
          success: false,
          message: `项目 ${args.projectId} 访问失败: ${error.message}`,
          data: {
            projectId: args.projectId,
            accessible: false,
            error: error.message
          }
        };
      }
    },
  }
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