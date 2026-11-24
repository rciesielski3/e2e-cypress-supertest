describe("Search result verification and cart modal interaction", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("searches for 'top' and shows matching products", () => {
    cy.searchProduct("top");

    cy.get(".productinfo").first().should("contain.text", "Top");
    cy.url().should("include", "/products");
    cy.title().should("include", "Automation Exercise");
  });

  it("adds the second product to the cart and closes the modal", () => {
    cy.get(".product-image-wrapper")
      .eq(1)
      .find(".productinfo .add-to-cart")
      .click();

    cy.get("#cartModal").should("be.visible");
    cy.contains("#cartModal button", "Continue Shopping").click();
    cy.get("#cartModal").should("not.be.visible");
  });
});
