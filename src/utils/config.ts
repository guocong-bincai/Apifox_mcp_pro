import { ApifoxConfig } from '../types/apifox.js';

/**
 * 加载并验证配置
 */
export function loadConfig(): ApifoxConfig {
  const accessToken = process.env.APIFOX_ACCESS_TOKEN;
  
  if (!accessToken) {
    throw new Error(
      'APIFOX_ACCESS_TOKEN environment variable is required. ' +
      'Please set your Apifox Personal Access Token in the environment variables.'
    );
  }

  return {
    accessToken,
    baseUrl: process.env.APIFOX_BASE_URL || 'https://api.apifox.com',
    timeout: parseInt(process.env.APIFOX_TIMEOUT || '30000', 10),
  };
}

/**
 * 验证配置参数
 */
export function validateConfig(config: ApifoxConfig): void {
  if (!config.accessToken) {
    throw new Error('Access token is required');
  }

  if (config.timeout && (config.timeout < 1000 || config.timeout > 120000)) {
    throw new Error('Timeout must be between 1000 and 120000 milliseconds');
  }

  if (config.baseUrl && !isValidUrl(config.baseUrl)) {
    throw new Error('Base URL must be a valid URL');
  }
}

/**
 * 检查URL是否有效
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
} 