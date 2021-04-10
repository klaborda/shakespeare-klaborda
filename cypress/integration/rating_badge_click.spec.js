describe('Ensure clicking rating badge correctly filters the reviews', () => {
  it('ensure clicking the 1 badge filters reviews for ratings between 1 -> 1.9', () => {
    cy.visit('/');
    cy.contains('1').click();
    cy.contains('Shakespeare Quote Reviews');
    cy.get(':nth-child(1) > .card-body > .card-subtitle').contains('1.6');
  });
});
