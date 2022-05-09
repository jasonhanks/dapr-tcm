// invalid_user.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Validate Login form behavior', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should show form errors by default', () => {
    cy.get('#login').should('be.visible')
    cy.get('#field-1-helptext').should("be.visible").and("have.text", "Email address is required as your login.")
    cy.get('#field-2-feedback').should("be.visible").and("have.text", "Enter a valid password.")

  })


  it('should show error when Submitting an empty username', () => {
    cy.get('#password').click()
    cy.get('#password').type('asdfasdf')
    cy.get('#login').click()
    cy.get('#errors').should("be.visible").and("have.text", "Invalid username or password")
  })


  it('should show error when Submitting an empty password', () => {
    cy.get('#username').click()
    cy.get('#username').type('invalid-user')
    cy.get('#login').click()
    cy.get('#errors').should("be.visible").and("have.text", "Invalid username or password")
  })


  it('should change Password help text when filled out', () => {
    cy.get('#password').click()
    cy.get('#password').type('asdfasdf')
    cy.get('#field-2-helptext').should("be.visible").and("have.text", "Never reuse or share your passwords with anyone.")
    cy.get('#login').click()
  })

  it('should show error when Submitting an empty form', () => {
      cy.get('#login').click()
      cy.get('#errors').should("be.visible").and("have.text", "Invalid username or password")
  })
  
})
