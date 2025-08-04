/* global describe, it, cy, beforeEach */
describe('Bug Report Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/bug-reporter');
  });

  it('renders the form correctly', () => {
    cy.get('form').should('exist');
    cy.get('input[name="title"]').should('exist');
    cy.get('textarea[name="description"]').should('exist');
    cy.get('select[name="severity"]').should('exist');
    cy.contains('Report Bug').should('exist');
  });

  it('shows validation error for missing title', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('The title field is required').should('exist');
  });

  it('accepts valid data and submits', () => {
    cy.get('input[name="title"]').type('Test Bug');
    cy.get('textarea[name="description"]').type('This is a test bug description.');
    cy.get('select[name="severity"]').select('high');
    cy.get('button[type="submit"]').click();
    cy.contains('Bug reported!').should('exist');
  });

  it('displays success message on submit', () => {
    cy.get('input[name="title"]').type('Another Bug');
    cy.get('button[type="submit"]').click();
    cy.contains('Bug reported!').should('exist');
  });

  it('shows backend validation error', () => {
    // Simulate backend error by intercepting the request
    cy.intercept('POST', '/api/bug-reports', {
      statusCode: 422,
      body: {
        errors: { title: ['The title field is required.'] }
      }
    }).as('postBugReport');
        cy.get('button[type="submit"]').click();
    cy.wait('@postBugReport');
    cy.contains('The title field is required').should('exist');
  });


  it('severity defaults to Medium', () => {
    cy.get('select[name="severity"]').should('have.value', 'medium');
  });

  it('form resets after successful submission', () => {
    cy.get('input[name="title"]').type('Reset Test');
    cy.get('textarea[name="description"]').type('Check reset.');
    cy.get('select[name="severity"]').select('high');
    cy.get('button[type="submit"]').click();
    cy.contains('Bug reported!').should('exist');
    cy.get('input[name="title"]').should('have.value', '');
    cy.get('textarea[name="description"]').should('have.value', '');
    cy.get('select[name="severity"]').should('have.value', 'medium');
  });

  it('handles slow API response or failure', () => {
    cy.intercept('POST', '/api/bug-reports', (req) => {
      req.reply({
        delay: 2000,
        statusCode: 500,
        body: { message: 'Server error' }
      });
    }).as('slowApi');
});

});
