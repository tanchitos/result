"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspaceConfigurationsToLaunch = void 0;
const vscode_1 = require("vscode");
const logging_1 = require("./logging");
function getWorkspaceConfigurationsToLaunch(workspaceFolder) {
    const configurationsToLaunch = [];
    const configurations = vscode_1.workspace.getConfiguration('launch', workspaceFolder).get('configurations');
    if (Array.isArray(configurations)) {
        configurations.forEach((configuration) => {
            if (configuration.auto === true) {
                const name = configuration.name;
                if (typeof name !== 'string') {
                    (0, logging_1.logErrorLaunchConfigMissingName)(configuration);
                    return;
                }
                configurationsToLaunch.push({ name, workspaceFolder });
            }
        });
    }
    return configurationsToLaunch;
}
exports.getWorkspaceConfigurationsToLaunch = getWorkspaceConfigurationsToLaunch;
//# sourceMappingURL=configurations-to-launch.js.map