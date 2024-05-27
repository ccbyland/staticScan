import * as path from "path";
import { promises as fs } from "fs";

/**
 * 递归获取指定目录下的所有 TypeScript 文件
 * @param {string} dir 目录路径
 * @returns {Promise<Array<string>>} 返回一个 Promise，包含目录下所有的 TypeScript 文件路径数组
 */
async function getTsFiles(dir: string): Promise<string[]> {
  const stat = await fs.stat(dir);
  if (!stat.isDirectory()) {
    return [dir];
  }

  const files: string[] = [];
  // 递归遍历目录下的所有文件，将 TypeScript 文件路径添加到 files 数组中
  await walk(dir, async (filePath: string) => {
    if (isTsFile(filePath)) {
      files.push(filePath);
    }
  });
  // 返回文件路径数组
  return files;
}

/**
 * 递归遍历指定目录下的所有文件和子目录
 * @param {string} dir 目录路径
 * @param {Function} fileCallback 处理文件的回调函数
 * @returns {Promise<void>} 返回一个 Promise，表示遍历完成
 */
async function walk(dir: string, fileCallback: Function): Promise<void> {
  const files = await fs.readdir(dir);
  // 对目录下的所有文件和子目录进行处理
  await Promise.all(
    files.map(async (file: string) => {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        // 如果是子目录，则递归遍历
        await walk(filePath, fileCallback);
      } else {
        // 如果是文件，则调用回调函数处理
        await fileCallback(filePath);
      }
    })
  );
}

/**
 * 检查文件是否为 TypeScript 文件
 * @param {string} filePath 文件路径
 * @returns {boolean} 如果是 TypeScript 文件，则返回 true，否则返回 false
 */
function isTsFile(filePath: string): boolean {
  return filePath.endsWith(".ts") || filePath.endsWith(".tsx");
}

export { getTsFiles };
