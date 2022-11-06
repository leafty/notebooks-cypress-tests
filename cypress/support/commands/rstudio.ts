const findExpectedElements = () => {
  cy.get('#rstudio_workbench_tab_console').should('include.text', 'Console')
  cy.get('#rstudio_workbench_tab_terminal').should('include.text', 'Terminal')
  cy.get(`#rstudio_workbench_tab_jobs`).should('include.text', 'Jobs')
  cy.get('.GEL-OVUBKQ').should('include.text', 'File').and('include.text', 'Edit').and('include.text', 'View')
  cy.get('#rstudio_workbench_panel_files').should("contain.html", "table")
  cy.get('#rstudio_workbench_panel_files').find("tbody")
    .first().should("be.visible").should("not.be.empty").find("td")
    .first().should("be.visible").should("not.be.empty")
    .next().should("be.visible").should("not.be.empty")
  cy.get(':nth-child(3) > .rstudio-HyperlinkLabel').should("be.visible").should("not.be.empty")
}

const launchTerminal = () => {
  cy.get('#rstudio_workbench_tab_terminal').click()
  cy.get('#rstudio_terminal_dropdown_menubutton').should("include.text", "Terminal")
  cy.get(':nth-child(6) > .GEL-OVUBNT').should("be.visible").should("not.be.empty")
  cy.get('.xterm-helper-textarea').should("have.focus")
  // The terminal is in a html canvas element so I cannot check its contents/state easily 
  // the wait makes sure the canvas has fully rendered
  cy.wait(5000)
}

const makeFileWithTerminal = (fname: string) => () => {
  cy.get('.xterm-helper-textarea').click().type(`touch ${fname}{enter}`)
  cy.get('#rstudio_tb_refreshfiles').click()
  cy.get('div.GEL-OVUBEDC >* div.GEL-OVUBMH').should("contain.text", fname)
}

const removeFileWithTerminal = (fname: string) => () => {
  cy.get('.xterm-helper-textarea').click().type(`rm ${fname}{enter}`)
  cy.get('#rstudio_tb_refreshfiles').click()
  cy.get('div.GEL-OVUBEDC >* div.GEL-OVUBMH').should("not.contain.text", fname)
}

const closeTerminal = () => {
  cy.get("body").find('#rstudio_tb_closeterminal').each(($el, _, __) => {
    cy.wrap($el).click()
  })
  cy.get('#rstudio_workbench_tab_console').click().should('have.attr', 'class').and('contain', 'selected')
}

export const testSnippets = {
  findExpectedElements,
  launchTerminal,
  makeFileWithTerminal,
  removeFileWithTerminal,
  closeTerminal,
}
