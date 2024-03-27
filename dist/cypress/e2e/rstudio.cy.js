"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("../support/commands");
var rstudio_1 = require("../support/commands/rstudio");
var username = Cypress.env("USERNAME");
var password = Cypress.env("PASSWORD");
var url_or_path = Cypress.env("SESSION_PATH");
var url = url_or_path.slice(-1) === "/" ? url_or_path.slice(0, -1) : url_or_path;
describe('Basic Rstudio functionality', function () {
    before(function () {
        (0, commands_1.registerCustomCommands)();
    });
    beforeEach(function () {
        Cypress.Cookies.preserveOnce('_oauth2_proxy', "csrf-token", "rs-csrf-token", "user-id", "port-token", "session", "ui-server-session");
    });
    it('Successfully loads', function () {
        cy.visit(url);
        cy.renkuLoginIfRequired(username, password);
        rstudio_1.testSnippets.findExpectedElements();
    });
    it('Can launch a terminal', rstudio_1.testSnippets.launchTerminal);
    it('Can run terminal command to create a file', rstudio_1.testSnippets.makeFileWithTerminal("new-file.txt"));
    it('Can remove the file', rstudio_1.testSnippets.removeFileWithTerminal("new-file.txt"));
    it('Can close the terminal', rstudio_1.testSnippets.closeTerminal);
    it('Can find expected start page elements again', rstudio_1.testSnippets.findExpectedElements);
});
