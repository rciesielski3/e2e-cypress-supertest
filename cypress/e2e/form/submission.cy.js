describe("Contact form submission", () => {
  beforeEach(() => {
    cy.visit("/contact_us");
  });

  it("submits the contact form with valid data and a file upload", () => {
    // Fields can be briefly disabled/unresponsive while the page boots.
    cy.get('[data-qa="name"]').should("be.enabled").type("Test User");
    cy.get('[data-qa="email"]').should("be.enabled").type("tester@example.com");
    cy.get('[data-qa="subject"]').type("Cypress Inquiry");
    cy.get('[data-qa="message"]').type("This is a test message.");
    cy.get('input[type="file"]').attachFile("example.json");
    cy.get('[data-qa="submit-button"]').click();

    cy.get(".status.alert-success").should(
      "contain.text",
      "Success! Your details have been submitted successfully."
    );
  });
});
