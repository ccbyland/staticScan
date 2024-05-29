const fs = require("fs");
const path = require("path");

/**
 * 扫描目录以获取所有符合条件的文件路径。
 * @param {string} directory - 要扫描的目录路径。
 * @returns {Promise<string[]>} - 包含所有符合条件的文件路径的数组。
 */
async function scanDirectory(directory) {
  let filePaths = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      filePaths = filePaths.concat(await scanDirectory(fullPath));
    } else if (entry.isFile() && isValidFile(entry.name)) {
      filePaths.push(fullPath);
    }
  }

  return filePaths;
}

/**
 * 检查文件名是否符合指定的扩展名条件。
 * @param {string} fileName - 要检查的文件名。
 * @returns {boolean} - 如果文件名符合条件，返回 true；否则返回 false。
 */
function isValidFile(fileName) {
  return /\.(tsx?|jsx?)$/.test(fileName);
}

module.exports = { scanDirectory };
