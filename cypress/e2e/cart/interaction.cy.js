describe("Add to cart flow", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("adds the first product to the cart and shows it in the cart page", () => {
    cy.get(".product-image-wrapper")
      .first()
      .find(".productinfo .add-to-cart")
      .click();
    cy.get("#cartModal").should("be.visible");
    cy.contains("#cartModal a", "View Cart").click();

    cy.url().should("include", "/view_cart");
    cy.get(".cart_description").should("contain.text", "Blue Top");
  });
});
