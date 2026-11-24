import { generateTestEmail } from "../../support/emailHelper";

describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("shows the login form", () => {
    cy.get('input[data-qa="login-email"]').should("exist");
    cy.get('input[data-qa="login-password"]').should("exist");
    cy.get('button[data-qa="login-button"]').should("be.visible");
  });

  it("shows an error for wrong credentials", () => {
    // A unique, never-registered address: the site is public and shared, so a
    // hard-coded "wrong" address (e.g. wrong@example.com) may be a real account.
    cy.login(generateTestEmail("nobody"), "wrongpass");

    cy.get(".login-form p").should(
      "contain.text",
      "Your email or password is incorrect!"
    );
  });
});
