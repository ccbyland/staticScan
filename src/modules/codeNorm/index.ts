const { ESLint } = require("eslint");
const path = require("path");
const glob = require("glob");

// 创建带有自定义规则的 ESLint 实例的函数
const createESLintInstance = (ruleArr: string[]) => {
  // 从数组中创建规则对象
  const rules: Record<string, string> = ruleArr.reduce((a, b) => {
    return { ...a, [b]: "warn" };
  }, {});

  // ESLint 配置覆盖
  const overrideConfig = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    parserOptions: {
      sourceType: "module",
    },
    env: {
      es2022: true,
      browser: true,
      node: true,
    },
    rules,
  };

  // 创建并返回 ESLint 实例
  return new ESLint({
    useEslintrc: false,
    overrideConfig: { ...overrideConfig, rules },
  });
};

// 在目录中使用 ESLint 扫描文件的函数
const scan = async (
  dirPath: string,
  extensions: string[] = ["ts", "tsx"],
  rules: string[] = [
    "no-redeclare",
    "no-empty",
    "no-duplicate-imports",
    "no-await-in-loop",
  ]
) => {
  // 格式化扩展名
  const formattedExtensions = extensions.map((ext) =>
    ext.startsWith(".") ? ext : `.${ext}`
  );

  // 生成文件匹配模式
  const patterns = formattedExtensions.map((ext) =>
    path.join(dirPath, `**/*${ext}`)
  );

  // 查找所有与模式匹配的文件
  const filePaths = patterns.reduce((a, b) => {
    return a.concat(glob.sync(b));
  }, []);

  // 创建 ESLint 实例
  const eslint = createESLintInstance(rules);

  // 对文件进行 lint
  const data = await eslint.lintFiles(filePaths);

  return analyze(data);
};

// 分析扫描数据的函数
const analyze = (scanData: IScanData[] = []) => {
  const result: IAnalyzeData[] = [];

  // 处理每个扫描结果
  scanData.forEach((obj: IScanData) => {
    const { filePath, warningCount, messages } = obj;

    // 如果没有警告，则跳过
    if (warningCount === 0) {
      return;
    }

    // 否则，将其添加到结果中
    result.push({
      filePath,
      messages: messages.map((message: IMessage) => {
        const { ruleId, severity, line, column } = message;
        return { ruleId, severity, line, column };
      }),
    });
  });

  return result;
};

// 导出函数
export = { scan };
