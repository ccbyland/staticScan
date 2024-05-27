const path = require("path");
const codeDepend = require("../modules/codeDepend/index");

export async function initCodeDepend() {
  const baseDir = path.resolve(__dirname, "D:/lzjx/crm-pc-client-web");
  const scanData1: string[][] = await codeDepend.scan(
    path.resolve(baseDir, "./src"),
    "--circular",
    baseDir
  );
  scanData1.forEach((obj: string | string[]) => {
    console.error(obj, obj.length);
  });

  console.error("\n");

  const scanData2: string[][] = await codeDepend.scan(
    path.resolve(baseDir, "./src"),
    "--orphans",
    baseDir
  );
  scanData2.forEach((obj: string | string[]) => {
    console.error(obj);
  });
}
