const path = require("path");
const codeRepetition = require("../modules/codeRepetition/index");

export async function initCodeRepetitionScan() {
  const baseDir = path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src");
  const scanData: ICodeRepetitionData[] = await codeRepetition.scan(baseDir, {
    minTokens: 100,
    minLines: 10,
    maxLines: 1000,
  });

  scanData.forEach((obj: ICodeRepetitionData) => {
    console.error("\n");
    console.error(obj.fileA.filePath, obj.fileA.codeRange);
    console.error(obj.fileB.filePath, obj.fileB.codeRange);
  });
}