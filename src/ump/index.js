const CommentParser = require('./commentParser');
const { scanDirectory } = require('./fileUtils');

/**
 * 主函数，负责初始化解析器、扫描目录并解析注释。
 */
async function main() {
  const parser = new CommentParser();
  const directoryPath = "D:\\lzjx\\crm-pc-client-web\\src";
  const filePathList = await scanDirectory(directoryPath);
  await parser.parseVueComments(filePathList);
}

// 立即执行主函数
main().catch(error => {
  console.error('执行过程中发生错误:', error);
});
