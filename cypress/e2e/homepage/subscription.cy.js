describe("AutomationExercise - Verify Subscription in Home Page", () => {
  it("should verify successful subscription message", () => {
    // Arrange
    cy.visit("/");

    // Act
    cy.scrollTo("bottom");

    //  Assert
    cy.contains("Subscription", { matchCase: false }).should("be.visible");

    //  Arrange
    const testEmail = `test_${Date.now()}@example.com`;

    //  Act
    cy.get("#susbscribe_email").type(testEmail);

    cy.get("#subscribe").click();

    //  Assert
    cy.contains("You have been successfully subscribed!").should("be.visible");
  });
});
