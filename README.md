# e2e-cypress-supertest

[![CI](https://github.com/rciesielski3/e2e-cypress-supertest/actions/workflows/ci.yml/badge.svg)](https://github.com/rciesielski3/e2e-cypress-supertest/actions/workflows/ci.yml)

End-to-end test suites for two public demo systems:

- **UI** - [Cypress](https://www.cypress.io) tests for [automationexercise.com](https://automationexercise.com), organised by feature.
- **API** - [Jest](https://jestjs.io) + [Supertest](https://github.com/ladjs/supertest) tests for [dummyjson.com](https://dummyjson.com).

## Important: the systems under test are public

Nothing is started locally. Both targets are third-party sites shared with everybody, so:

- they can be slow, return 503 / "queue full" under load, change markup, or treat CI runner IPs differently from your machine. The Cypress config retries failed tests (`retries.runMode: 2`) and status-code failures, and blocks ad hosts, to reduce noise; a red run is not always a code problem.
- data is shared. Never assume an address like `wrong@example.com` is unregistered (it is a real account on the site). Tests use unique generated addresses, and tests that register accounts delete them again.

## Quick start

```bash
npm ci
npm test          # API tests, then UI tests (headless)
```

Requires Node 22.

## Scripts

| Script                    | What it does                                  |
| ------------------------- | --------------------------------------------- |
| `npm test`                | `test:api` followed by `test:ui:headless`     |
| `npm run test:api`        | Jest + Supertest API tests                    |
| `npm run test:ui`         | Opens the Cypress GUI                         |
| `npm run test:ui:headless`| Runs all Cypress specs headless               |

Run a single spec: `npx cypress run --spec cypress/e2e/auth/login.cy.js`

## Configuration

| Variable                | Used by | Purpose                                                              | Default                |
| ----------------------- | ------- | -------------------------------------------------------------------- | ---------------------- |
| `API_BASE_URL`          | API     | Base URL of the API under test                                       | `https://dummyjson.com` |
| `CYPRESS_USER_EMAIL`    | UI      | Email of a pre-created automationexercise.com account                | unset (see below)      |
| `CYPRESS_USER_PASSWORD` | UI      | Password of that account                                             | unset (see below)      |

### Test account (UI)

Specs that need a logged-in user (`auth/logout.cy.js`) use one pre-created account so the suite does not create users on every run.

1. Register an account once, by hand, at <https://automationexercise.com/login>.
2. Locally: `export CYPRESS_USER_EMAIL=... CYPRESS_USER_PASSWORD=...` (or put them in `cypress.env.json`, which you should not commit).
3. In CI: add repository secrets `CYPRESS_USER_EMAIL` and `CYPRESS_USER_PASSWORD`.

**Fallback:** only when these variables are unset, the suite registers a disposable user for the run and deletes it afterwards. This works without any setup but creates and removes an account on the public site each run.

`cypress/e2e/auth/signup.cy.js` is the registration test; it always registers (and deletes) a throwaway user, independent of the variables above.

## API tests

`tests/api/` contains one file per resource, all using the client in `tests/api/client.js`:

- `products.test.js` - list shape and fields, pagination (`limit`/`skip`), single product, search, 404 for an unknown id
- `users.test.js` - user shape, 404 for an unknown id
- `auth.test.js` - login with wrong credentials (400), login with DummyJSON's documented demo account returning tokens that work on `/auth/me`, `/auth/me` without a token (401)

## UI tests

Shared steps live in custom commands (`cypress/support/commands.js`): `cy.login`, `cy.registerUser`, `cy.ensureTestUser` / `cy.cleanupTestUser`, `cy.subscribe`, `cy.searchProduct`. Test data helpers are in `cypress/support/emailHelper.js`; the upload fixture is `cypress/fixtures/example.json`.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs **on demand only** (Actions tab, "CI", "Run workflow", or `gh workflow run ci.yml`). Jobs:

- `api` - Node 22, `npm ci`, `npm run test:api`
- `ui` - Cypress via `cypress-io/github-action@v6` on Chrome; screenshots and videos are uploaded as artifacts when it fails. It is intended as a non-required check because it depends on a public site. Secrets `CYPRESS_USER_EMAIL` / `CYPRESS_USER_PASSWORD` are passed as env when configured.

## Project layout

```
.github/workflows/ci.yml
cypress.config.js
jest.config.js
package.json
cypress/
  e2e/
    auth/         login.cy.js  logout.cy.js  signup.cy.js
    cart/         interaction.cy.js  subscription.cy.js
    form/         submission.cy.js
    homepage/     homepage.cy.js  subscription.cy.js
    navigation/   test-cases.cy.js
    products/     listing-and-search.cy.js  products-and-details.cy.js
                  scanning-and-filtering.cy.js  search-and-modal.cy.js
  fixtures/       example.json
  support/        commands.js  e2e.js  emailHelper.js
tests/
  api/            auth.test.js  client.js  products.test.js  users.test.js
```

## License

ISC
