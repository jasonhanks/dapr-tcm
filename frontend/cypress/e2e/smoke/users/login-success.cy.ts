

describe('Login form submissions', () => {

  beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: 'tcm/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: 'tcm/projects/default.json'}).as('defaultProject')
      cy.intercept('POST', '/api/users/login', {fixture: 'tcm/users/login-valid.json' }).as('validLogin')
    })
  
  
    context('API - successful login validations', () => {
  
      it('navigates the user to the Dashboard with valid credentials', () => {
        const TEXT_PASSWD_REUSE   = 'Never reuse or share your passwords with anyone.'

        cy.get('#username').click().type('valid-user@gmail.com')
        cy.get('#password').click().type('asdfasdf')
        cy.contains('#field-2-helptext', TEXT_PASSWD_REUSE)
        cy.get('#submit').click()
        cy.wait(['@validLogin', '@defaultProject'])
  
        // Make sure we are logged in successfully
        cy.contains('p', 'TRAC TCM')
        cy.contains('p', 'Home')
  
        cy.contains('select', 'Default Project')
        cy.get('.chakra-select').should('be.enabled')
        cy.get('#menu-button-19').should('have.class', 'chakra-button')
  
        // Open the User Menu and validate it
        cy.get('#menu-button-19').click()
        cy.contains('#menu-list-19 > :nth-child(3) > :nth-child(1) > :nth-child(1)', 'Valid User')
        cy.contains(':nth-child(3) > :nth-child(1) > :nth-child(2)', 'valid-user@gmail.com')
        cy.contains('#menu-list-19-menuitem-15', 'Account Settings')
        cy.contains('#menu-list-19-menuitem-16', 'Toggle Light / Dark Mode')
        cy.contains('#menu-list-19-menuitem-17', 'Sign Out')
        cy.get('#menu-button-19').click() // Close the User Menu
      })
  
    })
  
  
  })