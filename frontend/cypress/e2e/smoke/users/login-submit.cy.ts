import LoginPage from '../../../../pages/users/login'


const TEXT_INVALID_LOGIN  = 'Invalid username or password'

const loginPage: LoginPage = new LoginPage()


describe('Login form submissions', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: 'tcm/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: 'tcm/projects/default.json'}).as('defaultProject')
    })
  
  
    context('Error validations', () => {
  
      it('shows error when using an empty username', () => {
        loginPage.typePassword('asdfasdf')
        loginPage.clickSubmit()
        cy.wait('@invalidLogin')
        loginPage.findErrors().contains(TEXT_INVALID_LOGIN)
      })
    
      it('shows error when using username is not an email address', () => {
        loginPage.typeUsername('not-an-email-address')
        loginPage.typePassword('asdfasdf')
        loginPage.clickSubmit()
        cy.wait('@invalidLogin')
        loginPage.findErrors().contains(TEXT_INVALID_LOGIN)
      })
    
      it('shows error when using an empty password', () => {
        loginPage.typeUsername('valid-user@gmail.com')
        loginPage.clickSubmit()
        cy.wait('@invalidLogin')
        loginPage.findErrors().contains(TEXT_INVALID_LOGIN)
      })
    
      it('shows error when Submitting an empty form', () => {
        loginPage.clickSubmit()
        cy.wait('@invalidLogin')
        loginPage.findErrors().contains(TEXT_INVALID_LOGIN)
      })
  
    })
  
  })
  