"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTasks = void 0;
const vscode_1 = require("vscode");
function runTasks(tasksToRun) {
    tasksToRun.forEach((taskToRun) => {
        vscode_1.tasks.executeTask(taskToRun.task);
    });
}
exports.runTasks = runTasks;
//# sourceMappingURL=run-tasks.js.map