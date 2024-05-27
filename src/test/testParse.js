const path = require("path");
const { parse } = require("@babel/parser");
const fs = require("fs");

class CommentParser {
  constructor() {
    this.filePath = "";
    this.commentsList = [];
  }

  // 判断是否为函数表达式或箭头函数表达式
  isFunctionExpression(declaration) {
    const type = declaration.init && declaration.init.type;
    return type === "FunctionExpression" || type === "ArrowFunctionExpression";
  }

  // 判断是否为 useCallback 调用
  isFunctionCallee(declaration) {
    // 变量未初始化
    if(!declaration.init){
      return
    }
    const callee = declaration.init.callee;
    return callee && callee.name === "useCallback";
  }

  // 处理函数，输出收集到的注释
  handleFunction() {
    this.commentsList.forEach((obj) => {
      const { filePath, fnName, fnComments } = obj;
      if (fnComments.length > 0) {
        const comments = fnComments
          .map((comment) =>
            comment.value
              .trim()
              .split("\n")
              .map((line) => line.trim().replace(/^\*+\s*/, ""))
              .filter(Boolean)
          )
          .flat();
        console.error(`【${filePath}】`, `【${fnName}】`, comments);
      }
    });
  }

  // 解析抽象语法树
  parseAST(node) {
    const nodeHandlers = {
      File: (node) => node.program.body.forEach((n) => this.parseAST(n)),
      CallExpression: (node) =>
        node.arguments.forEach((arg) => this.parseAST(arg)),
      ExportDefaultDeclaration: (node) => {
        const declaration = node.declaration;
        if (declaration.type === "FunctionDeclaration") {
          this.commentsList.push({
            filePath: this.filePath,
            fnName: declaration.id.name,
            fnComments: node.leadingComments || [],
          });
        }
        this.parseAST(declaration);
      },
      FunctionDeclaration: (node) => {
        this.commentsList.push({
          filePath: this.filePath,
          fnName: node.id.name,
          fnComments: node.leadingComments || [],
        });
        node.body.body.forEach((n) => this.parseAST(n));
      },
      ExportNamedDeclaration: (node) => {
        const declaration = node.declaration;
        if(!declaration){
          return
        }
        if (declaration.type === "FunctionDeclaration") {
          this.commentsList.push({
            filePath: this.filePath,
            fnName: declaration.id.name,
            fnComments: node.leadingComments || [],
          });
        } else if (declaration.type === "VariableDeclaration") {
          const varDeclaration = declaration.declarations[0];
          this.commentsList.push({
            filePath: this.filePath,
            fnName: varDeclaration.id.name,
            fnComments: node.leadingComments || [],
          });
        }
        this.parseAST(declaration);
      },
      VariableDeclaration: (node) => {
        const declaration = node.declarations[0];
        if (
          this.isFunctionExpression(declaration) ||
          this.isFunctionCallee(declaration)
        ) {
          this.commentsList.push({
            filePath: this.filePath,
            fnName: declaration.id.name,
            fnComments: node.leadingComments || [],
          });
        }
        if(!declaration.init){
          return
        }
        this.parseAST(declaration.init);
      },
    };
    const handler = nodeHandlers[node.type];
    if (handler) {
      handler(node);
    }
  }

  // 解析文件列表中的每个文件
  async parseVueComments(filePathList) {
    for (const filePath of filePathList) {
      try {
        this.filePath = filePath;
        const fileContent = fs.readFileSync(this.filePath, "utf8");
        const scriptContent = parse(fileContent, {
          sourceType: "module",
          plugins: ["typescript", "jsx"],
        });
        this.parseAST(scriptContent);
      } catch (error) {
        console.error(`Error parsing file: ${filePath}`, error.message);
        // console.error(error);
      }
    }
    this.handleFunction();
  }

  

  // 递归扫描目录，获取所有文件路径
  async scanDirectory(directory) {
    let filePaths = [];
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        filePaths = filePaths.concat(await this.scanDirectory(fullPath));
      } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
        filePaths.push(fullPath);
      }
    }

    return filePaths;
  }
}
// 使用示例
(async () => {
  const parser = new CommentParser();
  const directoryPath = 'D:\\lzjx\\crm-pc-client-web\\src';
  const filePathList = await parser.scanDirectory(directoryPath);
  await parser.parseVueComments(filePathList);
})();