const path = require("path");
const codeNorm = require("../modules/codeNorm/index");

export async function initCodeNormScan() {
  const baseDir = path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src");
  const scanData = await codeNorm.scan(baseDir, ["ts", "tsx"], ["no-console"]);

  scanData.forEach((obj: IAnalyzeData) => {
    const { filePath } = obj;
    console.error("\n", filePath);
    obj.messages.forEach((messsage) => {
      const { ruleId, severity, line, column } = messsage;
      console.error(ruleId, severity, line, column);
    });
  });
}