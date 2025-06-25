#!/usr/bin/env node

/**
 * 简单的MCP服务器测试脚本
 * 用于验证服务器是否能正常启动和响应
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 设置测试环境变量
process.env.APIFOX_ACCESS_TOKEN = 'test_token_for_validation';

console.log('Starting Apifox MCP Pro Server test...');

const serverPath = join(__dirname, 'dist', 'index.js');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env }
});

let responseReceived = false;

// 监听服务器输出
server.stderr.on('data', (data) => {
  const output = data.toString();
  console.log('Server output:', output);
  
  if (output.includes('Apifox MCP Pro Server started successfully')) {
    console.log('✅ Server started successfully!');
    responseReceived = true;
    setTimeout(() => {
      server.kill();
      process.exit(0);
    }, 1000);
  }
});

server.stdout.on('data', (data) => {
  console.log('Server stdout:', data.toString());
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

server.on('close', (code) => {
  if (!responseReceived) {
    console.error(`❌ Server exited with code ${code} before responding`);
    process.exit(1);
  } else {
    console.log('✅ Test completed successfully!');
  }
});

// 发送一个简单的MCP消息来测试服务器响应
setTimeout(() => {
  const testMessage = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  }) + '\n';
  
  server.stdin.write(testMessage);
}, 500);

// 超时保护
setTimeout(() => {
  if (!responseReceived) {
    console.error('❌ Test timeout - server did not respond within 10 seconds');
    server.kill();
    process.exit(1);
  }
}, 10000); 