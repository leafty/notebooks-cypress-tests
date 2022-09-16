import { basicJupyterTests } from "./tests";

basicJupyterTests(Cypress.env("SESSION_PATH"), Cypress.env("USERNAME"), Cypress.env("PASSWORD"))
