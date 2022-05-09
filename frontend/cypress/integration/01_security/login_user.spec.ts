
describe('Validate Login form behavior', () => {


  beforeEach(() => {
    cy.visit('/')
    cy.intercept('POST', '/api/users/login', {fixture: 'api/users/login-invalid.json'}).as('invalidLogin')
    cy.intercept('GET', '/api/projects', {fixture: 'api/projects/default.json'}).as('defaultProject')
  })


  context('Client side form validations', () => {


    it('should show form errors by default', () => {
      cy.get('#login').should('be.visible')
      cy.get('#field-1-helptext').should("have.text", "Email address is required as your login.")
      cy.get('#field-2-feedback').should("have.text", "Enter a valid password.")
    })


    it('should change Password help text when filled out', () => {
      cy.get('#password').click().type('asdfasdf')
      cy.get('#field-2-helptext').should("have.text", "Never reuse or share your passwords with anyone.")
    })


    it('should show no errors when properly filled out', () => {
      cy.get('#username').click().type('valid-user@gmail.com')
      cy.get('#password').click().type('asdfasdf')
      cy.get('#field-1-helptext').should("not.exist")
      cy.get('#field-2-helptext').should("have.text", "Never reuse or share your passwords with anyone.")
    })


  })


  context('API - login error validations', () => {


    it('should show error when using an empty username', () => {
      cy.get('#password').click().type('asdfasdf')
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })
  
  
    it('should show error when using username is not an email address', () => {
      cy.get('#username').click().type('not-an-email-address')
      cy.get('#password').click().type('asdfasdf')
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })
  
  
    it('should show error when using an empty password', () => {
      cy.get('#username').click().type('valid-user@gmail.com')
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


  context('API - login success validations', () => {


    beforeEach(() => {
      cy.intercept('POST', '/api/users/login', {fixture: 'api/users/login-valid.json' }).as('validLogin')
    })


    it('should navigate the user to the Dashboard with valid credentials', () => {
      cy.get('#username').click().type('valid-user@gmail.com')
      cy.get('#password').click().type('asdfasdf')
      cy.get('#field-1-helptext').should("not.exist")
      cy.get('#field-2-helptext').should("have.text", "Never reuse or share your passwords with anyone.")
      cy.get('#login').click()
      cy.wait(['@validLogin', '@defaultProject'])

      // Make sure we are logged in successfully
      cy.contains('p', 'DAPR TCM')
      cy.contains('p', 'Home')

      // Make sure the Projects drop down is populated
      cy.contains('select', 'Default Project')
    })

  })

})
