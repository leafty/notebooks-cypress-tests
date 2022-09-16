import {basicJupyterTests} from "./tests";

describe('Basic functionality', function() {
  basicJupyterTests(Cypress.env("SESSION_PATH"), Cypress.env("USERNAME"), Cypress.env("PASSWORD"))
})
