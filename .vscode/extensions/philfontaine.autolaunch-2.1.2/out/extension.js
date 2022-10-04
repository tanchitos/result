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
exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const configurations_to_launch_1 = require("./configurations-to-launch");
const logging_1 = require("./logging");
const launch_configurations_1 = require("./launch-configurations");
const run_tasks_1 = require("./run-tasks");
const tasks_to_run_1 = require("./tasks-to-run");
const yes = 'Yes';
const no = 'No';
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!vscode_1.workspace.workspaceFolders)
            return;
        const availableTasks = yield vscode_1.tasks.fetchTasks();
        vscode_1.workspace.workspaceFolders.forEach((workspaceFolder) => {
            autolaunchWorkspaceTasksAndConfigurations(workspaceFolder, availableTasks);
        });
        const globalPath = path.dirname(path.dirname(context.globalStorageUri.fsPath));
        autolaunchUserTasks(globalPath, availableTasks);
    });
}
exports.activate = activate;
function autolaunchWorkspaceTasksAndConfigurations(workspaceFolder, availableTasks) {
    const mode = vscode_1.workspace.getConfiguration('autolaunch', workspaceFolder).get('mode');
    if (mode === 'auto' || mode === 'prompt') {
        const tasks = (0, tasks_to_run_1.getWorkspaceTasksToRun)(workspaceFolder, availableTasks);
        const configurations = (0, configurations_to_launch_1.getWorkspaceConfigurationsToLaunch)(workspaceFolder);
        if (tasks.length > 0 || configurations.length > 0) {
            if (mode === 'auto') {
                (0, run_tasks_1.runTasks)(tasks);
                (0, launch_configurations_1.launchConfigurations)(configurations);
            }
            else {
                let promptMessage;
                if (tasks.length > 0 && configurations.length > 0) {
                    promptMessage = `Run ${pluralize('task', tasks.length)} [${tasks
                        .map((t) => t.name)
                        .join(', ')}] and launch ${pluralize('configuration', configurations.length)} [${configurations.map((c) => c.name).join(', ')}]`;
                }
                else if (tasks.length > 0) {
                    promptMessage = `Run ${pluralize('task', tasks.length)} [${tasks
                        .map((t) => t.name)
                        .join(', ')}]`;
                }
                else {
                    promptMessage = `Launch ${pluralize('configuration', configurations.length)} [${configurations.map((c) => c.name).join(', ')}]`;
                }
                promptMessage += ` in the workspace folder "${workspaceFolder.name}"?`;
                vscode_1.window.showInformationMessage(promptMessage, yes, no).then((result) => {
                    if (result === yes) {
                        (0, run_tasks_1.runTasks)(tasks);
                        (0, launch_configurations_1.launchConfigurations)(configurations);
                    }
                });
            }
        }
    }
    else if (mode !== 'disabled') {
        (0, logging_1.logErrorUnknownMode)(mode);
    }
}
function autolaunchUserTasks(globalPath, availableTasks) {
    return __awaiter(this, void 0, void 0, function* () {
        const mode = vscode_1.workspace.getConfiguration('autolaunch').get('mode');
        if (mode === 'auto' || mode === 'prompt') {
            const tasks = yield (0, tasks_to_run_1.getUserTasksToRun)(globalPath, availableTasks);
            if (tasks.length > 0) {
                if (mode === 'auto') {
                    (0, run_tasks_1.runTasks)(tasks);
                }
                else {
                    const promptMessage = `Run user ${pluralize('task', tasks.length)} [${tasks
                        .map((t) => t.name)
                        .join(', ')}]?`;
                    vscode_1.window.showInformationMessage(promptMessage, yes, no).then((result) => {
                        if (result === yes) {
                            (0, run_tasks_1.runTasks)(tasks);
                        }
                    });
                }
            }
        }
        else if (mode !== 'disabled') {
            (0, logging_1.logErrorUnknownMode)(mode);
        }
    });
}
function pluralize(word, count) {
    return count > 1 ? word + 's' : word;
}
//# sourceMappingURL=extension.js.map