import { generateTestEmail } from "../../support/emailHelper";

describe("Subscription on the cart page", () => {
  it("shows a success message after subscribing", () => {
    cy.visit("/view_cart");
    cy.subscribe(generateTestEmail("cart-page"));
  });
});
