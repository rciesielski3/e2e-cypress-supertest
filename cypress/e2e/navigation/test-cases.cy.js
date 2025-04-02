describe("Test cases page navigation", () => {
  it("navigates to Test Cases page from homepage", () => {
    // Arrange
    cy.visit("/");

    // Assert
    cy.url().should("eq", "https://automationexercise.com/");
    cy.get(".shop-menu").should("be.visible");

    // Act
    cy.contains("Test Cases").click();

    // Assert
    cy.url().should("include", "/test_cases");
    cy.get(".title").should("contain.text", "Test Cases");
  });
});
