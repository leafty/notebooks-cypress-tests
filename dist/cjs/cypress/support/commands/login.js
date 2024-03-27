"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
exports.default = (function (username, password) {
    cy.url().then(function (url) {
        if (url.includes("realms/Renku/protocol/openid-connect") && username.length > 0 && password.length > 0) {
            cy.get("#username").type(username);
            cy.get("#password").type(password);
            cy.get('#kc-login').click();
        }
    });
});
function validateLogin(username, password) {
    cy.url().then(function (url) {
        if (url.includes("realms/Renku/protocol/openid-connect") &&
            username.length > 0 &&
            password.length > 0) {
            return false;
        }
    });
}
exports.validateLogin = validateLogin;
