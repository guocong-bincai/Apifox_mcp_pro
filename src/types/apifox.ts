// Apifox API 相关类型定义

export interface ApifoxConfig {
  baseUrl?: string;
  accessToken: string;
  timeout?: number;
}

export interface ApifoxProject {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  teamId?: string;
  visibility: 'private' | 'public' | 'team';
  settings?: ProjectSettings;
}

interface ProjectSettings {
  mockBaseUrl?: string;
  enableMock?: boolean;
  enableTest?: boolean;
  enableDoc?: boolean;
}

export interface ApifoxFolder {
  id: string;
  name: string;
  parentId?: string;
  projectId: string;
  type: 'folder';
  children?: (ApifoxFolder | ApifoxApi)[];
}

export interface ApifoxApi {
  id: string;
  name: string;
  method: HttpMethod;
  path: string;
  tags?: string[];
  folderId?: string;
  projectId: string;
  status: ApiStatus;
  description?: string;
  requestBody?: RequestBody;
  parameters?: Parameter[];
  responses?: Response[];
  examples?: Example[];
  createdAt: string;
  updatedAt: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export type ApiStatus = 'designing' | 'developing' | 'testing' | 'completed' | 'deprecated';

export interface Parameter {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required: boolean;
  schema: Schema;
  example?: any;
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content: {
    [mediaType: string]: {
      schema: Schema;
      example?: any;
      examples?: { [key: string]: Example };
    };
  };
}

export interface Response {
  statusCode: string;
  description?: string;
  headers?: { [key: string]: Header };
  content?: {
    [mediaType: string]: {
      schema: Schema;
      example?: any;
      examples?: { [key: string]: Example };
    };
  };
}

export interface Header {
  description?: string;
  required?: boolean;
  schema: Schema;
}

export interface Schema {
  type?: string;
  format?: string;
  properties?: { [key: string]: Schema };
  items?: Schema;
  required?: string[];
  enum?: any[];
  example?: any;
  description?: string;
  $ref?: string;
}

export interface Example {
  name: string;
  summary?: string;
  description?: string;
  value: any;
}

export interface ApifoxEnvironment {
  id: string;
  name: string;
  projectId: string;
  variables: EnvironmentVariable[];
  isDefault: boolean;
}

export interface EnvironmentVariable {
  name: string;
  value: string;
  description?: string;
  enabled: boolean;
}

export interface ApifoxTestCase {
  id: string;
  name: string;
  projectId: string;
  apiId?: string;
  steps: TestStep[];
  variables?: TestVariable[];
  createdAt: string;
  updatedAt: string;
}

export interface TestStep {
  id: string;
  name: string;
  type: 'api' | 'delay' | 'script';
  config: any;
  assertions?: Assertion[];
  extractors?: Extractor[];
}

export interface TestVariable {
  name: string;
  value: string;
  type: 'string' | 'number' | 'boolean';
}

export interface Assertion {
  type: 'status' | 'header' | 'body' | 'response_time';
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  target: string;
  value: any;
}

export interface Extractor {
  name: string;
  type: 'json' | 'xml' | 'regex' | 'header';
  expression: string;
  scope: 'global' | 'local';
}

export interface ApifoxSchema {
  id: string;
  name: string;
  projectId: string;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean';
  schema: Schema;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImportOptions {
  projectId: string;
  folderId?: string;
  overwrite?: boolean;
  generateMock?: boolean;
  generateTest?: boolean;
}

export interface ExportOptions {
  projectId: string;
  format: 'openapi' | 'postman' | 'markdown' | 'html';
  includeExamples?: boolean;
  includeSchemas?: boolean;
  folderId?: string;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  errorCode?: string;
  errorMessage?: string;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// 搜索选项
export interface SearchOptions {
  keyword?: string;
  projectId?: string;
  folderId?: string;
  method?: HttpMethod;
  status?: ApiStatus;
  tags?: string[];
  limit?: number;
  offset?: number;
} 