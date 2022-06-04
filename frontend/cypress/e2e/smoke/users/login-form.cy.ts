

const TEXT_EMAIL_REQD     = 'Email address is required as your login.'
const TEXT_PASSWD_REUSE   = 'Never reuse or share your passwords with anyone.'
const TEXT_VALID_PASSWD   = 'Enter a valid password.'


describe('Login form validations', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: 'api/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: 'api/projects/default.json'}).as('defaultProject')
    })
  
  
    context('Client side form validations', () => {
  
      it('shows form errors by default', () => {
        cy.get('#submit').should('be.visible')
        cy.get('#field-1-helptext').contains(TEXT_EMAIL_REQD)
        cy.get('#field-2-feedback').contains(TEXT_VALID_PASSWD)
      })
  
      it('changes Password help text when filled out', () => {
        cy.get('#field-1-helptext').contains(TEXT_EMAIL_REQD)
        cy.get('#field-2-feedback').contains(TEXT_VALID_PASSWD)
        cy.get('#password').click().type('asdfasdf')
        cy.get('#field-2-helptext').contains(TEXT_PASSWD_REUSE)
      })
  
      it('shows no errors when properly filled out', () => {
        cy.get('#field-1-helptext').contains(TEXT_EMAIL_REQD)
        cy.get('#field-2-feedback').contains(TEXT_VALID_PASSWD)
        cy.get('#username').click().type('valid-user@gmail.com')
        cy.get('#password').click().type('asdfasdf')
        cy.get('#field-1-helptext').contains(TEXT_EMAIL_REQD)
        cy.get('#field-2-helptext').contains(TEXT_PASSWD_REUSE)
      })
  
    })
  
  
  })