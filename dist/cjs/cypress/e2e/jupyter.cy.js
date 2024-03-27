"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("../support/commands");
var jupyterlab_1 = require("../support/commands/jupyterlab");
var username = Cypress.env("USERNAME");
var password = Cypress.env("PASSWORD");
var url_or_path = Cypress.env("SESSION_PATH");
var url = url_or_path.slice(-1) === "/" ? url_or_path.slice(0, -1) : url_or_path;
describe('Test jupyter notebook', function () {
    before(function () {
        (0, commands_1.registerCustomCommands)();
    });
    beforeEach(function () {
        Cypress.Cookies.preserveOnce('_oauth2_proxy', "_xsrf", "session", "ui-server-session");
    });
    it('Successfully loads', function () {
        cy.visit(url);
        cy.renkuLoginIfRequired(username, password);
        jupyterlab_1.testSnippets.findExpectedElements();
    });
    it("Can launch a terminal", jupyterlab_1.testSnippets.launchTerminal);
    it("Can run terminal command to create a file", jupyterlab_1.testSnippets.makeFileWithTerminal("new-file.txt"));
    it("Can remove the file", jupyterlab_1.testSnippets.removeFileWithTerminal("new-file.txt"));
    it("Can close the terminal", jupyterlab_1.testSnippets.closeTerminal);
    it('Can find expected start page elements again', jupyterlab_1.testSnippets.findExpectedElements);
});
