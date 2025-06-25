import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ApifoxClient } from '../client/apifox-client.js';

// 工具定义接口
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

// 文件夹工具定义
export const folderTools: ToolDefinition[] = [
  {
    name: 'apifox_list_folders',
    description: '获取项目中的文件夹列表',
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
      return { message: '文件夹列表功能待实现', projectId: args.projectId };
    },
  },
  {
    name: 'apifox_create_folder',
    description: '创建新文件夹',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: '项目ID',
        },
        name: {
          type: 'string',
          description: '文件夹名称',
        },
      },
      required: ['projectId', 'name'],
    },
    handler: async (args: any) => {
      return { message: '创建文件夹功能待实现', name: args.name };
    },
  },
  {
    name: 'apifox_update_folder',
    description: '更新文件夹信息',
    inputSchema: {
      type: 'object',
      properties: {
        folderId: {
          type: 'string',
          description: '文件夹ID',
        },
        name: {
          type: 'string',
          description: '文件夹名称',
        },
      },
      required: ['folderId', 'name'],
    },
    handler: async (args: any) => {
      return { message: '更新文件夹功能待实现', folderId: args.folderId };
    },
  },
  {
    name: 'apifox_delete_folder',
    description: '删除文件夹',
    inputSchema: {
      type: 'object',
      properties: {
        folderId: {
          type: 'string',
          description: '文件夹ID',
        },
      },
      required: ['folderId'],
    },
    handler: async (args: any) => {
      return { message: '删除文件夹功能待实现', folderId: args.folderId };
    },
  },
];

export function createFolderTools(client: ApifoxClient): Tool[] {
  return [
    {
      name: 'apifox_list_folders',
      description: '获取项目中的文件夹列表',
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
      name: 'apifox_create_folder',
      description: '创建新的文件夹',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          name: {
            type: 'string',
            description: '文件夹名称',
          },
          parentId: {
            type: 'string',
            description: '父文件夹ID，留空表示在根目录创建',
          },
        },
        required: ['projectId', 'name'],
      },
    },
    {
      name: 'apifox_update_folder',
      description: '更新文件夹信息',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          folderId: {
            type: 'string',
            description: '文件夹ID',
          },
          name: {
            type: 'string',
            description: '文件夹名称',
          },
          parentId: {
            type: 'string',
            description: '父文件夹ID',
          },
        },
        required: ['projectId', 'folderId'],
      },
    },
    {
      name: 'apifox_delete_folder',
      description: '删除文件夹（注意：会同时删除文件夹内的所有API接口）',
      inputSchema: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: '项目ID',
          },
          folderId: {
            type: 'string',
            description: '文件夹ID',
          },
        },
        required: ['projectId', 'folderId'],
      },
    },
  ];
}

export async function handleFolderTool(
  client: ApifoxClient,
  name: string,
  args: any
): Promise<any> {
  switch (name) {
    case 'apifox_list_folders':
      return await client.getFolders(args.projectId);

    case 'apifox_create_folder':
      return await client.createFolder(args.projectId, {
        name: args.name,
        parentId: args.parentId,
        projectId: args.projectId,
        type: 'folder',
      });

    case 'apifox_update_folder':
      const updates: any = {};
      if (args.name) updates.name = args.name;
      if (args.parentId !== undefined) updates.parentId = args.parentId;
      return await client.updateFolder(args.projectId, args.folderId, updates);

    case 'apifox_delete_folder':
      await client.deleteFolder(args.projectId, args.folderId);
      return { success: true, message: '文件夹删除成功' };

    default:
      throw new Error(`Unknown folder tool: ${name}`);
  }
} 