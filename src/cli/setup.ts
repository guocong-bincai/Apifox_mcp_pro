#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface MCPConfig {
  mcpServers: {
    [key: string]: {
      command: string;
      args: string[];
      env: {
        [key: string]: string;
      };
    };
  };
}

class ApifoxMCPSetup {
  private packageRoot: string;

  constructor() {
    // 获取包的根目录
    this.packageRoot = join(__dirname, '..', '..');
  }

  /**
   * 获取Cursor配置文件路径
   */
  private getCursorConfigPath(): string {
    const platform = process.platform;
    switch (platform) {
      case 'darwin': // macOS
        return join(homedir(), 'Library', 'Application Support', 'Cursor', 'User', 'globalStorage', 'cursor.mcp', 'config.json');
      case 'win32': // Windows
        return join(process.env.APPDATA || '', 'Cursor', 'User', 'globalStorage', 'cursor.mcp', 'config.json');
      case 'linux': // Linux
        return join(homedir(), '.config', 'Cursor', 'User', 'globalStorage', 'cursor.mcp', 'config.json');
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  /**
   * 获取Claude Desktop配置文件路径
   */
  private getClaudeConfigPath(): string {
    const platform = process.platform;
    switch (platform) {
      case 'darwin': // macOS
        return join(homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
      case 'win32': // Windows
        return join(process.env.APPDATA || '', 'Claude', 'claude_desktop_config.json');
      case 'linux': // Linux
        return join(homedir(), '.config', 'Claude', 'claude_desktop_config.json');
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  /**
   * 创建MCP服务器配置
   */
  private createMCPConfig(useNpx: boolean = true): MCPConfig {
    const executablePath = join(this.packageRoot, 'dist', 'index.js');
    
    return {
      mcpServers: {
        'apifox-mcp-pro': {
          command: useNpx ? 'npx' : 'node',
          args: useNpx ? ['apifox-mcp-pro'] : [executablePath],
          env: {
            APIFOX_ACCESS_TOKEN: process.env.APIFOX_ACCESS_TOKEN || 'your_apifox_access_token_here'
          }
        }
      }
    };
  }

  /**
   * 更新配置文件
   */
  private updateConfigFile(configPath: string, newConfig: MCPConfig): boolean {
    try {
      // 确保目录存在
      const configDir = dirname(configPath);
      if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true });
      }

      let existingConfig: MCPConfig = { mcpServers: {} };

      // 读取现有配置
      if (existsSync(configPath)) {
        try {
          const configContent = readFileSync(configPath, 'utf-8');
          existingConfig = JSON.parse(configContent);
        } catch (error) {
          console.warn(`Warning: Could not parse existing config at ${configPath}, creating new one`);
        }
      }

      // 合并配置
      existingConfig.mcpServers = {
        ...existingConfig.mcpServers,
        ...newConfig.mcpServers
      };

      // 写入配置
      writeFileSync(configPath, JSON.stringify(existingConfig, null, 2));
      return true;
    } catch (error) {
      console.error(`Error updating config file ${configPath}:`, error);
      return false;
    }
  }

  /**
   * 设置Cursor配置
   */
  public setupCursor(useNpx: boolean = true): boolean {
    try {
      const configPath = this.getCursorConfigPath();
      const config = this.createMCPConfig(useNpx);
      
      console.log('🔧 Setting up Cursor MCP configuration...');
      console.log(`📁 Config path: ${configPath}`);
      
      const success = this.updateConfigFile(configPath, config);
      
      if (success) {
        console.log('✅ Cursor configuration updated successfully!');
        console.log('🔄 Please restart Cursor to apply changes');
        return true;
      } else {
        console.error('❌ Failed to update Cursor configuration');
        return false;
      }
    } catch (error) {
      console.error('❌ Error setting up Cursor:', error);
      return false;
    }
  }

  /**
   * 设置Claude Desktop配置
   */
  public setupClaude(useNpx: boolean = true): boolean {
    try {
      const configPath = this.getClaudeConfigPath();
      const config = this.createMCPConfig(useNpx);
      
      console.log('🔧 Setting up Claude Desktop MCP configuration...');
      console.log(`📁 Config path: ${configPath}`);
      
      const success = this.updateConfigFile(configPath, config);
      
      if (success) {
        console.log('✅ Claude Desktop configuration updated successfully!');
        console.log('🔄 Please restart Claude Desktop to apply changes');
        return true;
      } else {
        console.error('❌ Failed to update Claude Desktop configuration');
        return false;
      }
    } catch (error) {
      console.error('❌ Error setting up Claude Desktop:', error);
      return false;
    }
  }

  /**
   * 生成配置文件示例
   */
  public generateConfigExamples(): void {
    const npxConfig = this.createMCPConfig(true);
    const nodeConfig = this.createMCPConfig(false);

    // 生成示例文件
    writeFileSync(
      join(this.packageRoot, 'cursor-mcp-config.json'),
      JSON.stringify(npxConfig, null, 2)
    );

    writeFileSync(
      join(this.packageRoot, 'claude-desktop-config.json'),
      JSON.stringify(npxConfig, null, 2)
    );

    writeFileSync(
      join(this.packageRoot, 'local-config-example.json'),
      JSON.stringify(nodeConfig, null, 2)
    );

    console.log('✅ Configuration examples generated');
  }

  /**
   * 显示帮助信息
   */
  public showHelp(): void {
    console.log(`
🚀 Apifox MCP Pro Setup Tool

Usage: npx apifox-mcp-pro setup [options]

Options:
  --cursor         Setup Cursor MCP configuration
  --claude         Setup Claude Desktop MCP configuration  
  --both           Setup both Cursor and Claude Desktop
  --local          Use local node command instead of npx
  --examples       Generate configuration examples only
  --help           Show this help message

Examples:
  npx apifox-mcp-pro setup --cursor
  npx apifox-mcp-pro setup --both
  npx apifox-mcp-pro setup --claude --local

Environment Variables:
  APIFOX_ACCESS_TOKEN    Your Apifox access token

For more information, visit: https://github.com/guocong-bincai/Apifox_mcp_pro
`);
  }
}

// CLI入口
export function runSetup(): void {
  const args = process.argv.slice(2);
  const setup = new ApifoxMCPSetup();

  // 检查是否需要帮助
  if (args.includes('--help') || args.includes('-h')) {
    setup.showHelp();
    return;
  }

  // 检查访问令牌
  if (!process.env.APIFOX_ACCESS_TOKEN) {
    console.log('⚠️  Warning: APIFOX_ACCESS_TOKEN environment variable not set');
    console.log('   You can set it later in the generated configuration files');
    console.log('');
  }

  const useNpx = !args.includes('--local');
  const setupCursor = args.includes('--cursor') || args.includes('--both');
  const setupClaude = args.includes('--claude') || args.includes('--both');
  const examplesOnly = args.includes('--examples');

  if (examplesOnly) {
    setup.generateConfigExamples();
    return;
  }

  if (!setupCursor && !setupClaude) {
    console.log('🤔 No setup target specified. Use --cursor, --claude, or --both');
    setup.showHelp();
    return;
  }

  console.log('🚀 Starting Apifox MCP Pro setup...');
  console.log('');

  let success = true;

  if (setupCursor) {
    success = setup.setupCursor(useNpx) && success;
    console.log('');
  }

  if (setupClaude) {
    success = setup.setupClaude(useNpx) && success;
    console.log('');
  }

  // 总是生成示例文件
  setup.generateConfigExamples();

  if (success) {
    console.log('🎉 Setup completed successfully!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Set your Apifox access token if not already set');
    console.log('2. Restart your IDE(s) to apply the changes');
    console.log('3. Start using Apifox MCP Pro tools in your AI assistant!');
  } else {
    console.log('❌ Setup completed with errors. Please check the messages above.');
    process.exit(1);
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runSetup();
} 