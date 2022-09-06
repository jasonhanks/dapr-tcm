import LoginPage from '../../../pages/users/login'


const TEXT_EMAIL_REQD     = 'Email address is required as your login.'
const TEXT_PASSWD_REUSE   = 'Never reuse or share your passwords with anyone.'


const loginPage: LoginPage = new LoginPage()


describe('Login form validations', () => {

  beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: 'tcm/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: 'tcm/projects/default.json'}).as('defaultProject')
    })
  
  
    context('Client side form validations', () => {
  
      it('shows form help by default', () => {
        cy.get('#submit').should('be.visible')
        loginPage.findSubmit().should('be.visible')
        loginPage.findUsernameHelp().contains(TEXT_EMAIL_REQD)
        loginPage.findPasswordHelp().contains(TEXT_PASSWD_REUSE)
      })
  
  
      it('shows no errors when properly filled out', () => {
        loginPage.findUsernameHelp().contains(TEXT_EMAIL_REQD)
        loginPage.findPasswordHelp().contains(TEXT_PASSWD_REUSE)
        loginPage.typeUsername('valid-user@gmail.com')
        loginPage.typePassword('asdfasdf')
        loginPage.findUsernameHelp().contains(TEXT_EMAIL_REQD)
        loginPage.findPasswordHelp().contains(TEXT_PASSWD_REUSE)
      })
  
    })
  
  
  })