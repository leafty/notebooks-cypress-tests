# Cypress tests for Jupyter and Rstudio

The main goal of this package is to provide reusable code for testing
the basic functionality of a Jupyter or Rstudio session. This is because
it can happen that a Jupyterlab server seems to be properly up and running
(from the outisde) but it is misconfigured or unusable in some way when
a user accesses the session.

## How to use

The package exposes 3 functions:
- `rstudioTestFuncs`
- `jupyterlabTestFuncs`
- `registerCustomCommands`

The first two are objects that contain functions which in turn execute different
sets of cypress commands and assertions. These could be made into custom cypress commands
but they are currently not. They can simply be imported and used anywhere where cypress is
installed.

The last function registers all the required custom commands used
by the two functions that run the tests.

There are two ways to use this package:
1. Import the functions and incorporate as part of an existing tests
2. Run the Cypress tests directly

## Importing and using the tests

```javascript
import { jupyterlabTestFuncs, rstudioTestFuncs } from renku@notebooks-cypress-tests

describe('Basic Rstudio functionality', function () {
  it('Opens the session', () => { cy.visit() })
  it('Can launch a terminal', rstudioTestFuncs.launchTerminal)
})

describe('Basic Jupyterlab functionality', function () {
  it('Opens the session', () => { cy.visit() })
  it('Can launch a terminal', jupyterlabTestFuncs.launchTerminal)
})
```

Please note that the functions will not navigate to any other page. They will also not handle
any logging in requirements or similar operations. All of this should be done in advance.
For logging in there is a custom command that can do this. So if you wish to use this custom
command then please use the `registerCustomCommands` function before running your tests.
Alternatively you can simply make your own login function as needed.

**Another important aspect** is that both Jupyterlab and Rstudio expect a set of cookies
to be available on the client so that they work properly. So when you run tests on them 
you should ensure these cookies are not cleared after every test. You can refer to the tests
in the `e2e` folder in this repo to see the relevant cookies and how they can be preserved across
different tests.

## Running the cypress tests directly

```bash
TEST_USERNAME=some_username TEST_PASSWORD=XXXXX BASE_URL=http://dev.renku.ch npx cypress open -e SESSION_PATH=/sessions/session_id
```
