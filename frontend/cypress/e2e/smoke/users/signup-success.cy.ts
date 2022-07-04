import SignupPage from '../../../pages/users/signup'


const signupPage: SignupPage = new SignupPage()

 
describe('Signup form submissions', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Click here to Sign Up").click() // Navigate to the Signup form
      cy.contains('Signup for Account')
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('GET', '/api/projects', {fixture: 'tcm/projects/default.json'}).as('defaultProject')

    })
  
  
    context('Form submission valdations', () => {

 
      it('Validate successful Signup', () => {
        cy.intercept('POST', '/api/users', {fixture: 'api/users/signup-valid.json', statusCode: 200}).as('validSignup')

        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePassword('asdfasdf')
        signupPage.typePasswordConfirm('asdfasdf')
        signupPage.clickSubmit()
        cy.wait(['@validSignup', '@defaultProject'])
    
        // Make sure we are logged in successfully
        signupPage.findErrors().should("not.exist")
        cy.contains('p', 'TRAC TCM')
        cy.contains('p', 'Home')
  
        cy.contains('select', 'Default Project')
        cy.get('.chakra-select').should('not.be.empty')
        cy.get('#menu-button-19').should('have.class', 'chakra-button')
  
        // Open the User Menu and validate it
        cy.get('#menu-button-19').click()
        cy.contains('#menu-list-19 > :nth-child(3) > :nth-child(1) > :nth-child(1)', 'Valid User')
        cy.contains('#menu-list-19 > :nth-child(3) > :nth-child(1) > :nth-child(2)', 'valid-user@example.com')
        cy.contains('#menu-list-19 > :nth-child(5)', 'Account Settings')
        cy.contains('#menu-list-19 > :nth-child(6)', 'Toggle Light / Dark Mode')
        cy.contains('#menu-list-19 > :nth-child(8)', 'Sign Out')
        cy.get('#menu-button-19').click() // Close the User Menu
      })


    })
  
  
  })