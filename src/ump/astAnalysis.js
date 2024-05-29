/**
 * 检查是否为函数表达式或 useCallback。
 * @param {Object} declaration - 变量声明对象。
 * @returns {boolean} - 如果是函数表达式、箭头函数表达式或 useCallback 函数，返回 true；否则返回 false。
 */
function isFunctionOrUseCallback(declaration) {
  const { init } = declaration;
  const type = init?.type;
  return (
    type === "FunctionExpression" ||
    type === "ArrowFunctionExpression" ||
    (type === "CallExpression" && init.callee?.name === "useCallback")
  );
}

/**
 * 解析 AST 并收集函数信息。
 * @param {Object} node - AST 节点。
 * @param {Object} commentParser - 注释解析器对象。
 */
function parseAST(node, commentParser) {
  const nodeHandlers = {
    File: node => node.program.body.forEach(n => parseAST(n, commentParser)),
    ExportDefaultDeclaration: node => handleExportDefaultDeclaration(node, commentParser),
    FunctionDeclaration: node => handleFunctionDeclaration(node, commentParser),
    VariableDeclaration: node => handleVariableDeclaration(node, commentParser),
  };

  const handler = nodeHandlers[node.type];
  if (handler) handler(node);
}

/**
 * 处理导出默认声明节点。
 * @param {Object} node - AST 节点。
 * @param {Object} commentParser - 注释解析器对象。
 */
function handleExportDefaultDeclaration(node, commentParser) {
  const { declaration } = node;
  if (!declaration) return;
  const { type } = declaration;
  if (type === "FunctionDeclaration" || type === "VariableDeclaration") {
    const fnName = type === "FunctionDeclaration" ? declaration.id.name : declaration.declarations[0].id.name;
    commentParser.commentsList.push({
      node,
      filePath: commentParser.filePath,
      fnName,
      fnComments: node.leadingComments || [],
    });
  }
  parseAST(declaration, commentParser);
}

/**
 * 处理函数声明节点。
 * @param {Object} node - AST 节点。
 * @param {Object} commentParser - 注释解析器对象。
 */
function handleFunctionDeclaration(node, commentParser) {
  const { id, leadingComments, body } = node;
  const fnName = id.name;
  commentParser.commentsList.push({
    node,
    filePath: commentParser.filePath,
    fnName,
    fnComments: leadingComments || [],
  });
  body.body.forEach(n => parseAST(n, commentParser));
}

/**
 * 处理变量声明节点。
 * @param {Object} node - AST 节点。
 * @param {Object} commentParser - 注释解析器对象。
 */
function handleVariableDeclaration(node, commentParser) {
  const { declarations, leadingComments } = node;
  const declaration = declarations[0];
  if (isFunctionOrUseCallback(declaration)) {
    const fnName = declaration.id.name;
    commentParser.commentsList.push({
      node: declaration.init,
      filePath: commentParser.filePath,
      fnName,
      fnComments: leadingComments || [],
    });
  }
  if (declaration.init) parseAST(declaration.init, commentParser);
}

module.exports = { parseAST };
