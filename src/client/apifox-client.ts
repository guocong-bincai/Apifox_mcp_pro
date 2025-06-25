import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { 
  ApifoxConfig, 
  ApifoxProject, 
  ApifoxFolder, 
  ApifoxApi, 
  ApifoxEnvironment,
  ApifoxTestCase,
  ApifoxSchema,
  ImportOptions,
  ExportOptions,
  ApiResponse,
  PaginatedResponse,
  SearchOptions,
  HttpMethod,
  ApiStatus
} from '../types/apifox.js';

export class ApifoxClient {
  private client: AxiosInstance;
  private config: ApifoxConfig;

  constructor(config: ApifoxConfig) {
    this.config = {
      baseUrl: 'https://api.apifox.com',
      timeout: 30000,
      ...config
    };

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Apifox-MCP-Pro/1.0.0'
      }
    });

    // 添加响应拦截器处理错误
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          throw new Error(`Apifox API Error: ${error.response.status} - ${error.response.data?.message || error.message}`);
        }
        throw error;
      }
    );
  }

  // 项目管理
  async getProjects(): Promise<ApifoxProject[]> {
    const response = await this.client.get<ApiResponse<ApifoxProject[]>>('/v1/projects');
    return response.data.data;
  }

  async getProject(projectId: string): Promise<ApifoxProject> {
    const response = await this.client.get<ApiResponse<ApifoxProject>>(`/v1/projects/${projectId}`);
    return response.data.data;
  }

  async createProject(project: Partial<ApifoxProject>): Promise<ApifoxProject> {
    const response = await this.client.post<ApiResponse<ApifoxProject>>('/v1/projects', project);
    return response.data.data;
  }

  async updateProject(projectId: string, updates: Partial<ApifoxProject>): Promise<ApifoxProject> {
    const response = await this.client.put<ApiResponse<ApifoxProject>>(`/v1/projects/${projectId}`, updates);
    return response.data.data;
  }

  async deleteProject(projectId: string): Promise<void> {
    await this.client.delete(`/v1/projects/${projectId}`);
  }

  // 文件夹管理
  async getFolders(projectId: string): Promise<ApifoxFolder[]> {
    const response = await this.client.get<ApiResponse<ApifoxFolder[]>>(`/v1/projects/${projectId}/folders`);
    return response.data.data;
  }

  async createFolder(projectId: string, folder: Partial<ApifoxFolder>): Promise<ApifoxFolder> {
    const response = await this.client.post<ApiResponse<ApifoxFolder>>(`/v1/projects/${projectId}/folders`, folder);
    return response.data.data;
  }

  async updateFolder(projectId: string, folderId: string, updates: Partial<ApifoxFolder>): Promise<ApifoxFolder> {
    const response = await this.client.put<ApiResponse<ApifoxFolder>>(`/v1/projects/${projectId}/folders/${folderId}`, updates);
    return response.data.data;
  }

  async deleteFolder(projectId: string, folderId: string): Promise<void> {
    await this.client.delete(`/v1/projects/${projectId}/folders/${folderId}`);
  }

  // API接口管理
  async getApis(projectId: string, options?: { folderId?: string }): Promise<ApifoxApi[]> {
    const params = options ? { folder_id: options.folderId } : {};
    const response = await this.client.get<ApiResponse<ApifoxApi[]>>(`/v1/projects/${projectId}/apis`, { params });
    return response.data.data;
  }

  async getApi(projectId: string, apiId: string): Promise<ApifoxApi> {
    const response = await this.client.get<ApiResponse<ApifoxApi>>(`/v1/projects/${projectId}/apis/${apiId}`);
    return response.data.data;
  }

  async createApi(projectId: string, api: Partial<ApifoxApi>): Promise<ApifoxApi> {
    const response = await this.client.post<ApiResponse<ApifoxApi>>(`/v1/projects/${projectId}/apis`, api);
    return response.data.data;
  }

  async updateApi(projectId: string, apiId: string, updates: Partial<ApifoxApi>): Promise<ApifoxApi> {
    const response = await this.client.put<ApiResponse<ApifoxApi>>(`/v1/projects/${projectId}/apis/${apiId}`, updates);
    return response.data.data;
  }

  async deleteApi(projectId: string, apiId: string): Promise<void> {
    await this.client.delete(`/v1/projects/${projectId}/apis/${apiId}`);
  }

  async searchApis(options: SearchOptions): Promise<PaginatedResponse<ApifoxApi>> {
    const response = await this.client.get<ApiResponse<PaginatedResponse<ApifoxApi>>>('/v1/apis/search', { params: options });
    return response.data.data;
  }

  // 环境管理
  async getEnvironments(projectId: string): Promise<ApifoxEnvironment[]> {
    const response = await this.client.get<ApiResponse<ApifoxEnvironment[]>>(`/v1/projects/${projectId}/environments`);
    return response.data.data;
  }

  async createEnvironment(projectId: string, environment: Partial<ApifoxEnvironment>): Promise<ApifoxEnvironment> {
    const response = await this.client.post<ApiResponse<ApifoxEnvironment>>(`/v1/projects/${projectId}/environments`, environment);
    return response.data.data;
  }

  async updateEnvironment(projectId: string, envId: string, updates: Partial<ApifoxEnvironment>): Promise<ApifoxEnvironment> {
    const response = await this.client.put<ApiResponse<ApifoxEnvironment>>(`/v1/projects/${projectId}/environments/${envId}`, updates);
    return response.data.data;
  }

  async deleteEnvironment(projectId: string, envId: string): Promise<void> {
    await this.client.delete(`/v1/projects/${projectId}/environments/${envId}`);
  }

  // 测试用例管理
  async getTestCases(projectId: string): Promise<ApifoxTestCase[]> {
    const response = await this.client.get<ApiResponse<ApifoxTestCase[]>>(`/v1/projects/${projectId}/test-cases`);
    return response.data.data;
  }

  async createTestCase(projectId: string, testCase: Partial<ApifoxTestCase>): Promise<ApifoxTestCase> {
    const response = await this.client.post<ApiResponse<ApifoxTestCase>>(`/v1/projects/${projectId}/test-cases`, testCase);
    return response.data.data;
  }

  async updateTestCase(projectId: string, testCaseId: string, updates: Partial<ApifoxTestCase>): Promise<ApifoxTestCase> {
    const response = await this.client.put<ApiResponse<ApifoxTestCase>>(`/v1/projects/${projectId}/test-cases/${testCaseId}`, updates);
    return response.data.data;
  }

  async deleteTestCase(projectId: string, testCaseId: string): Promise<void> {
    await this.client.delete(`/v1/projects/${projectId}/test-cases/${testCaseId}`);
  }

  async runTestCase(projectId: string, testCaseId: string): Promise<any> {
    const response = await this.client.post<ApiResponse<any>>(`/v1/projects/${projectId}/test-cases/${testCaseId}/run`);
    return response.data.data;
  }

  // 数据模型管理
  async getSchemas(projectId: string): Promise<ApifoxSchema[]> {
    const response = await this.client.get<ApiResponse<ApifoxSchema[]>>(`/v1/projects/${projectId}/schemas`);
    return response.data.data;
  }

  async createSchema(projectId: string, schema: Partial<ApifoxSchema>): Promise<ApifoxSchema> {
    const response = await this.client.post<ApiResponse<ApifoxSchema>>(`/v1/projects/${projectId}/schemas`, schema);
    return response.data.data;
  }

  async updateSchema(projectId: string, schemaId: string, updates: Partial<ApifoxSchema>): Promise<ApifoxSchema> {
    const response = await this.client.put<ApiResponse<ApifoxSchema>>(`/v1/projects/${projectId}/schemas/${schemaId}`, updates);
    return response.data.data;
  }

  async deleteSchema(projectId: string, schemaId: string): Promise<void> {
    await this.client.delete(`/v1/projects/${projectId}/schemas/${schemaId}`);
  }

  // 导入导出功能
  async importFromUrl(projectId: string, url: string, options?: Partial<ImportOptions>): Promise<any> {
    const data = { url, ...options };
    const response = await this.client.post<ApiResponse<any>>(`/v1/projects/${projectId}/import/url`, data);
    return response.data.data;
  }

  async importFromData(projectId: string, data: string, format: 'openapi' | 'postman', options?: Partial<ImportOptions>): Promise<any> {
    const payload = { data, format, ...options };
    const response = await this.client.post<ApiResponse<any>>(`/v1/projects/${projectId}/import/data`, payload);
    return response.data.data;
  }

  async exportProject(projectId: string, options: ExportOptions): Promise<string> {
    const response = await this.client.post<ApiResponse<string>>(`/v1/projects/${projectId}/export`, options);
    return response.data.data;
  }

  // 文档发布
  async publishDoc(projectId: string, options?: { version?: string; description?: string }): Promise<any> {
    const response = await this.client.post<ApiResponse<any>>(`/v1/projects/${projectId}/docs/publish`, options);
    return response.data.data;
  }

  async getPublishedDocs(projectId: string): Promise<any[]> {
    const response = await this.client.get<ApiResponse<any[]>>(`/v1/projects/${projectId}/docs/published`);
    return response.data.data;
  }

  // Mock 管理
  async getMockConfig(projectId: string): Promise<any> {
    const response = await this.client.get<ApiResponse<any>>(`/v1/projects/${projectId}/mock/config`);
    return response.data.data;
  }

  async updateMockConfig(projectId: string, config: any): Promise<any> {
    const response = await this.client.put<ApiResponse<any>>(`/v1/projects/${projectId}/mock/config`, config);
    return response.data.data;
  }

  // 批量操作
  async batchDeleteApis(projectId: string, apiIds: string[]): Promise<void> {
    await this.client.post(`/v1/projects/${projectId}/apis/batch-delete`, { apiIds });
  }

  async batchUpdateApiStatus(projectId: string, apiIds: string[], status: ApiStatus): Promise<void> {
    await this.client.post(`/v1/projects/${projectId}/apis/batch-update-status`, { apiIds, status });
  }

  async batchMoveApis(projectId: string, apiIds: string[], targetFolderId?: string): Promise<void> {
    await this.client.post(`/v1/projects/${projectId}/apis/batch-move`, { apiIds, targetFolderId });
  }

  // 同步功能
  async syncFromUrl(projectId: string, url: string, options?: { interval?: number }): Promise<any> {
    const response = await this.client.post<ApiResponse<any>>(`/v1/projects/${projectId}/sync`, { url, ...options });
    return response.data.data;
  }

  // 统计信息
  async getProjectStats(projectId: string): Promise<any> {
    const response = await this.client.get<ApiResponse<any>>(`/v1/projects/${projectId}/stats`);
    return response.data.data;
  }
} 