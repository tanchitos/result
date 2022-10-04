"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchConfigurations = void 0;
const vscode_1 = require("vscode");
function launchConfigurations(configurationsToLaunch) {
    configurationsToLaunch.forEach((configurationToLaunch) => {
        vscode_1.debug.startDebugging(configurationToLaunch.workspaceFolder, configurationToLaunch.name);
    });
}
exports.launchConfigurations = launchConfigurations;
//# sourceMappingURL=launch-configurations.js.map