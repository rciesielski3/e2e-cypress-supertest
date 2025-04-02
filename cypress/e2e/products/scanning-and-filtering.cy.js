describe("Filtering and counting products based on name", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("navigates to first product with name containing 'Blue'", () => {
    // Act & Assert
    cy.get(".productinfo").each(($el) => {
      const productText = $el.text().toLowerCase();

      if (productText.includes("Blue")) {
        cy.wrap($el).click();
        cy.url().should("include", "/product_details");
        return false;
      }
    });
  });

  it("counts how many products contain 'dress' in name", () => {
    let count = 0;

    // Act
    cy.get(".productinfo")
      .each(($el) => {
        if ($el.text().toLowerCase().includes("dress")) {
          count++;
        }
      })
      .then(() => {
        // Assert
        cy.log(`Found ${count} products containing "dress"`);
        expect(count).to.be.greaterThan(0);
      });
  });
});
