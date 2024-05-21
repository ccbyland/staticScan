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
exports.initCodeRepetitionScan = void 0;
const path = require("path");
const codeRepetition = require("../modules/codeRepetition/index");
function initCodeRepetitionScan() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseDir = path.resolve(__dirname, "D:/lzjx/crm-pc-client-web/src");
        const scanData = yield codeRepetition.scan(baseDir, {
            minTokens: 100,
            minLines: 10,
            maxLines: 1000,
        });
        scanData.forEach((obj) => {
            console.error("\n");
            console.error(obj.fileA.filePath, obj.fileA.codeRange);
            console.error(obj.fileB.filePath, obj.fileB.codeRange);
        });
    });
}
exports.initCodeRepetitionScan = initCodeRepetitionScan;
