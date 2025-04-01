describe("Homepage content display", () => {
  it("shows navigation bar and home menu item", () => {
    // Arrange
    cy.visit("/");

    // Act
    // No action required

    // Assert
    cy.get(".shop-menu > .nav").should("be.visible");
    cy.get(".nav").should("contain.text", "Home");
  });

  it("shows product category section in sidebar", () => {
    // Arrange
    cy.visit("/");

    // Assert
    cy.get(".left-sidebar").should("contain.text", "Category");
  });
});
