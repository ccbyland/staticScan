// const path = require("path");
// const { parse } = require("@babel/parser");
// const generate = require("@babel/generator").default;
// const fs = require("fs");
// const t = require("@babel/types");

// class CommentParser {
//   constructor() {
//     this.commentsList = [];
//     this.filePath = "";
//     this.ast = null;
//   }

//   isFunctionExpression(declaration) {
//     const { init } = declaration;
//     const type = init && init.type;
//     return type === "FunctionExpression" || type === "ArrowFunctionExpression";
//   }

//   isUseCallback(declaration) {
//     const { init } = declaration;
//     if (!init) return false;
//     const { callee } = init;
//     return callee && callee.name === "useCallback";
//   }

//   async handleFunction() {
//     for (const { node, filePath, fnName, fnComments } of this.commentsList) {
//       if (fnComments.length > 0) {
//         const comments = fnComments
//           .map(comment => comment.value.trim().split("\n").map(line => line.trim().replace(/^\*+\s*/, "")).filter(str => str.includes("@ump|")))
//           .flat();

//         if (comments.length > 0) {
//           const reportComment = comments[0];
//           console.error(`【${filePath}】`, `【${fnName}】`, reportComment);

//           if (reportComment) {
//             const { body } = node.body;
//             const bCallExpression = t.expressionStatement(t.callExpression(t.identifier("window.ggggggggggg"), []));
//             body.unshift(bCallExpression);
//             const { code: newCode } = generate(this.ast);
//             fs.writeFileSync(filePath, newCode);
//           }
//         }
//       }
//     }
//   }

//   parseAST(node) {
//     const nodeHandlers = {
//       File: node => node.program.body.forEach(n => this.parseAST(n)),
//       ExportDefaultDeclaration: node => {
//         const { declaration } = node;
//         if (!declaration) return;
//         const { type } = declaration;
//         if (type === "FunctionDeclaration" || type === "VariableDeclaration") {
//           const fnName = type === "FunctionDeclaration" ? declaration.id.name : declaration.declarations[0].id.name;
//           this.commentsList.push({ node, filePath: this.filePath, fnName, fnComments: node.leadingComments || [] });
//         }
//         this.parseAST(declaration);
//       },
//       FunctionDeclaration: node => {
//         const { id, leadingComments, body } = node;
//         const fnName = id.name;
//         this.commentsList.push({ node, filePath: this.filePath, fnName, fnComments: leadingComments || [] });
//         body.body.forEach(n => this.parseAST(n));
//       },
//       VariableDeclaration: node => {
//         const { declarations, leadingComments } = node;
//         const declaration = declarations[0];
//         if (this.isFunctionExpression(declaration) || this.isUseCallback(declaration)) {
//           const fnName = declaration.id.name;
//           this.commentsList.push({ node: declaration.init, filePath: this.filePath, fnName, fnComments: leadingComments || [] });
//         }
//         if (declaration.init) this.parseAST(declaration.init);
//       },
//     };

//     const handler = nodeHandlers[node.type];
//     if (handler) handler(node);
//   }

//   async parseVueComments(filePathList) {
//     for (const filePath of filePathList) {
//       try {
//         this.commentsList = [];
//         this.filePath = filePath;
//         this.ast = parse(fs.readFileSync(this.filePath, "utf8"), { sourceType: "module", plugins: ["typescript", "jsx"] });
//         this.parseAST(this.ast);
//         await this.handleFunction();
//       } catch (error) {
//         // console.error(`解析文件出错：${filePath}`, error.message);
//       }
//     }
//   }

//   async scanDirectory(directory) {
//     let filePaths = [];
//     const entries = fs.readdirSync(directory, { withFileTypes: true });

//     for (const entry of entries) {
//       const fullPath = path.join(directory, entry.name);
//       if (entry.isDirectory()) {
//         filePaths = filePaths.concat(await this.scanDirectory(fullPath));
//       } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
//         filePaths.push(fullPath);
//       }
//     }

//     return filePaths;
//   }
// }

// (async () => {
//   const parser = new CommentParser();
//   const directoryPath = "D:\\lzjx\\crm-pc-client-web\\src";
//   const filePathList = await parser.scanDirectory(directoryPath);
//   await parser.parseVueComments(filePathList);
// })();
