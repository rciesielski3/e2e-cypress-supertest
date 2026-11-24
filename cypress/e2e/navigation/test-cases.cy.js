describe("Test cases page navigation", () => {
  it("navigates to the Test Cases page from the homepage", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get(".shop-menu").should("be.visible");

    cy.contains("Test Cases").click();

    cy.url().should("include", "/test_cases");
    cy.get(".title").should("contain.text", "Test Cases");
  });
});
