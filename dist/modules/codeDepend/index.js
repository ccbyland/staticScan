"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scan = void 0;
const { spawn } = require("child_process");
function scan(entrance, target, cwd) {
    return new Promise((resolve) => {
        const command = "cmd.exe";
        const args = [
            "/c",
            `madge ${entrance} --extensions ts,tsx --ts-config tsConfig.json --webpack-config vite.config.ts ${target} --json`,
        ];
        let outputData = [];
        const ls = spawn(command, args, { cwd });
        ls.stdout.on("data", (data) => {
            outputData.push(data);
        });
        ls.on("close", () => {
            const combinedOutput = Buffer.concat(outputData).toString();
            resolve(JSON.parse(combinedOutput));
        });
    });
}
exports.scan = scan;
