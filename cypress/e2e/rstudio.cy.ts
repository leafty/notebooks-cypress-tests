import { registerCustomCommands } from "../support/commands"
import { testSnippets } from "../support/commands/rstudio";

const username = Cypress.env("USERNAME")
const password = Cypress.env("PASSWORD")
const url_or_path = Cypress.env("SESSION_PATH")
const url = url_or_path.slice(-1) === "/" ? url_or_path.slice(0, -1) : url_or_path

describe('Basic Rstudio functionality', () => {
  before(() => {
    registerCustomCommands();
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_oauth2_proxy', "csrf-token", "rs-csrf-token", "user-id", "port-token", "session", "ui-server-session")
  })
  it('Successfully loads', () => {
    cy.visit(url)
    cy.renkuLoginIfRequired(username, password)
    testSnippets.findExpectedElements()
  })
  it('Can launch a terminal', testSnippets.launchTerminal)
  it('Can run terminal command to create a file', testSnippets.makeFileWithTerminal("new-file.txt"))
  it('Can remove the file', testSnippets.removeFileWithTerminal("new-file.txt"))
  it('Can close the terminal', testSnippets.closeTerminal)
  it('Can find expected start page elements again', testSnippets.findExpectedElements)
})
