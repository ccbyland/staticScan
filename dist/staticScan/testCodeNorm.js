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
exports.initCodeNormScan = void 0;
const path = require("path");
const codeNorm = require("../modules/codeNorm/index");
function initCodeNormScan() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseDir = path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src");
        const scanData = yield codeNorm.scan(baseDir, ["ts", "tsx"], ["no-console"]);
        scanData.forEach((obj) => {
            const { filePath } = obj;
            // console.error("\n", filePath);
            obj.messages.forEach((messsage) => {
                const { ruleId, severity, line, column } = messsage;
                // console.error(ruleId, severity, line, column);
            });
        });
    });
}
exports.initCodeNormScan = initCodeNormScan;
