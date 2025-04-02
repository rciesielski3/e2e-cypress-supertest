describe("Search result verification and cart modal interaction", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("searches for 'top' and confirms product result is displayed", () => {
    // Arrange
    cy.get("#search_product").as("searchInput");

    // Act
    cy.get("@searchInput").type("top");
    cy.get("#submit_search").click();

    // Assert
    cy.get(".productinfo", { timeout: 10000 }).should("exist");
    cy.get(".productinfo").first().should("contain.text", "Top");
    cy.screenshot("search-results");
    cy.title().should("include", "Automation Exercise");
    cy.url().should("include", "/products");
  });

  it("adds second product to cart and closes modal", () => {
    // Act
    cy.get(".product-image-wrapper").eq(1).scrollIntoView();
    cy.contains("Add to cart").eq(1).click({ force: true });

    // Assert
    cy.get("#cartModal").should("be.visible");
    cy.contains("Continue Shopping").click();
    cy.get(".product-image-wrapper").its("length").should("be.gte", 1);
  });
});
