// moderator.spec.js
describe('Moderator View Test', () => {
    before(() => {
      cy.visit('http://localhost:3000/moderator');
    });
  
    it('should load the page and fetch articles', () => {
      // Verify that the page title is displayed
      cy.contains('SPEED Moderator View').should('be.visible');
  
      // Verify that the "All Articles" title is displayed
      cy.contains('All Articles').should('be.visible');
  
    });
  });
  