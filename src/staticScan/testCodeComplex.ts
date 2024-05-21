const path = require("path");
const codeComplex = require("../modules/codeComplex/index");

export async function initCodeComplex() {
  const baseDir = path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src");
  const scanData = await codeComplex.scan(baseDir);

  scanData.success.forEach((obj: any) => {
    const { methods } = obj.result;
    console.log(obj.filePath);
    methods.forEach((method: any) => {
      if (!/^<anon method-\d+>$/.test(method.name)) {
        console.log("方法名称:", method.name);
        console.log("参数个数:", method.paramCount);
        console.log("圈复杂度:", method.cyclomatic);
        console.log("物理行数:", method.sloc.physical);
        console.log("代码可读性:", method.halstead.difficulty);
      }
    });
    console.log("\n");
  });
}
