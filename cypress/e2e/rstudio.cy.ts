import { basicRstudioTests } from "./tests";

basicRstudioTests(Cypress.env("SESSION_PATH"), Cypress.env("USERNAME"), Cypress.env("PASSWORD"))
