const fs = require("fs");
const t = require("@babel/types");
const generate = require("@babel/generator").default;

/**
 * 处理注释解析器中的函数，并在符合条件时修改 AST。
 * @param {Object} commentParser - 注释解析器对象。
 */
async function commentToFunction(commentParser) {
  for (const { node, filePath, fnName, fnComments } of commentParser.commentsList) {
    if (fnComments.length > 0) {
      const comments = processComments(fnComments);

      if (comments.length > 0) {
        const reportComment = comments[0];
        if (reportComment) {
          insertCallExpression(node, reportComment);
          updateFile(commentParser.ast, filePath);
        }
      }
    }
  }
}

/**
 * 处理注释并提取相关信息。
 * @param {Array} fnComments - 注释数组。
 * @returns {Array} - 包含符合条件的注释数组。
 */
function processComments(fnComments) {
  return fnComments
    .flatMap(comment => 
      comment.value
        .trim()
        .split("\n")
        .map(line => line.trim().replace(/^\*+\s*/, ""))
        .filter(str => str.includes("@ump|"))
    );
}

/**
 * 格式化字符串为对象。
 * @param {string} str - 字符串。
 * @returns {Object} - 格式化后的对象。
 */
function formattedString(str) {
  const result = {};
  str.split("&").forEach(pair => {
    const [key, value] = pair.split(":");
    result[key] = value;
  });
  return result;
}

/**
 * 在函数体的开头插入一个调用表达式。
 * @param {Object} node - AST 节点。
 * @param {string} reportComment - 处理后的注释字符串。
 */
function insertCallExpression(node, reportComment) {
  const [umpTag, eventType = "", eventName = "", eventParam = "", channel = ""] = reportComment.split("|");
  const params = formattedString(eventParam);
  const channels = channel.split('&');

  const callExpression = t.expressionStatement(
    t.callExpression(
      t.identifier(`window.__HB_UMP__('${eventType}', '${eventName}', ${JSON.stringify(params).replace(/"\$\{([^}]+)\}"/g, '$1')}, ${JSON.stringify(channels)})`),
      []
    )
  );

  node.body.body.unshift(callExpression);
}

/**
 * 生成并将更新后的代码写入文件。
 * @param {Object} ast - 代码的 AST。
 * @param {string} filePath - 要写入更新代码的文件路径。
 */
function updateFile(ast, filePath) {
  const { code: newCode } = generate(ast);
  fs.writeFileSync(filePath, newCode);
}

module.exports = { commentToFunction };
