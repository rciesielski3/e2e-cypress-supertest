describe("User logout flow", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  it("logs in with valid credentials and logs out successfully", () => {
    // Arrange
    const user = users.validUser;

    // Act
    cy.visit("/");
    cy.get(".shop-menu a[href='/login']").click();
    cy.get(".login-form h2").should("contain.text", "Login to your account");
    cy.get("input[data-qa='login-email']").type(user.email);
    cy.get("input[data-qa='login-password']").type(user.password);
    cy.get("button[data-qa='login-button']").click();

    // Assert
    cy.contains("Logged in as").should("be.visible");

    // Act
    cy.contains("Logout").click();

    // Assert
    cy.url().should("include", "/login");
    cy.get(".login-form h2").should("contain.text", "Login to your account");
  });
});
