const path = require("path");
const fs = require("fs").promises;

/**
 * 递归获取指定目录下的所有 TypeScript 文件
 * @param {string} dir 目录路径
 * @returns {Promise<Array<string>>} 返回一个 Promise，包含目录下所有的 TypeScript 文件路径数组
 */
async function getTsFiles(dir) {
  const stat = await fs.stat(dir);
  if (!stat.isDirectory()) {
    return [dir];
  }

  const files = [];
  // 递归遍历目录下的所有文件，将 TypeScript 文件路径添加到 files 数组中
  await walk(dir, async (filePath) => {
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
function walk(dir, fileCallback) {
  return fs
    .readdir(dir)
    .then((files) => {
      // 对目录下的所有文件和子目录进行处理
      return Promise.all(
        files.map(async (file) => {
          const filePath = path.join(dir, file);
          const stat = await fs.stat(filePath);
          if (stat.isDirectory()) {
            // 如果是子目录，则递归遍历
            return walk(filePath, fileCallback);
          } else {
            // 如果是文件，则调用回调函数处理
            return fileCallback(filePath);
          }
        })
      );
    })
    .catch((error) => {
      // 如果遍历过程中出现错误，抛出异常
      throw new Error(`Error walking directory ${dir}: ${error.message}`);
    });
}

/**
 * 检查文件是否为 TypeScript 文件
 * @param {string} filePath 文件路径
 * @returns {boolean} 如果是 TypeScript 文件，则返回 true，否则返回 false
 */
function isTsFile(filePath) {
  return filePath.endsWith(".ts") || filePath.endsWith(".tsx");
}

module.exports = { getTsFiles };