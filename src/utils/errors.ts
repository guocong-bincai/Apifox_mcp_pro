/**
 * Apifox API 错误类
 */
export class ApifoxAPIError extends Error {
  public readonly statusCode?: number;
  public readonly errorCode?: string;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode?: number,
    errorCode?: string,
    details?: any
  ) {
    super(message);
    this.name = 'ApifoxAPIError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}

/**
 * 工具执行错误类
 */
export class ToolExecutionError extends Error {
  public readonly toolName: string;
  public readonly originalError?: Error;

  constructor(toolName: string, message: string, originalError?: Error) {
    super(message);
    this.name = 'ToolExecutionError';
    this.toolName = toolName;
    this.originalError = originalError;
  }
}

/**
 * 配置错误类
 */
export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

/**
 * 格式化错误消息用于返回给用户
 */
export function formatErrorForUser(error: Error): string {
  if (error instanceof ApifoxAPIError) {
    return `Apifox API Error (${error.statusCode}): ${error.message}${
      error.errorCode ? ` (Code: ${error.errorCode})` : ''
    }`;
  }

  if (error instanceof ToolExecutionError) {
    return `Tool execution failed for ${error.toolName}: ${error.message}`;
  }

  if (error instanceof ConfigurationError) {
    return `Configuration error: ${error.message}`;
  }

  return `Error: ${error.message}`;
}

/**
 * 检查错误是否为网络相关错误
 */
export function isNetworkError(error: any): boolean {
  return (
    error.code === 'ECONNREFUSED' ||
    error.code === 'ENOTFOUND' ||
    error.code === 'TIMEOUT' ||
    error.code === 'ECONNRESET' ||
    (error.response && error.response.status >= 500)
  );
}

/**
 * 检查错误是否为认证相关错误
 */
export function isAuthenticationError(error: any): boolean {
  return (
    error.response &&
    (error.response.status === 401 || error.response.status === 403)
  );
} 