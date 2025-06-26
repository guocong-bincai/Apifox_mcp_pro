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

// 项目工具定义 - 仅保留基础功能
export const projectTools: ToolDefinition[] = [
  {
    name: 'apifox_project_info',
    description: '获取Apifox MCP功能说明和限制信息',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    handler: async (args: any) => {
      return {
        success: true,
        message: 'Apifox MCP Pro 功能说明',
        data: {
                     version: '1.1.4',
          status: '功能受限版本',
          available_functions: [
            '项目基础信息查询',
            '访问权限检查',
            '功能限制说明'
          ],
          unavailable_functions: [
            'API接口管理（列表、详情、增删改）',
            '文件夹管理',
            '环境管理', 
            '数据模型管理',
            '测试用例管理',
            '搜索功能'
          ],
          reason: 'Apifox官方开放API功能极其有限，仅提供3个基础导入导出接口',
          official_api_docs: 'https://www.apifox.cn/help/',
          recommendation: [
            '使用Apifox Web界面进行完整的API管理',
            '使用Apifox桌面客户端获得最佳体验',
            '等待官方完善开放API功能'
          ]
        }
      };
    },
  },
  {
    name: 'apifox_check_access',
    description: '检查当前Token的访问权限',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    handler: async (args: any) => {
      try {
        const client = await getClient();
        // 尝试调用一个基础API来检查权限
        const projects = await client.getProjects();
        return {
          success: true,
          message: 'Token访问权限正常',
          data: {
            accessible: true,
            note: '但由于Apifox开放API限制，大部分功能仍不可用',
            available_projects: projects ? projects.length : 0
          }
        };
      } catch (error: any) {
        return {
          success: false,
          message: 'Token访问权限检查失败',
          data: {
            accessible: false,
            error: error.message,
            suggestion: '请检查APIFOX_ACCESS_TOKEN是否正确设置'
          }
        };
      }
    },
  }
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