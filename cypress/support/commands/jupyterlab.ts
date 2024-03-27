const findExpectedElements = () => {
  cy.get('.jp-Launcher-body').should("be.visible").should('include.text', 'Notebook').and('include.text', 'Console').and('include.text', 'Other')
  cy.get('div#jp-menu-panel').should("be.visible").should('include.text', 'File').and('include.text', 'Edit').and('include.text', 'View')
  cy.get('.jp-DirListing-content').should("be.visible")
}

const launchTerminal = () => {
  cy.get('div.jp-LauncherCard[title="Start a new terminal session"]').should("be.visible").click()
  cy.get('.jp-Terminal-body').should("be.visible").should('have.attr', 'class').and('contain', 'focus')
  cy.get('.xterm-helper-textarea').should('have.focus')
  cy.get('[role="tablist"]').contains('[role="tab"]',"Terminal").should("be.visible").and("have.attr", "aria-selected", "true")
  cy.wait(1_000)
}

const makeFileWithTerminal = (fname: string) => () => {
  cy.get('.xterm-helper-textarea').click().type(`touch ${fname}{enter}`)
  cy.get('#filebrowser > .jp-Toolbar').find('button[title="Refresh the file browser."]').click();
  cy.get('#filebrowser .jp-DirListing-content').should("be.visible").should("contain.text", "new-file.txt");
}

const removeFileWithTerminal = (fname: string) => () => {
  cy.get('.xterm-helper-textarea').click().type(`rm ${fname}{enter}`)
  cy.get('#filebrowser > .jp-Toolbar').find('button[title="Refresh the file browser."]').click();
  cy.get('#filebrowser .jp-DirListing-content').should("be.visible").should("not.contain.text", "new-file.txt");
}

const closeTerminal = () => {
  cy.get("body").find('#jp-main-dock-panel >* .lm-TabBar-tabCloseIcon').each(($el) => {
    cy.wrap($el).click()
  })
}

export const testSnippets = {
  findExpectedElements,
  launchTerminal,
  makeFileWithTerminal,
  removeFileWithTerminal,
  closeTerminal,
}
