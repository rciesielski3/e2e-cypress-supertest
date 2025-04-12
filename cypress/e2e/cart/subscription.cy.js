describe("AutomationExercise - Verify Subscription in Cart Page", () => {
  it("should verify successful subscription message on cart page", () => {
    // Arrange
    cy.visit("/view_cart");

    // Act
    cy.scrollTo("bottom");

    // Assert
    cy.contains("Subscription", { matchCase: false }).should("be.visible");

    // Arrange
    const testEmail = generateTestEmail("cart-page");

    // Act
    cy.get("#susbscribe_email").type(testEmail);
    cy.get("#subscribe").click();

    // Assert
    cy.contains("You have been successfully subscribed!").should("be.visible");
  });
});
