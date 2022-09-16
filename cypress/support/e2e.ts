/// <reference types="cypress" />
/// <reference types="cypress-network-idle" />
import "cypress-network-idle";
import {registerCustomCommands} from "./commands";

registerCustomCommands();

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test because a random exception in the ui is not handled
  return false
})

declare global {
  namespace Cypress {
    interface Chainable {
      renkuLoginIfRequired(username: string, password: string): Chainable<any>
    }
  }
}
