

const TEXT_INVALID_LOGIN  = 'Invalid username or password'


describe('Login form submissions', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: 'api/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: 'api/projects/default.json'}).as('defaultProject')
    })
  
  
    context('Error validations', () => {
  
      it('shows error when using an empty username', () => {
        cy.get('#password').click().type('asdfasdf')
        cy.get('#submit').click()
        cy.wait('@invalidLogin')
        cy.get('#errors').contains(TEXT_INVALID_LOGIN)
      })
    
      it('shows error when using username is not an email address', () => {
        cy.get('#username').click().type('not-an-email-address')
        cy.get('#password').click().type('asdfasdf')
        cy.get('#submit').click()
        cy.wait('@invalidLogin')
        cy.get('#errors').contains(TEXT_INVALID_LOGIN)
      })
    
      it('shows error when using an empty password', () => {
        cy.get('#username').click().type('valid-user@gmail.com')
        cy.get('#submit').click()
        cy.wait('@invalidLogin')
        cy.get('#errors').contains(TEXT_INVALID_LOGIN)
      })
    
      it('shows error when Submitting an empty form', () => {
        cy.get('#submit').click()
        cy.wait('@invalidLogin')
        cy.get('#errors').contains(TEXT_INVALID_LOGIN)
      })
  
    })
  
  
  })