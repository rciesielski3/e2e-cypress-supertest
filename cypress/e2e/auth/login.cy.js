describe("Login Page Tests", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit("/login"); // ✅ Arrange
  });

  it("should show login form", () => {
    // Arrange
    // Already on login page from beforeEach

    // Act
    // No action needed

    // Assert
    cy.get('input[data-qa="login-email"]').should("exist");
    cy.get('input[data-qa="login-password"]').should("exist");
    cy.get('button[data-qa="login-button"]').should("be.visible");
  });

  it("should show error for wrong credentials", () => {
    // Arrange
    const user = users.invalidUser;

    // Act
    cy.login(user.email, user.password);

    // Assert
    cy.get(".login-form p").should(
      "contain.text",
      "Your email or password is incorrect!"
    );
  });
});
