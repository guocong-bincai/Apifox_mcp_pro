#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Apifox MCP Pro installation...');

// 测试命令是否可用
function testCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { 
      stdio: 'pipe',
      timeout: 10000 
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function runTests() {
  const tests = [
    {
      name: 'Command availability',
      test: async () => {
        try {
          await testCommand('apifox-mcp-pro', ['--version']);
          return { success: true, message: 'Command is available' };
        } catch (error) {
          return { success: false, message: `Command not found: ${error.message}` };
        }
      }
    },
    {
      name: 'Help command',
      test: async () => {
        try {
          const result = await testCommand('apifox-mcp-pro', ['--help']);
          if (result.stdout.includes('Apifox MCP Pro')) {
            return { success: true, message: 'Help command works' };
          } else {
            return { success: false, message: 'Help output unexpected' };
          }
        } catch (error) {
          return { success: false, message: `Help command failed: ${error.message}` };
        }
      }
    },
    {
      name: 'Setup command',
      test: async () => {
        try {
          const result = await testCommand('apifox-mcp-pro', ['setup', '--examples']);
          return { success: true, message: 'Setup command works' };
        } catch (error) {
          return { success: false, message: `Setup command failed: ${error.message}` };
        }
      }
    },
    {
      name: 'NPX execution',
      test: async () => {
        try {
          await testCommand('npx', ['apifox-mcp-pro', '--version']);
          return { success: true, message: 'NPX execution works' };
        } catch (error) {
          return { success: false, message: `NPX execution failed: ${error.message}` };
        }
      }
    }
  ];

  console.log('');
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    process.stdout.write(`Testing ${test.name}... `);
    
    try {
      const result = await test.test();
      if (result.success) {
        console.log(`✅ ${result.message}`);
        passed++;
      } else {
        console.log(`❌ ${result.message}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${error.message}`);
      failed++;
    }
  }

  console.log('');
  console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed! Apifox MCP Pro is ready to use.');
    console.log('');
    console.log('Next steps:');
    console.log('1. Set your APIFOX_ACCESS_TOKEN environment variable');
    console.log('2. Run: apifox-mcp-pro setup --both');
    console.log('3. Restart your IDE to apply MCP configuration');
  } else {
    console.log('❌ Some tests failed. Please check the installation.');
    process.exit(1);
  }
}

// 运行测试
runTests().catch((error) => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
}); 