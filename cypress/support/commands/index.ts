import login from "./login"

export const registerCustomCommands = () => {
  Cypress.Commands.add("renkuLoginIfRequired", login)
}

declare global {
  namespace Cypress {
    interface Chainable {
      renkuLoginIfRequired(username: string, password: string): Chainable<any>
    }
  }
}
