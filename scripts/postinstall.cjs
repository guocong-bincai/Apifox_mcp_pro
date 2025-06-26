#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🚀 Setting up Apifox MCP Pro...');

// 获取全局安装路径
const packagePath = process.cwd();
const isGlobalInstall = packagePath.includes('node_modules') && packagePath.includes('apifox-mcp-pro');

if (isGlobalInstall) {
  console.log('✅ Global installation detected');
  
  // 获取实际的可执行文件路径
  const executablePath = path.join(packagePath, 'dist', 'index.js');
  
  // 创建Cursor配置文件
  const cursorConfig = {
    mcpServers: {
      "apifox-mcp-pro": {
        command: "node",
        args: [executablePath],
        env: {
          APIFOX_ACCESS_TOKEN: "your_apifox_access_token_here"
        }
      }
    }
  };

  // 创建Claude Desktop配置文件
  const claudeConfig = {
    mcpServers: {
      "apifox-mcp-pro": {
        command: "node",
        args: [executablePath],
        env: {
          APIFOX_ACCESS_TOKEN: "your_apifox_access_token_here"
        }
      }
    }
  };

  // 写入配置文件到包目录
  try {
    fs.writeFileSync(
      path.join(packagePath, 'cursor-mcp-config.json'),
      JSON.stringify(cursorConfig, null, 2)
    );
    
    fs.writeFileSync(
      path.join(packagePath, 'claude-desktop-config.json'),
      JSON.stringify(claudeConfig, null, 2)
    );

    console.log('✅ Configuration files generated');
    console.log('📁 Configuration files location:', packagePath);
    console.log('');
    console.log('🔧 Next steps:');
    console.log('1. Set your Apifox access token:');
    console.log('   export APIFOX_ACCESS_TOKEN="your_token_here"');
    console.log('');
    console.log('2. For Cursor, copy the cursor-mcp-config.json content to your Cursor settings');
    console.log('3. For Claude Desktop, copy the claude-desktop-config.json content to your Claude config');
    console.log('');
    console.log('📖 For detailed setup instructions, see:');
    console.log('   https://github.com/your-username/apifox-mcp-pro#readme');
    
  } catch (error) {
    console.error('❌ Error generating configuration files:', error.message);
  }
} else {
  console.log('📦 Local installation detected - skipping global setup');
}

console.log('🎉 Apifox MCP Pro installation completed!'); 