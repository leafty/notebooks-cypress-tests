"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSnippets = void 0;
var findExpectedElements = function () {
    cy.get(".jp-Launcher-body")
        .should("be.visible")
        .should("include.text", "Notebook")
        .and("include.text", "Console")
        .and("include.text", "Other");
    cy.get("div#jp-menu-panel")
        .should("be.visible")
        .should("include.text", "File")
        .and("include.text", "Edit")
        .and("include.text", "View");
    cy.get(".jp-DirListing-content").should("be.visible");
};
var launchTerminal = function () {
    cy.get('div.jp-LauncherCard[title="Start a new terminal session"]')
        .should("be.visible")
        .click();
    cy.get(".jp-Terminal-body")
        .should("be.visible")
        .should("have.attr", "class")
        .and("contain", "focus");
    cy.get(".xterm-helper-textarea").should("have.focus");
    cy.get('[role="tablist"]')
        .contains('[role="tab"]', "Terminal")
        .should("be.visible")
        .and("have.attr", "aria-selected", "true");
    cy.wait(5000);
};
var makeFileWithTerminal = function (fname) { return function () {
    cy.get(".xterm-helper-textarea").click().type("touch ".concat(fname, "{enter}"));
    cy.get("#filebrowser > .jp-Toolbar")
        .find('button[title="Refresh the file browser."]')
        .click();
    cy.get("#filebrowser .jp-DirListing-content")
        .should("be.visible")
        .should("contain.text", "new-file.txt");
}; };
var removeFileWithTerminal = function (fname) { return function () {
    cy.get(".xterm-helper-textarea").click().type("rm ".concat(fname, "{enter}"));
    cy.get("#filebrowser > .jp-Toolbar")
        .find('button[title="Refresh the file browser."]')
        .click();
    cy.get("#filebrowser .jp-DirListing-content")
        .should("be.visible")
        .should("not.contain.text", "new-file.txt");
}; };
var closeTerminal = function () {
    cy.wait(5000);
    cy.get('[role="tablist"]')
        .contains('[role="tab"]', "Terminal")
        .should("be.visible");
    cy.get("body")
        .find('[role="tablist"] .lm-TabBar-tabCloseIcon')
        .each(function ($el) {
        cy.wrap($el).click({ force: true });
        cy.wait(1000);
    });
};
exports.testSnippets = {
    findExpectedElements: findExpectedElements,
    launchTerminal: launchTerminal,
    makeFileWithTerminal: makeFileWithTerminal,
    removeFileWithTerminal: removeFileWithTerminal,
    closeTerminal: closeTerminal,
};
