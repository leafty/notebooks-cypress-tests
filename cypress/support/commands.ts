export const registerCustomCommands = () => {
  Cypress.Commands.add("renkuLoginIfRequired", (username: string, password: string) => {
    cy.url().then((url) => {
      if (url.includes("realms/Renku/protocol/openid-connect") && username.length > 0 && password.length > 0) {
        cy.get("#username").type(username)
        cy.get("#password").type(password)
        cy.get('#kc-login').click()
      }
    })
  })
}
declare global {
  namespace Cypress {
    interface Chainable {
      renkuLoginIfRequired(username: string, password: string): Chainable<any>
    }
  }
}
