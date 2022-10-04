"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrorUnknownMode = exports.logErrorLaunchConfigMissingName = exports.logErrorUserTaskMissingLabel = exports.logErrorTaskMissingLabel = void 0;
const vscode_1 = require("vscode");
const outputChannel = vscode_1.window.createOutputChannel('AutoLaunch');
function logErrorTaskMissingLabel() {
    outputChannel.appendLine('[ERROR] tasks.json: the "label" property is required when using "auto": true');
    outputChannel.show(true);
}
exports.logErrorTaskMissingLabel = logErrorTaskMissingLabel;
function logErrorUserTaskMissingLabel() {
    outputChannel.appendLine('[ERROR] User (global) tasks.json: the "label" property is required when using "auto": true');
    outputChannel.show(true);
}
exports.logErrorUserTaskMissingLabel = logErrorUserTaskMissingLabel;
function logErrorLaunchConfigMissingName() {
    outputChannel.appendLine('[ERROR] launch.json: the "name" property is required when using "auto": true');
    outputChannel.show(true);
}
exports.logErrorLaunchConfigMissingName = logErrorLaunchConfigMissingName;
function logErrorUnknownMode(mode) {
    outputChannel.appendLine(`[ERROR] Unknown value "${mode}" for property autolaunch.mode`);
    outputChannel.show(true);
}
exports.logErrorUnknownMode = logErrorUnknownMode;
//# sourceMappingURL=errors.js.map