"use strict";
// const { initCodeNormScan } = require("./test/testCodeNorm");
// const { initCodeRepetitionScan } = require("./test/testCodeRepetition");
// const { initCodeDepend } = require("./test/testCodeDepend");
const { initCodeComplex } = require("./test/testCodeComplex");
// initCodeNormScan();
// initCodeRepetitionScan();
// initCodeDepend();
initCodeComplex();
// const path = require("path");
// const codeNorm = require("./modules/codeNorm/index");
// async function initCodeNormScan() {
//   const baseDir = path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src");
//   const scanData = await codeNorm.scan(baseDir, ["ts", "tsx"], ["no-console"]);
//   const analyzeData: IAnalyzeData[] = codeNorm.analyze(scanData);
//   analyzeData.forEach((obj: IAnalyzeData) => {
//     const { filePath } = obj;
//     console.error("\n", filePath);
//     obj.messages.forEach((messsage) => {
//       const { ruleId, severity, line, column } = messsage;
//       console.error(ruleId, severity, line, column);
//     });
//   });
// }
// initCodeNormScan();
// const path = require("path");
// const { escomplex } = require("./modules/codeComplex");
// const { detectDuplicateCode } = require("./modules/codeRepetition");
// const { analyzeMadge } = require("./modules/codeDepend");
// const { lintFiles } = require("./modules/codeNorm");
// let a = 0
// let b = 0
// async function getEscomplexByDetail(filePath) {
//   const escomplexData = await escomplex(filePath);
//   /**
//    * 维护性评分列表
//    * 维护性评分越高，表示代码的复杂性和维护难度越大；维护性评分越低，表示代码的复杂性和维护难度越小。
//    */
//   console.error("\n", "【详细评测】");
//   console.error("\n", "【文件路径】", filePath);
//   const { result } = escomplexData.success[0];
//   // 输出维护性评分
//   console.log("\n--- 维护性评分 ---");
//   console.log("维护性评分:", result.maintainability);
//   // 输出依赖项信息
//   console.log("\n--- 依赖项信息 ---");
//   result.dependencies.forEach((dep) => {
//     console.log(`依赖路径: ${dep.path}, 类型: ${dep.type}, 行号: ${dep.line}`);
//   });
//   // 整体分析结果
//   console.log("\n--- 整体分析结果 ---");
//   const aggregate = result.aggregate;
//   console.log("逻辑行数:", aggregate.sloc.logical);
//   console.log("物理行数:", aggregate.sloc.physical);
//   console.log("参数数量:", aggregate.paramCount);
//   console.log("圈复杂度:", aggregate.cyclomatic);
//   console.log("圈复杂度密度:", aggregate.cyclomaticDensity);
//   console.log("哈斯特德度量:");
//   console.log("  - 代码长度:", aggregate.halstead.length.toFixed(2));
//   console.log("  - 代码词汇量:", aggregate.halstead.vocabulary.toFixed(2));
//   console.log("  - 代码难度:", aggregate.halstead.difficulty.toFixed(2));
//   console.log("  - 代码体积:", aggregate.halstead.volume.toFixed(2));
//   console.log("  - 代码工作量:", aggregate.halstead.effort.toFixed(2));
//   // 详细分析结果
//   console.log("\n--- 详细分析结果 ---");
//   result.methods.forEach((method) => {
//     // 过滤掉匿名方法
//     if (!/^<anon method-\d+>$/.test(method.name)) {
//       console.log("方法名称:", method.name);
//       console.log("逻辑行数:", method.sloc.logical);
//       console.log("物理行数:", method.sloc.physical);
//       console.log("参数数量:", method.paramCount);
//       console.log("圈复杂度:", method.cyclomatic);
//       console.log("圈复杂度密度:", method.cyclomaticDensity);
//       console.log("哈斯特德度量:");
//       console.log("  - 代码长度:", method.halstead.length.toFixed(2));
//       console.log("  - 代码词汇量:", method.halstead.vocabulary.toFixed(2));
//       console.log("  - 代码难度:", method.halstead.difficulty.toFixed(2));
//       console.log("  - 代码体积:", method.halstead.volume.toFixed(2));
//       console.log("  - 代码工作量:", method.halstead.effort.toFixed(2));
//       console.log("\n------");
//     }
//   });
// }
// async function getEscomplexByDetail2(filePath, result) {
//   /**
//    * 维护性评分列表
//    * 维护性评分越高，表示代码的复杂性和维护难度越大；维护性评分越低，表示代码的复杂性和维护难度越小。
//    */
//   // console.error("\n", "【详细评测】");
//   // const { result } = escomplexData.success[0];
//   // // 输出维护性评分
//   // console.log("\n--- 维护性评分 ---");
//   // console.log("维护性评分:", result.maintainability);
//   // // 输出依赖项信息
//   // console.log("\n--- 依赖项信息 ---");
//   // result.dependencies.forEach((dep) => {
//   //   console.log(`依赖路径: ${dep.path}, 类型: ${dep.type}, 行号: ${dep.line}`);
//   // });
//   // 整体分析结果
//   // console.log("\n--- 整体分析结果 ---");
//   // const aggregate = result.aggregate;
//   // console.log("逻辑行数:", aggregate.sloc.logical);
//   // console.log("物理行数:", aggregate.sloc.physical);
//   // console.log("参数数量:", aggregate.paramCount);
//   // console.log("圈复杂度:", aggregate.cyclomatic);
//   // console.log("圈复杂度密度:", aggregate.cyclomaticDensity);
//   // console.log("哈斯特德度量:");
//   // console.log("  - 代码长度:", aggregate.halstead.length.toFixed(2));
//   // console.log("  - 代码词汇量:", aggregate.halstead.vocabulary.toFixed(2));
//   // console.log("  - 代码难度:", aggregate.halstead.difficulty.toFixed(2));
//   // console.log("  - 代码体积:", aggregate.halstead.volume.toFixed(2));
//   // console.log("  - 代码工作量:", aggregate.halstead.effort.toFixed(2));
//   // 详细分析结果
//   // console.log("\n--- 详细分析结果 ---");
//   result.methods.forEach((method) => {
//     // console.log(method);
//     // console.log(method.cyclomatic);
//   //   // 过滤掉匿名方法
//     if (!/^<anon method-\d+>$/.test(method.name)) {
//       if(method.sloc.physical > 300){
//         console.error(filePath.replace('D:\\lzjx\\', ''));
//         // console.log(method.name);
//         // console.log(method.sloc.physical);
//         a++
//       }else{
//         b++
//       }
//   //     // console.log("逻辑行数:", method.sloc.logical);
//   //     // console.log("物理行数:", method.sloc.physical);
//   //     // console.log("参数数量:", method.paramCount);
//   //     // console.log("圈复杂度密度:", method.cyclomaticDensity);
//   //     // console.log("哈斯特德度量:");
//   //     // console.log("  - 代码长度:", method.halstead.length.toFixed(2));
//   //     // console.log("  - 代码词汇量:", method.halstead.vocabulary.toFixed(2));
//   //     // console.log("  - 代码难度:", method.halstead.difficulty.toFixed(2));
//   //     // console.log("  - 代码体积:", method.halstead.volume.toFixed(2));
//   //     // console.log("  - 代码工作量:", method.halstead.effort.toFixed(2));
//     }
//   });
// }
// async function runEscomplex() {
//   const escomplexData = await escomplex(
//     path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src")
//   );
//   /**
//    * 维护性评分列表
//    * 维护性评分越高，表示代码的复杂性和维护难度越大；维护性评分越低，表示代码的复杂性和维护难度越小。
//    */
//   // console.error("\n", "【全量评测】");
//   // console.error(
//   //   "\n",
//   //   "维护性评分越低，表示代码的复杂性和维护难度越小；反之则相反",
//   //   "\n"
//   // );
//   escomplexData.success
//     // .sort((a, b) => a.result.maintainability - b.result.maintainability)
//     .forEach((obj) => {
//       getEscomplexByDetail2(obj.filePath, obj.result);
//     });
//     console.log((a/(a+b)).toFixed(6));
//   // await getEscomplexByDetail(path.resolve(escomplexData.success[0].filePath));
// }
// async function runJscpd() {
//   const list = await detectDuplicateCode(
//     path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src").replace(/\\/g, "/")
//   );
//   // console.error("\n", "【重复代码】", "\n", list.length);
//   list.forEach((obj, index) => {
//     console.error(obj.目标内容.replace('D:/lzjx/', ''));
//   });
// }
// async function runMadge() {
//   const dir = "D:/lzjx/crm-pc-client-web";
//   const circular = await analyzeMadge({
//     cwd: path.resolve(dir),
//     entrance: path.resolve(dir, "./src"),
//     target: "--circular",
//   });
//   console.error("\n", "【循环依赖】");
//   circular
//     .sort((a, b) => b.length - a.length)
//     .forEach((obj) => {
//       // console.error(obj);
//       // obj.length < 6 && console.error(obj.length);
//     });
//   console.error("\n", "【无用文件】");
//   const orphans = await analyzeMadge({
//     cwd: path.resolve(dir),
//     entrance: path.resolve(dir, "./src"),
//     target: "--orphans",
//   });
//   orphans.forEach((obj) => {
//     console.error(obj);
//   });
// }
// async function runEslint() {
//   const results = await lintFiles(
//     path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src")
//   );
//   results.forEach((fileResult) => {
//     if (fileResult.warningCount === 0) {
//       return;
//     }
//     // console.log("\n");
//     // console.log(
//     //   `【文件路径】${fileResult.filePath} 【命中数量】${fileResult.warningCount} `
//     // );
//     console.log(fileResult.filePath.replace('D:\\lzjx\\', ''));
//     // console.log(fileResult.warningCount);
//     const arr = []
//     fileResult.messages.forEach((message) => {
//       if (message.severity === 2) {
//         return;
//       }
//       arr.push(
//         `${message.line}行${message.column}列`
//       );
//     });
//     // console.log(arr.join('、'));
//   });
// }
// async function init() {
//   // await runEscomplex();
//   // await runMadge();
//   await runEslint();
//   // await runJscpd();
//   process.exit(); // 强制退出程序
// }
// init();
