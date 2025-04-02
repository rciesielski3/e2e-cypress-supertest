describe("Contact form submission", () => {
  let users;

  before(() => {
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit("/contact_us");
  });

  it("submits contact form with valid data and file upload", () => {
    // Arrange
    const contactUser = users.validUser;

    // Act
    cy.get('[data-qa="name"]').type("Test User");
    cy.get('[data-qa="email"]').type(contactUser.email);
    cy.get('[data-qa="subject"]').type("Cypress Inquiry");
    cy.get('[data-qa="message"]').type("This is a test message.");
    cy.get('input[type="file"]').attachFile("example.json");
    cy.get('[data-qa="submit-button"]').click();

    // Assert
    cy.get(".status.alert-success").should(
      "contain.text",
      "Success! Your details have been submitted successfully."
    );
  });
});
