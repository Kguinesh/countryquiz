describe('template spec', () => {
  it('passes', () => {
    // Mock the API response
    cy.intercept('GET', 'https://restcountries.com/v3.1/all', {
      statusCode: 200,
      body: [{ name: { common: 'Brazil' }, flags: { png: 'url' }, capital: ['Brasília'] }]
    }).as('getCountries');

    cy.visit('http://localhost:8080');
    cy.wait('@getCountries');  // Wait for the mocked request to complete
  });
});
