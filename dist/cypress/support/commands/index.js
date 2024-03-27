"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomCommands = void 0;
var login_1 = require("./login");
var registerCustomCommands = function () {
    Cypress.Commands.add("renkuLoginIfRequired", login_1.default);
};
exports.registerCustomCommands = registerCustomCommands;
