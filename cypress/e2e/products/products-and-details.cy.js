describe("All products and product detail page", () => {
  it("displays all products and shows detail page of first product", () => {
    // Arrange
    cy.visit("/");

    // Assert
    cy.url().should("eq", "https://automationexercise.com/");
    cy.get(".shop-menu").should("be.visible");

    // Act
    cy.contains("Products").click();

    // Assert
    cy.url().should("include", "/products");
    cy.get(".features_items").should("exist");
    cy.get(".product-image-wrapper").should("have.length.greaterThan", 0);

    // Act
    cy.contains("View Product").first().click();

    // Assert
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
