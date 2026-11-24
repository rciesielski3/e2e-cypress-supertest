import { generateTestEmail } from "../../support/emailHelper";

describe("Subscription on the home page", () => {
  it("shows a success message after subscribing", () => {
    cy.visit("/");
    cy.subscribe(generateTestEmail("home-page"));
  });
});
