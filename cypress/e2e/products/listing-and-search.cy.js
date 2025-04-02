describe("Product listing and search results", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("displays product cards in listing view", () => {
    // Assert
    cy.get(".product-image-wrapper").should("have.length.greaterThan", 0);
  });

  it("filters product list by keyword 'dress'", () => {
    // Act
    cy.get("#search_product").type("dress");
    cy.get("#submit_search").click();

    // Assert
    cy.get(".productinfo").should("contain.text", "Dress");
  });
});
