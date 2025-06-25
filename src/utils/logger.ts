/**
 * 简单的日志工具
 */
export class Logger {
  private static instance: Logger;
  private debugMode: boolean;

  private constructor() {
    this.debugMode = process.env.DEBUG === 'true' || process.env.NODE_ENV === 'development';
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  debug(message: string, ...args: any[]): void {
    if (this.debugMode) {
      console.error(`[DEBUG] ${new Date().toISOString()}: ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    console.error(`[INFO] ${new Date().toISOString()}: ${message}`, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.error(`[WARN] ${new Date().toISOString()}: ${message}`, ...args);
  }

  error(message: string, error?: Error | any, ...args: any[]): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error, ...args);
  }
}

export const logger = Logger.getInstance(); 