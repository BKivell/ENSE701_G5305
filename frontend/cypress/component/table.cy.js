import React from 'react';  // Import React
import ModeratorArticleTable from './moderatorarticletable';  // Import the ModeratorArticleTable component

describe('ModeratorArticleTable Component', () => {
    // Define a sample list of articles
    const sampleArticles = [
        {
            id: '1',
            title: 'Sample Article 1',
            author: 'John Doe',
            date: '2023-10-01',
            se_practice: 'Sample Practice',
            claim: 'Sample Claim',
            result_of_evidence: 'Sample Evidence',
            type_of_research: 'Sample Research',
            approved: true,
            checked: false,
            details: 'Sample details',
            grade: 'A',
        },
    ];

    beforeEach(() => {
        // Mount the ModeratorArticleTable component with the sample articles
        cy.mount(<ModeratorArticleTable articles={sampleArticles} visibleColumns={['title', 'author', 'date', 'approved']} />);
    });

    it('should render the table with the correct columns', () => {

        cy.get('.articleTable').should('exist');
        // Check if the table headers exist
        cy.get('.articleTable thead th').should('have.length', 8);

        // Check if the table rows exist for each article
        cy.get('.articleTable tbody tr').should('have.length', sampleArticles.length);

        // Check if the table cell data is displayed correctly
        sampleArticles.forEach((article, index) => {
            const { title, author, date, approved } = article;
            cy.get(`.articleTable tbody tr:eq(${index}) td`).should('have.length', 8);
            cy.get(`.articleTable tbody tr:eq(${index}) td:eq(1)`).should('contain', title);
            cy.get(`.articleTable tbody tr:eq(${index}) td:eq(2)`).should('contain', author);
            cy.get(`.articleTable tbody tr:eq(${index}) td:eq(3)`).should('contain', date);
            cy.get(`.articleTable tbody tr:eq(${index}) td:eq(4)`).should('contain', approved ? 'Yes' : 'No');
        });
    });
});
