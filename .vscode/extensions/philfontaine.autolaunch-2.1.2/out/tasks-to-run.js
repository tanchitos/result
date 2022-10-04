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
exports.getUserTasksToRun = exports.getWorkspaceTasksToRun = void 0;
const fs = require("fs");
const JSON5 = require("json5");
const path = require("path");
const vscode_1 = require("vscode");
const logging_1 = require("./logging");
function getWorkspaceTasksToRun(workspaceFolder, availableTasks) {
    const tasksToRun = [];
    const taskDefinitions = vscode_1.workspace.getConfiguration('tasks', workspaceFolder).get('tasks');
    if (Array.isArray(taskDefinitions)) {
        taskDefinitions.forEach((taskDefinition) => {
            if (taskDefinition.auto === true) {
                const name = taskDefinition.label || taskDefinition.taskName;
                if (typeof name !== 'string') {
                    (0, logging_1.logErrorTaskMissingLabel)(taskDefinition);
                    return;
                }
                const task = availableTasks.find((task) => task.name === name &&
                    typeof task.scope === 'object' &&
                    task.scope.name === workspaceFolder.name);
                if (task) {
                    tasksToRun.push({ name, task });
                }
            }
        });
    }
    return tasksToRun;
}
exports.getWorkspaceTasksToRun = getWorkspaceTasksToRun;
function getUserTasksToRun(globalPath, availableTasks) {
    return __awaiter(this, void 0, void 0, function* () {
        const tasksToRun = [];
        const tasksFile = path.join(globalPath, 'tasks.json');
        const taskDefinitions = yield new Promise((resolve) => {
            fs.readFile(tasksFile, 'utf8', (err, data) => {
                if (err) {
                    resolve(undefined);
                }
                else {
                    try {
                        const json = JSON5.parse(data);
                        resolve(json === null || json === void 0 ? void 0 : json.tasks);
                    }
                    catch (error) {
                        resolve(undefined);
                    }
                }
            });
        });
        if (Array.isArray(taskDefinitions)) {
            taskDefinitions.forEach((taskDefinition) => {
                if (taskDefinition.auto === true) {
                    const name = taskDefinition.label || taskDefinition.taskName;
                    if (typeof name !== 'string') {
                        (0, logging_1.logErrorUserTaskMissingLabel)(taskDefinition);
                        return;
                    }
                    const task = availableTasks.find((task) => task.name === name && task.scope === vscode_1.TaskScope.Workspace);
                    if (task) {
                        tasksToRun.push({ name, task });
                    }
                }
            });
        }
        return tasksToRun;
    });
}
exports.getUserTasksToRun = getUserTasksToRun;
//# sourceMappingURL=tasks-to-run.js.map