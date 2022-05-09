
describe('Validate Login form behavior', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.intercept('POST', '/api/users/login', {fixture: 'api/users/login-invalid.json'}).as('invalidLogin')
    cy.intercept('GET', '/api/projects', {fixture: 'api/projects/default.json'}).as('defaultProject')
  })


  context('Client side form validations', () => {

    it('shows form errors by default', () => {
      cy.get('#login').should('be.visible')
      cy.get('#field-1-helptext').should("have.text", "Email address is required as your login.")
      cy.get('#field-2-feedback').should("have.text", "Enter a valid password.")
    })

    it('changes Password help text when filled out', () => {
      cy.get('#field-1-helptext').should("have.text", "Email address is required as your login.")
      cy.get('#field-2-feedback').should("have.text", "Enter a valid password.")
      cy.get('#password').click().type('asdfasdf')
      cy.get('#field-2-helptext').should("have.text", "Never reuse or share your passwords with anyone.")
    })

    it('shows no errors when properly filled out', () => {
      cy.get('#field-1-helptext').should("have.text", "Email address is required as your login.")
      cy.get('#field-2-feedback').should("have.text", "Enter a valid password.")
      cy.get('#username').click().type('valid-user@gmail.com')
      cy.get('#password').click().type('asdfasdf')
      cy.get('#field-1-helptext').should("not.exist")
      cy.get('#field-2-helptext').should("have.text", "Never reuse or share your passwords with anyone.")
    })

  })


  context('API - invalid login validations', () => {

    it('shows error when using an empty username', () => {
      cy.get('#password').click().type('asdfasdf')
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })
  
    it('shows error when using username is not an email address', () => {
      cy.get('#username').click().type('not-an-email-address')
      cy.get('#password').click().type('asdfasdf')
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })
  
    it('shows error when using an empty password', () => {
      cy.get('#username').click().type('valid-user@gmail.com')
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })
  
    it('shows error when Submitting an empty form', () => {
      cy.get('#login').click()
      cy.wait('@invalidLogin')
      cy.get('#errors').should("have.text", "Invalid username or password")
    })

  })


  context('API - successful login validations', () => {

    beforeEach(() => {
      cy.intercept('POST', '/api/users/login', {fixture: 'api/users/login-valid.json' }).as('validLogin')
    })

    it('navigates the user to the Dashboard with valid credentials', () => {
      cy.get('#username').click().type('valid-user@gmail.com')
      cy.get('#password').click().type('asdfasdf')
      cy.get('#field-1-helptext').should("not.exist")
      cy.get('#field-2-helptext').should("have.text", "Never reuse or share your passwords with anyone.")
      cy.get('#login').click()
      cy.wait(['@validLogin', '@defaultProject'])

      // Make sure we are logged in successfully
      cy.contains('p', 'DAPR TCM')
      cy.contains('p', 'Home')

      cy.contains('select', 'Default Project')
      cy.get('.chakra-select').should('be.enabled')
      cy.get('#menu-button-19').should('have.class', 'chakra-button')

      // Open the User Menu and validate it
      cy.get('#menu-button-19').click()
      cy.get('#menu-list-19 > :nth-child(3) > :nth-child(1) > :nth-child(1)').should('have.text', 'Valid User')
      cy.get(':nth-child(3) > :nth-child(1) > :nth-child(2)').should('have.text', 'valid-user@gmail.com')
      cy.get('#menu-list-19-menuitem-15').should('have.text', 'Account Settings')
      cy.get('#menu-list-19-menuitem-16').should('have.text', 'Toggle Light / Dark Mode')
      cy.get('#menu-list-19-menuitem-17').should('have.text', 'Sign Out')
      cy.get('#menu-button-19').click() // Close the User Menu
    })

  })


})
