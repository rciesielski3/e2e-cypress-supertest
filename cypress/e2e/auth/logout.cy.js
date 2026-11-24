describe("User logout flow", () => {
  let user;

  before(() => {
    // Pre-created account from env, or a disposable one (see README).
    cy.ensureTestUser().then((u) => {
      user = u;
    });
  });

  after(() => {
    cy.cleanupTestUser(user);
  });

  it("logs in with valid credentials and logs out successfully", () => {
    cy.login(user.email, user.password);
    cy.contains("Logged in as").should("be.visible");

    cy.contains("Logout").click();

    cy.url().should("include", "/login");
    cy.get(".login-form h2").should("contain.text", "Login to your account");
  });
});
