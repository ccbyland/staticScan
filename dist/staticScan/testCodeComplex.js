"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCodeComplex = void 0;
const path = require("path");
const codeComplex = require("../modules/codeComplex/index");
function initCodeComplex() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseDir = path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src");
        const scanData = yield codeComplex.scan(baseDir);
        scanData.success.forEach((obj) => {
            const { methods } = obj.result;
            console.log(obj.filePath);
            methods.forEach((method) => {
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
    });
}
exports.initCodeComplex = initCodeComplex;
