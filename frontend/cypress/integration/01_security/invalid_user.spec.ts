
describe('Validate Login form behavior', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('POST', '/api/users/login', { fixture: 'api/users/login-invalid.json' }).as('invalidLogin')
  })


  context('Client side form validations', () => {


    it('should show form errors by default', () => {
      cy.get('#login').should('be.visible')
      cy.get('#field-1-helptext').should("have.text", "Email address is required as your login.")
      cy.get('#field-2-feedback').should("have.text", "Enter a valid password.")
      cy.get('#login').click()
      cy.wait('@invalidLogin')
    })


    it('should change Password help text when filled out', () => {
      cy.get('#password').click()
      cy.get('#password').type('asdfasdf')
      cy.get('#field-2-helptext').should("have.text", "Never reuse or share your passwords with anyone.")
      cy.get('#login').click()
      cy.wait('@invalidLogin')
    })


  })


  context('API login validations', () => {


    it('should show error when Submitting an empty username', () => {
      cy.get('#password').click()
      cy.get('#password').type('asdfasdf')
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })
  
  
    it('should show error when Submitting an empty password', () => {
      cy.get('#username').click()
      cy.get('#username').type('invalid-user')
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })
  

    it('should show error when Submitting an empty form', () => {
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })
  

  })

})
