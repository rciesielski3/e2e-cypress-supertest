describe("Homepage content display", () => {
  it("shows navigation bar and home menu item", () => {
    cy.visit("/");


    cy.get(".shop-menu > .nav").should("be.visible");
    cy.get(".nav").should("contain.text", "Home");
  });

  it("shows product category section in sidebar", () => {
    cy.visit("/");

    cy.get(".left-sidebar").should("contain.text", "Category");
  });
});
