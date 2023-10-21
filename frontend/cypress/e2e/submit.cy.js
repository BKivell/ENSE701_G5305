describe('Submit Page', () => {
    beforeEach(() => {
      // Visit the Submit page
      cy.visit('http://localhost:3000/submit');
    });
  
    it('should have the submission form elements', () => {
      // Check if the form inputs exist
      cy.get('input[name="title"]').should('exist');
      cy.get('input[name="author"]').should('exist');
      cy.get('input[name="date"]').should('exist');
      cy.get('input[name="se_practice"]').should('exist');
      cy.get('input[name="claim"]').should('exist');
      cy.get('input[name="result_of_evidence"]').should('exist');
      cy.get('input[name="type_of_research"]').should('exist');
      cy.get('textarea[name="details"]').should('exist');
      
      // Check if the submit button exists
      cy.get('button').contains('Submit Article').should('exist');
    });
  });
  