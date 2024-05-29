const fs = require("fs");
const { parse } = require("@babel/parser");
const { parseAST } = require("./astAnalysis");
const { commentToFunction } = require("./codeGenerator");

/**
 * CommentParser 类用于解析文件中的注释并处理函数。
 */
class CommentParser {
  constructor() {
    this.commentsList = [];
    this.filePath = "";
    this.ast = null;
  }

  /**
   * 解析 Vue 文件中的注释。
   * @param {string[]} filePathList - 文件路径列表。
   */
  async parseVueComments(filePathList) {
    for (const filePath of filePathList) {
      try {
        this._initializeForFile(filePath);
        this.ast = this._parseFile(filePath);
        parseAST(this.ast, this);
        await commentToFunction(this);
      } catch (error) {
        console.error(`解析文件出错：${filePath}`, error.message);
      }
    }
  }

  /**
   * 初始化当前文件的相关属性。
   * @param {string} filePath - 当前处理的文件路径。
   * @private
   */
  _initializeForFile(filePath) {
    this.commentsList = [];
    this.filePath = filePath;
  }

  /**
   * 解析文件并生成 AST。
   * @param {string} filePath - 当前处理的文件路径。
   * @returns {Object} - 生成的 AST。
   * @private
   */
  _parseFile(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return parse(fileContent, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });
  }
}

module.exports = CommentParser;
