describe("User signup flow", () => {
  const randomEmail = `user_${Date.now()}@example.com`;

  beforeEach(() => {
    cy.visit("/login"); // ✅ Arrange
  });

  it("registers a new user successfully", () => {
    // Arrange
    const userData = {
      name: "New User",
      email: randomEmail,
      password: "securepass123",
      firstName: "New",
      lastName: "User",
      address: "123 Cypress Street",
      state: "Test State",
      city: "Test City",
      zipcode: "12345",
      mobile: "1234567890",
      dob: { day: "10", month: "June", year: "1990" },
    };

    // Act
    cy.get('[data-qa="signup-name"]').type(userData.name);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.url().should("include", "/signup");

    cy.get("#id_gender1").check();
    cy.get("#password").type(userData.password);
    cy.get("#days").select(userData.dob.day);
    cy.get("#months").select(userData.dob.month);
    cy.get("#years").select(userData.dob.year);
    cy.get("#first_name").type(userData.firstName);
    cy.get("#last_name").type(userData.lastName);
    cy.get("#address1").type(userData.address);
    cy.get("#state").type(userData.state);
    cy.get("#city").type(userData.city);
    cy.get("#zipcode").type(userData.zipcode);
    cy.get("#mobile_number").type(userData.mobile);
    cy.get('[data-qa="create-account"]').click();

    // Assert
    cy.get("h2").should("contain.text", "Account Created!");
  });
});
