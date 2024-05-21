const { spawn } = require("child_process");

function scan(
  entrance: string,
  target: string,
  cwd: string
): Promise<string[] | string[][]> {
  return new Promise((resolve) => {
    const command = "cmd.exe";
    const args = [
      "/c",
      `madge ${entrance} --extensions ts,tsx --ts-config tsConfig.json --webpack-config vite.config.ts ${target} --json`,
    ];

    let outputData: any[] = [];

    const ls = spawn(command, args, { cwd });

    ls.stdout.on("data", (data: any) => {
      outputData.push(data);
    });

    ls.on("close", () => {
      const combinedOutput = Buffer.concat(outputData).toString();
      resolve(JSON.parse(combinedOutput));
    });
  });
}

export { scan };
