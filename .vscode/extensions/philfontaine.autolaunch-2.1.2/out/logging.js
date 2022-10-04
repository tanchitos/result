"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrorUnknownMode = exports.logErrorLaunchConfigMissingName = exports.logErrorUserTaskMissingLabel = exports.logErrorTaskMissingLabel = void 0;
const vscode_1 = require("vscode");
const outputChannel = vscode_1.window.createOutputChannel('AutoLaunch');
function logErrorTaskMissingLabel(task) {
    outputChannel.appendLine('[ERROR] tasks.json: the "label" property is missing for the following task:');
    outputChannel.appendLine(JSON.stringify(task, null, 2));
    outputChannel.appendLine('');
    outputChannel.show(true);
}
exports.logErrorTaskMissingLabel = logErrorTaskMissingLabel;
function logErrorUserTaskMissingLabel(task) {
    outputChannel.appendLine('[ERROR] User (global) tasks.json: the "label" property is missing for the following task:');
    outputChannel.appendLine(JSON.stringify(task, null, 2));
    outputChannel.appendLine('');
    outputChannel.show(true);
}
exports.logErrorUserTaskMissingLabel = logErrorUserTaskMissingLabel;
function logErrorLaunchConfigMissingName(configuration) {
    outputChannel.appendLine('[ERROR] launch.json: the "name" property is missing for the following configuration:');
    outputChannel.appendLine(JSON.stringify(configuration, null, 2));
    outputChannel.appendLine('');
    outputChannel.show(true);
}
exports.logErrorLaunchConfigMissingName = logErrorLaunchConfigMissingName;
function logErrorUnknownMode(mode) {
    outputChannel.appendLine(`[ERROR] Unknown value "${mode}" for property autolaunch.mode`);
    outputChannel.show(true);
}
exports.logErrorUnknownMode = logErrorUnknownMode;
//# sourceMappingURL=logging.js.map