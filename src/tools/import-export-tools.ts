import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApifoxClient } from '../client/apifox-client.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 导入导出工具定义
export const importExportTools: ToolDefinition[] = [
  {
    name: 'apifox_import_from_url',
    description: '从URL导入API数据',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        url: {
          type: 'string',
          description: 'API文档URL',
        },
      },
      required: ['projectId', 'url'],
    },
    handler: async (args: any) => {
      return { message: '从URL导入功能待实现', url: args.url };
    },
  },
  {
    name: 'apifox_import_from_data',
    description: '从数据导入API',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        data: {
          type: 'string',
          description: 'API数据（JSON格式）',
        },
      },
      required: ['projectId', 'data'],
    },
    handler: async (args: any) => {
      return { message: '从数据导入功能待实现', dataLength: args.data.length };
    },
  },
  {
    name: 'apifox_export_project',
    description: '导出项目数据',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        format: {
          type: 'string',
          enum: ['json', 'yaml', 'openapi'],
          description: '导出格式',
        },
      },
      required: ['projectId'],
    },
    handler: async (args: any) => {
      return { message: '导出项目功能待实现', format: args.format || 'json' };
    },
  },
  {
    name: 'apifox_sync_from_url',
    description: '从URL同步API数据',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        url: {
          type: 'string',
          description: 'API文档URL',
        },
      },
      required: ['projectId', 'url'],
    },
    handler: async (args: any) => {
      return { message: '从URL同步功能待实现', url: args.url };
    },
  },
];

export function createImportExportTools(client: ApifoxClient): Tool[] {
  return [
    {
      name: 'apifox_import_from_url',
      description: '从URL导入API文档',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          url: {
            type: 'string',
            description: '文档URL',
          },
          folderId: {
            type: 'string',
            description: '目标文件夹ID，可选',
          },
          overwrite: {
            type: 'boolean',
            description: '是否覆盖已存在的接口',
            default: false,
          },
          generateMock: {
            type: 'boolean',
            description: '是否生成Mock数据',
            default: true,
          },
          generateTest: {
            type: 'boolean',
            description: '是否生成测试用例',
            default: false,
          },
        },
        required: ['projectId', 'url'],
      },
    },
    {
      name: 'apifox_import_from_data',
      description: '从数据导入API文档',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          data: {
            type: 'string',
            description: 'API文档数据（JSON格式）',
          },
          format: {
            type: 'string',
            enum: ['openapi', 'postman'],
            description: '数据格式',
          },
          folderId: {
            type: 'string',
            description: '目标文件夹ID，可选',
          },
          overwrite: {
            type: 'boolean',
            description: '是否覆盖已存在的接口',
            default: false,
          },
          generateMock: {
            type: 'boolean',
            description: '是否生成Mock数据',
            default: true,
          },
          generateTest: {
            type: 'boolean',
            description: '是否生成测试用例',
            default: false,
          },
        },
        required: ['projectId', 'data', 'format'],
      },
    },
    {
      name: 'apifox_export_project',
      description: '导出项目API文档',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          format: {
            type: 'string',
            enum: ['openapi', 'postman', 'markdown', 'html'],
            description: '导出格式',
          },
          includeExamples: {
            type: 'boolean',
            description: '是否包含示例',
            default: true,
          },
          includeSchemas: {
            type: 'boolean',
            description: '是否包含数据模型',
            default: true,
          },
          folderId: {
            type: 'string',
            description: '指定文件夹ID，可选',
          },
        },
        required: ['projectId', 'format'],
      },
    },
    {
      name: 'apifox_sync_from_url',
      description: '从URL同步API文档',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          url: {
            type: 'string',
            description: '同步URL',
          },
          interval: {
            type: 'number',
            description: '同步间隔（分钟），可选',
          },
        },
        required: ['projectId', 'url'],
      },
    },
  ];
}

export async function handleImportExportTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  switch (name) {
    case 'apifox_import_from_url':
      return await client.importFromUrl(args.projectId, args.url, {
        folderId: args.folderId,
        overwrite: args.overwrite,
        generateMock: args.generateMock,
        generateTest: args.generateTest,
      });

    case 'apifox_import_from_data':
      return await client.importFromData(args.projectId, args.data, args.format, {
        folderId: args.folderId,
        overwrite: args.overwrite,
        generateMock: args.generateMock,
        generateTest: args.generateTest,
      });

    case 'apifox_export_project':
      return await client.exportProject(args.projectId, {
        projectId: args.projectId,
        format: args.format,
        includeExamples: args.includeExamples,
        includeSchemas: args.includeSchemas,
        folderId: args.folderId,
      });

    case 'apifox_sync_from_url':
      return await client.syncFromUrl(args.projectId, args.url, {
        interval: args.interval,
      });

    default:
      throw new Error(`Unknown import/export tool: ${name}`);
  }
} 