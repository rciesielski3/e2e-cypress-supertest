import { generateTestEmail } from "./emailHelper";

/**
 * Credentials of the pre-created test account.
 * Supplied via CYPRESS_USER_EMAIL / CYPRESS_USER_PASSWORD (GitHub secrets in CI).
 * Returns null when they are not set.
 */
const envCredentials = () => {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");
  return email && password ? { email, password } : null;
};

/** Fill the registration form for `user` and finish on the "Account Created!" page. */
Cypress.Commands.add("registerUser", (user) => {
  cy.visit("/login");
  cy.get('[data-qa="signup-name"]').type(user.name);
  cy.get('[data-qa="signup-email"]').type(user.email);
  cy.get('[data-qa="signup-button"]').click();
  cy.url().should("include", "/signup");

  cy.get("#id_gender1").check();
  cy.get("#password").type(user.password, { log: false });
  cy.get("#days").select("10");
  cy.get("#months").select("June");
  cy.get("#years").select("1990");
  cy.get("#first_name").type(user.firstName);
  cy.get("#last_name").type(user.lastName);
  cy.get("#address1").type("123 Cypress Street");
  cy.get("#state").type("Test State");
  cy.get("#city").type("Test City");
  cy.get("#zipcode").type("12345");
  cy.get("#mobile_number").type("1234567890");
  cy.get('[data-qa="create-account"]').click();
  cy.get('[data-qa="account-created"]').should("be.visible");
});

/** Log in through the login page. */
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password, { log: false });
  cy.get('button[data-qa="login-button"]').click();
});

/**
 * Yields credentials of a usable account.
 * - CYPRESS_USER_EMAIL / CYPRESS_USER_PASSWORD set: yields them, creates nothing.
 * - otherwise (fallback): registers a disposable user on the public site and
 *   yields it. Pair with cy.cleanupTestUser() to delete it again.
 */
Cypress.Commands.add("ensureTestUser", () => {
  const fromEnv = envCredentials();
  if (fromEnv) {
    return cy.wrap({ ...fromEnv, disposable: false }, { log: false });
  }
  const user = {
    name: "Disposable User",
    firstName: "Disposable",
    lastName: "User",
    email: generateTestEmail("e2e_user"),
    password: `Pw_${Date.now()}`,
    disposable: true,
  };
  cy.registerUser(user);
  return cy.wrap(user, { log: false });
});

/** Delete a disposable account created by ensureTestUser(); no-op for env accounts. */
Cypress.Commands.add("cleanupTestUser", (user) => {
  if (!user || !user.disposable) return;
  cy.login(user.email, user.password);
  cy.visit("/delete_account");
  cy.get('[data-qa="account-deleted"]').should("be.visible");
});

/** Subscribe via the footer form of the current page. */
Cypress.Commands.add("subscribe", (email) => {
  cy.scrollTo("bottom");
  cy.contains("Subscription", { matchCase: false }).should("be.visible");
  cy.get("#susbscribe_email").type(email); // sic: the site's id is misspelled
  cy.get("#subscribe").click();
  cy.contains("You have been successfully subscribed!").should("be.visible");
});

/** Search the products page for `term`. Expects to be on /products. */
Cypress.Commands.add("searchProduct", (term) => {
  cy.get("#search_product").type(term);
  cy.get("#submit_search").click();
  cy.contains("Searched Products").should("be.visible");
});
