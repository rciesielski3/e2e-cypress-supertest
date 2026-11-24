describe("Product listing and search results", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("displays product cards in listing view", () => {
    cy.get(".product-image-wrapper").should("have.length.greaterThan", 0);
  });

  it("filters the product list by keyword 'dress'", () => {
    cy.searchProduct("dress");

    cy.get(".productinfo").should("contain.text", "Dress");
  });
});
