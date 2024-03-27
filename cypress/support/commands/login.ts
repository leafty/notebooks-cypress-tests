export default (username: string, password: string) => {
  cy.url().then((url) => {
    if (url.includes("realms/Renku/protocol/openid-connect") && username.length > 0 && password.length > 0) {
      cy.get("#username").type(username)
      cy.get("#password").type(password)
      cy.get('#kc-login').click()
    }
  })
}

export function validateLogin(username: string, password: string) {
  cy.url().then((url) => {
    if (
      url.includes("realms/Renku/protocol/openid-connect") &&
      username.length > 0 &&
      password.length > 0
    ) {
      return false;
    }
  });
}
