describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Add Invoice').click();
    cy.get('#Item').type('abc');
    cy.get('#rate').type('1');
    cy.get('#quantity').type('3');
    cy.contains('Add').click();
    cy.get('#Item').type('344');
    cy.get('#rate').type('12');
    cy.get('#quantity').type('34');
    cy.contains('Add').click();
    cy.contains('print').click();
    cy.contains('Back').click();
    cy.contains('th','1').parent().contains('Edit').click()
    cy.get('#Item').type('344');
    cy.get('#rate').type('12');
    cy.get('#quantity').type('34');
    cy.contains('Add').click();
    cy.wait(2000)
    cy.contains('Back').click();
    cy.wait(1000)
    cy.contains('th','1').parent().contains('Delete').click()
  });
});
