const path = require("path");
const { detectClones } = require("jscpd");

function defineDetectionOptions(targetPath: string, rule: IRepetitionRule) {
  const options = {
    path: [targetPath],
    minTokens: 100,
    minLines: 10,
    maxLines: 1000,
    silent: true,
  };
  return { ...options, ...rule };
}

function analyze(clones: any[]): ICodeRepetitionData[] {
  return clones.map((clone: IClones) => {
    const { duplicationA, duplicationB } = clone;
    return {
      fileA: {
        filePath: duplicationA.sourceId,
        codeRange: [duplicationA.start, duplicationA.end],
      },
      fileB: {
        filePath: duplicationB.sourceId,
        codeRange: [duplicationB.start, duplicationB.end],
      },
    };
  });
}

async function scan(filePath: string, rule: IRepetitionRule) {
  try {
    filePath = filePath.replace(/\\/g, "/")
    const options = defineDetectionOptions(filePath, rule);
    const clones = await detectClones(options);
    return analyze(clones);
  } catch (error) {
    // console.error("检测重复代码时发生错误:", error);
  }
}

module.exports = { scan };
