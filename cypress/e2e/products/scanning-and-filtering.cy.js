describe("Filtering and counting products based on name", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("opens the details of the first product with 'Blue' in its name", () => {
    cy.get(".product-image-wrapper")
      .filter(':contains("Blue")')
      .first()
      .contains("View Product")
      .click();

    cy.url().should("include", "/product_details");
    cy.get(".product-information h2").should("contain.text", "Blue");
  });

  it("counts how many products contain 'dress' in name", () => {
    let count = 0;

    cy.get(".productinfo")
      .each(($el) => {
        if ($el.text().toLowerCase().includes("dress")) {
          count++;
        }
      })
      .then(() => {
        cy.log(`Found ${count} products containing "dress"`);
        expect(count).to.be.greaterThan(0);
      });
  });
});
