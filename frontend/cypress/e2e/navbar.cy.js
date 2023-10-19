// cypress/e2e/navbar.cy.js

/*
This file tests the navigation between pages using the Navbar. Tests that each button directs you to the correct page.

*/

describe('Navbar E2E Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/'); // Assuming your app's home page is at '/'
    });
  
    it('should navigate to different pages when links are clicked', () => {
      // Test the "Moderator" link
      cy.contains('Moderator').click();
      cy.url().should('include', '/moderator');
  
      // Go back to the home page
      cy.go('back');
      cy.url().should('not.include', '/moderator');
  
      // Test the "Admin Operational Preferences" link
      cy.contains('Admin Operational Preferences').click();
      cy.url().should('include', '/operationalPreferences');
  
      // Go back to the home page
      cy.go('back');
      cy.url().should('not.include', '/operationalPreferences');
  
      // Test the "Submit Article" link
      cy.contains('Submit Article').click();
      cy.url().should('include', '/submit');
  
      // Go back to the home page
      cy.go('back');
      cy.url().should('not.include', '/submit');
  
      // Test the "Login / Sign Up" link
      cy.contains('Login / Sign Up').click();
      cy.url().should('include', '/login');
    });
  });
  