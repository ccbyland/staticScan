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
const path = require("path");
const { detectClones } = require("jscpd");
function defineDetectionOptions(targetPath, rule) {
    const options = {
        path: [targetPath],
        minTokens: 100,
        minLines: 10,
        maxLines: 1000,
        silent: true,
    };
    return Object.assign(Object.assign({}, options), rule);
}
function analyze(clones) {
    return clones.map((clone) => {
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
function scan(filePath, rule) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            filePath = filePath.replace(/\\/g, "/");
            const options = defineDetectionOptions(filePath, rule);
            const clones = yield detectClones(options);
            return analyze(clones);
        }
        catch (error) {
            // console.error("检测重复代码时发生错误:", error);
        }
    });
}
module.exports = { scan };
