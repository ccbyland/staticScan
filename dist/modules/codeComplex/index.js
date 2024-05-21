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
exports.scan = void 0;
const fs = require("fs").promises;
const typhonjs = require("typhonjs-escomplex");
const { getTsFiles } = require("../../common");
/**
 * 对指定目录下的 TypeScript 文件进行代码复杂度分析
 * @param {string} dirPath 目录路径
 * @returns {Promise<{ success: Array<{ filePath: string, result: any }>, fail: Array<{ filePath: string, result: string }> }>} 返回一个 Promise，包含成功和失败的分析结果
 */
function scan(dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 获取目录下的所有 TypeScript 文件
            const files = yield getTsFiles(dirPath);
            // 存储分析结果
            const analysisResults = { success: [], fail: [] };
            // 遍历所有文件并进行分析
            for (const filePath of files) {
                // 分析文件
                const result = yield analyze(filePath);
                // 根据分析结果存储到相应的数组中
                if (result.code === 0) {
                    analysisResults.success.push({ filePath, result: result.data });
                }
                else {
                    analysisResults.fail.push({ filePath, result: result.data });
                }
            }
            // 返回分析结果
            return analysisResults;
        }
        catch (error) {
            // 如果出现错误，返回空的成功和失败数组
            return { success: [], fail: [] };
        }
    });
}
exports.scan = scan;
/**
 * 分析指定文件的模块
 * @param {string} filePath 文件路径
 * @returns {Promise<{ code: number, data: any }>} 返回一个 Promise，包含代码解析结果或错误信息
 */
function analyze(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 读取文件内容
            const code = yield fs.readFile(filePath, "utf-8");
            // 使用 typhonjs-analyzeModule 方法分析文件内容
            const data = typhonjs.analyzeModule(code);
            // 从分析结果中提取所需数据
            const { maintainability, dependencies, aggregate, methods } = data;
            // 返回分析结果和成功状态码
            return {
                code: 0,
                data: { maintainability, dependencies, aggregate, methods },
            };
        }
        catch (error) {
            // 如果出现错误，返回错误信息和错误状态码
            return { code: -1, data: error.message };
        }
    });
}
