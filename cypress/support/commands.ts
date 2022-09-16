export const registerCustomCommands = () => {
  Cypress.Commands.add("renkuLoginIfRequired", (username: string, password: string) => {
    cy.url().then((url) => {
      if (url.includes("realms/Renku/protocol/openid-connect")) {
        cy.get("#username").type(username)
        cy.get("#password").type(password)
        cy.get('#kc-login').click()
      }
    })
  })
}
