describe("All products and product detail page", () => {
  it("displays all products and shows detail page of first product", () => {
    cy.visit("/");

    cy.location("pathname").should("eq", "/");
    cy.get(".shop-menu").should("be.visible");

    cy.contains("Products").click();

    cy.url().should("include", "/products");
    cy.get(".features_items").should("exist");
    cy.get(".product-image-wrapper").should("have.length.greaterThan", 0);

    cy.contains("View Product").first().click();

    cy.url().should("include", "/product_details/");
    cy.get(".product-information").within(() => {
      cy.get("h2").should("exist");
      cy.contains("Category:").should("exist");
      cy.contains("Rs.").should("exist");
      cy.contains("Availability:").should("exist");
      cy.contains("Condition:").should("exist");
      cy.contains("Brand:").should("exist");
    });
  });
});
