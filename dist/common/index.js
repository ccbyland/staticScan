"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getTsFiles = void 0;
const path = __importStar(require("path"));
const fs_1 = require("fs");
/**
 * 递归获取指定目录下的所有 TypeScript 文件
 * @param {string} dir 目录路径
 * @returns {Promise<Array<string>>} 返回一个 Promise，包含目录下所有的 TypeScript 文件路径数组
 */
function getTsFiles(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const stat = yield fs_1.promises.stat(dir);
        if (!stat.isDirectory()) {
            return [dir];
        }
        const files = [];
        // 递归遍历目录下的所有文件，将 TypeScript 文件路径添加到 files 数组中
        yield walk(dir, (filePath) => __awaiter(this, void 0, void 0, function* () {
            if (isTsFile(filePath)) {
                files.push(filePath);
            }
        }));
        // 返回文件路径数组
        return files;
    });
}
exports.getTsFiles = getTsFiles;
/**
 * 递归遍历指定目录下的所有文件和子目录
 * @param {string} dir 目录路径
 * @param {Function} fileCallback 处理文件的回调函数
 * @returns {Promise<void>} 返回一个 Promise，表示遍历完成
 */
function walk(dir, fileCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.promises.readdir(dir);
        // 对目录下的所有文件和子目录进行处理
        yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
            const filePath = path.join(dir, file);
            const stat = yield fs_1.promises.stat(filePath);
            if (stat.isDirectory()) {
                // 如果是子目录，则递归遍历
                yield walk(filePath, fileCallback);
            }
            else {
                // 如果是文件，则调用回调函数处理
                yield fileCallback(filePath);
            }
        })));
    });
}
/**
 * 检查文件是否为 TypeScript 文件
 * @param {string} filePath 文件路径
 * @returns {boolean} 如果是 TypeScript 文件，则返回 true，否则返回 false
 */
function isTsFile(filePath) {
    return filePath.endsWith(".ts") || filePath.endsWith(".tsx");
}
