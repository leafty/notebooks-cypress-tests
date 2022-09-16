# Cypress tests for Jupyter and Rstudio

The main goal of this package is to provide reusable code for testing
the basic functionality of a Jupyter or Rstudio sessions. This is because
it can happen that a Jupyterlab server seems to be properly up and running
(from the outisde) but it is misconfigured or unusable in some way when
a user accesses the session.

## How to use

The package exposes 3 functions:
- `basicJupyterTests`
- `basicRstudioTests`

The first two simply execute a Mocha test suite. They can be inserted in an
existing Mocha test suite in an existing Cypress test spec.

The last function registers all the required custom commands used
by the two functions that run the tests.

There are two ways to use this package:
1. Import the functions and incorporate as part of an existing tests
2. Run the Cypress tests directly

## Importing and using the tests

```javascript
import { basicJupyterTests, basicRstudioTests } from renku@notebooks-cypress-tests

describe('Basic Rstudio functionality', function () {
  basicJupyterTests(session_url)
})

describe('Basic Rstudio functionality', function () {
  basicRstudioTests(session_url)
})
```

The functions also optionally accept a username and password to log in to Renku
if a login is required.

## Running the cypress tests directly

```bash
TEST_USERNAME=some_username TEST_PASSWORD=XXXXX BASE_URL=http://dev.renku.ch npx cypress open -e SESSION_PATH=/sessions/session_id
```
