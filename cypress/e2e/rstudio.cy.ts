import {basicRstudioTests} from "./tests";

describe('Basic functionality', function () {
  basicRstudioTests(Cypress.env("SESSION_PATH"), Cypress.env("USERNAME"), Cypress.env("PASSWORD"))
})
