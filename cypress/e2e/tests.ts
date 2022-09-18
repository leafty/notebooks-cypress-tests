import { registerCustomCommands } from "../support/commands";

export const basicJupyterTests = (url_or_path: string, username: string = "", password: string = "") => {
  const url = url_or_path.slice(-1) === "/" ? url_or_path.slice(0, -1) : url_or_path
  describe('Test jupyter notebook', function () {
    before(() => {
      require("cypress-network-idle");
      registerCustomCommands();
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('_oauth2_proxy', "_xsrf")
    })
    it('Successfully loads', function () {
      cy.visit(url).then(() => {
        cy.renkuLoginIfRequired(username, password).then(() => {
          cy.location().should((loc) => {
            expect(loc.toString()).to.include(url)
          });
          // @ts-ignore
          cy.waitForNetworkIdle('GET', `${url}/static/**`, 5000)
          // @ts-ignore
          cy.waitForNetworkIdle('GET', `${url}/extensions/**`, 5000)
        })
      })
    })
    it('Can find launcher icons', function () {
      cy.get('.jp-Launcher-body').should('include.text', 'Notebook').and('include.text', 'Console').and('include.text', 'Other')
    })
    it('Can find main menu at the top', function () {
      cy.get('div#jp-menu-panel').should('include.text', 'File').and('include.text', 'Edit').and('include.text', 'View')
    })
    it('Can launch terminal', function () {
      cy.get('div.jp-LauncherCard[title="Start a new terminal session"]').click().then(() => {
        // @ts-ignore
        cy.waitForNetworkIdle("*", `${url}/api/terminals/**`, 5000)
      }).then(() => {
        cy.get('div.xterm-screen')
      })
    })
    it('Runs a command in the terminal to make new file', function () {
      cy.get('div.xterm-screen').click().type("touch new-file.txt{enter}")
      cy.get('#filebrowser > .jp-Toolbar > :nth-child(4)').click()
      cy.get('.jp-DirListing-content').should("contain.text", "new-file.txt")
    })
    after(() => {
      cy.get('body').then((body) => {
        if (body.find("div.xterm-screen").length == 1) {
          cy.wrap(body.find("div.xterm-screen")[0]).click().type("rm new-file.txt{enter}")
          // @ts-ignore
          cy.waitForNetworkIdle("*", `${url}/api/terminals/**`, 5000)
        }
        for (var closeButton of body.find('#jp-main-dock-panel >* .lm-TabBar-tabCloseIcon').toArray()) {
          cy.wrap(closeButton).click()
        }
      })
    })
  })
}

export const basicRstudioTests = (url_or_path: string, username: string = "", password: string = "") => {
  const url = url_or_path.slice(-1) === "/" ? url_or_path.slice(0, -1) : url_or_path
  describe('Basic functionality', function () {
    before(() => {
      require("cypress-network-idle");
      registerCustomCommands();
    })
    beforeEach(() => {
      Cypress.Cookies.preserveOnce('_oauth2_proxy', "csrf-token", "rs-csrf-token", "user-id", "port-token")
    })
    it('Successfully loads', function () {
      cy.visit(url).then(() => {
        cy.renkuLoginIfRequired(username, password).then((_) => {
          cy.location().should((loc) => {
            expect(loc.toString()).to.include(url)
          });
          // @ts-ignore
          cy.waitForNetworkIdle('GET', `${url}/rstudio/rstudio/**`, 5000)
          // @ts-ignore
          cy.waitForNetworkIdle('POST', `${url}/rstudio/rpc/**`, 5000)
        })
      })
    })
    it('Can find console menu', function () {
      cy.get('#rstudio_workbench_tab_console').should('include.text', 'Console')
      cy.get('#rstudio_workbench_tab_terminal').should('include.text', 'Terminal')
      cy.get(`#rstudio_workbench_tab_jobs`).should('include.text', 'Jobs')
    })
    it('Can find main menu at the top', function () {
      cy.get('.GEL-OVUBKQ').should('include.text', 'File').and('include.text', 'Edit').and('include.text', 'View')
    })
    it('Can launch a terminal', function () {
      cy.get('#rstudio_workbench_tab_terminal').click().then(() => {
        // @ts-ignore
        cy.waitForNetworkIdle('GET', `${url}/rstudio/rstudio/**`, 5000)
        // @ts-ignore
        cy.waitForNetworkIdle('POST', `${url}/rstudio/rpc/**`, 5000)
      }).then(() => {
        cy.get('#rstudio_terminal_dropdown_menubutton').should("include.text", "Terminal")
      })
    })
    it('Runs a command in the terminal to make a new file', function () {
      cy.get('.xterm-cursor-layer').click().type("touch new-file.txt{enter}").then(() => {
        cy.get('#rstudio_tb_refreshfiles').click()
      }).then(() => {
        cy.get('div.GEL-OVUBEDC >* div.GEL-OVUBMH').should("contain.text", "new-file.txt")
      })
    })
    after(() => {
      cy.get('body').then((body) => {
        if (body.find(".xterm-cursor-layer").length == 1) {
          cy.wrap(body.find("div.xterm-screen")[0]).click().type("rm new-file.txt{enter}")
          // @ts-ignore
          cy.waitForNetworkIdle('GET', `${url}/rstudio/rstudio/**`, 5000)
          // @ts-ignore
          cy.waitForNetworkIdle('POST', `${url}/rstudio/rpc/**`, 5000)
        }
        for (var closeButton of body.find('#rstudio_tb_closeterminal').toArray()) {
          cy.wrap(closeButton).click()
        }
        cy.get('#rstudio_workbench_tab_console').click()
      })
    })
  })
}
