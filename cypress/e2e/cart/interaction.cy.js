describe("Add to cart flow", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("adds first product to cart and verifies it in cart page", () => {
    // Arrange
    const expectedProductName = "Blue Top";

    // Act
    cy.get(".product-image-wrapper").first().scrollIntoView();
    cy.contains("Add to cart").first().click({ force: true });
    cy.get("#cartModal").should("be.visible");
    cy.contains("View Cart").click({ force: true });

    // Assert
    cy.url().should("include", "/view_cart");
    cy.get(".cart_description").should("contain.text", expectedProductName);
  });
});
