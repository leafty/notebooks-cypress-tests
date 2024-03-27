/// <reference types="cypress" />
Cypress.on('uncaught:exception', function (err, runnable) {
    // returning false here prevents Cypress from
    // failing the test because a random exception in the ui is not handled
    return false;
});
