import { generateTestEmail } from "../../support/emailHelper";

// This is THE registration test: it creates a throwaway account on the public
// site and deletes it again, so repeated runs leave no data behind.
describe("User registration", () => {
  it("registers a new user and deletes the account afterwards", () => {
    const user = {
      name: "New User",
      firstName: "New",
      lastName: "User",
      email: generateTestEmail("signup"),
      password: `Pw_${Date.now()}`,
    };

    cy.registerUser(user);
    cy.get("h2").should("contain.text", "Account Created!");

    cy.get('[data-qa="continue-button"]').click();
    cy.contains("Logged in as").should("be.visible");

    cy.visit("/delete_account");
    cy.get('[data-qa="account-deleted"]').should("be.visible");
  });
});
