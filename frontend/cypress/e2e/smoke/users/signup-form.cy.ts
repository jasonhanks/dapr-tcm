

describe('Signup form validations', () => {

    const TEXT_EMAIL_REQD     = 'Email address is required as your login.'
    const TEXT_PASSWD_REUSE   = 'Never reuse or share your passwords with anyone.'
    const TEXT_VALID_PASSWD   = 'Enter a valid password.'
    
    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Click here to Sign Up").click() // Navigate to the Signup form
      cy.contains('Signup for Account')
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: 'tcm/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: 'tcm/projects/default.json'}).as('defaultProject')
    })
  
  
    context('Client side form validations', () => {
  
      it('shows help text by default', () => {
        cy.get('#field-1-helptext').contains("Enter the email you'd like to use as your login.")
        cy.get('#field-2-helptext').contains("Enter your preferred full name to use.")
        cy.get('#field-3-helptext').contains("Enter your preferred short name / initials to use.")
        cy.get('#field-4-helptext').contains('Never reuse or share your passwords.')
        cy.get('#field-5-helptext').contains("Please confirm your new password.")
      })
  
  
    })
  
  
  })