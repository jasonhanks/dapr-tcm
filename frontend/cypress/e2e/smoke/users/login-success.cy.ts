import DashboardPage from '../../../pages/dashboard/home'
import LoginPage from '../../../pages/users/login'


const dashboardPage: DashboardPage = new DashboardPage()
const loginPage: LoginPage = new LoginPage()


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

        loginPage.typeUsername('valid-user@example.com')
        loginPage.typePassword('asdfasdf')
        loginPage.findPasswordHelp().contains(TEXT_PASSWD_REUSE)
        loginPage.clickSubmit()
        cy.wait(['@validLogin', '@defaultProject'])
  
        // Make sure we are logged in successfully
        dashboardPage.findTitle().contains("TRAC TCM")
        dashboardPage.findContentTitle().contains("Home")
        dashboardPage.findProjectSelector().should("have.value", "Default Project")
        
        // Open the User Menu and validate it
        dashboardPage.toggleAccountMenu()
        dashboardPage.findAccountMenuFullName().contains("Valid User")
        dashboardPage.findAccountMenuUsername().contains("valid-user@example.com")

        dashboardPage.findAccountMenuSettings().should("be.visible")
        dashboardPage.findAccountMenuToggleDarkMode().should("be.visible")
        dashboardPage.findAccountMenuToggleDarkMode().should("be.visible")
        dashboardPage.findAccountMenuToggleDarkMode().should("be.visible")

        dashboardPage.toggleAccountMenu()
      })
  
    })
  
  
  })