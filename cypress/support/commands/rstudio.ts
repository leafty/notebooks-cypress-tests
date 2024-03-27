const findExpectedElements = () => {
  cy.get("#rstudio_workbench_tab_console").should("include.text", "Console");
  cy.get("#rstudio_workbench_tab_terminal").should("include.text", "Terminal");
  cy.get("#rstudio_workbench_tab_background_jobs").should(
    "include.text",
    "Background Jobs"
  );
  cy.get('[aria-label="Main menu and toolbar"]')
    .should("include.text", "File")
    .and("include.text", "Edit")
    .and("include.text", "View");
  cy.get("#rstudio_workbench_panel_files").should("contain.html", "table");
  cy.get("#rstudio_workbench_panel_files")
    .find("tbody")
    .first()
    .should("be.visible")
    .should("not.be.empty")
    .find("td")
    .first()
    .should("be.visible")
    .should("not.be.empty")
    .next()
    .should("be.visible")
    .should("not.be.empty");
  cy.contains(".rstudio-HyperlinkLabel", "Home")
    .should("be.visible")
    .should("not.be.empty");
};

const launchTerminal = () => {
  cy.get("#rstudio_workbench_tab_terminal").click();
  cy.get("#rstudio_terminal_dropdown_menubutton").should(
    "include.text",
    "Terminal"
  );
  cy.get("#rstudio_workbench_panel_terminal")
    .should("be.visible")
    .should("not.be.empty");
  cy.get(".xterm-helper-textarea").should("have.focus");
};

const makeFileWithTerminal = (fname: string) => () => {
  cy.get("#rstudio_workbench_tab_terminal").click();
  cy.get("#rstudio_workbench_panel_terminal").should("be.visible");
  cy.get(".xterm-helper-textarea")
    .click({ force: true })
    .type(`touch ${fname}{enter}`, { force: true });
  cy.get("#rstudio_tb_refreshfiles").click();
  cy.get('[aria-label="Files"]')
    .find("table tr")
    .contains(fname)
    .should("be.visible");
};

const removeFileWithTerminal = (fname: string) => () => {
  cy.get("#rstudio_workbench_tab_terminal").click();
  cy.get("#rstudio_workbench_panel_terminal").should("be.visible");
  cy.get(".xterm-helper-textarea")
    .click({ force: true })
    .type(`rm ${fname}{enter}`, { force: true });
  cy.get("#rstudio_tb_refreshfiles").click();
  cy.get('[aria-label="Files"]')
    .find("table tr")
    .contains(fname)
    .should("not.exist");
};

const closeTerminal = () => {
  cy.get("body")
    .find("#rstudio_tb_closeterminal")
    .each(($el, _, __) => {
      cy.wrap($el).click({ force: true });
    });
  cy.get("#rstudio_workbench_tab_console")
    .click()
    .should("have.attr", "class")
    .and("contain", "selected");
};

export const testSnippets = {
  findExpectedElements,
  launchTerminal,
  makeFileWithTerminal,
  removeFileWithTerminal,
  closeTerminal,
};
