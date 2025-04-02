export const loginAsTestUser = () => {
  cy.login("test@example.com", "123456");
};
