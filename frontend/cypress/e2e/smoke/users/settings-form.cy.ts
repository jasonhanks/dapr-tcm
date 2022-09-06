import DashboardPage from '../../../pages/dashboard/home'
import LoginPage from '../../../pages/users/login'
import SettingsPage from '../../../pages/users/settings'



const dashboardPage: DashboardPage = new DashboardPage()
const loginPage = new LoginPage()
const settingsPage = new SettingsPage()


describe('Settings form validations', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
        cy.intercept('PUT', '/api/users', {fixture: 'tcm/users/settings-invalid.json'}).as('invalidSettings')
        cy.intercept('GET', '/api/projects', {fixture: 'tcm/projects/default.json'}).as('defaultProject')
        cy.intercept('POST', '/api/users/login', {fixture: 'tcm/users/login-valid.json' }).as('validLogin')

        // Login as a "valid" user
        loginPage.typeUsername('valid-user@example.com')
        loginPage.typePassword('asdfasdf')
        loginPage.clickSubmit()
        cy.wait(['@validLogin', '@defaultProject'])
        loginPage.findAlert().invoke("text").then(text => expect(text).to.eq("Login successful!"))

        // Navigate to the Account Settings
        dashboardPage.toggleAccountMenu()
        dashboardPage.findAccountMenuSettings().click()
      })
    
    
      context('Client side form validations', () => {
    
        it('shows form help by default', () => {
          settingsPage.findSubmit().should('be.visible')
          settingsPage.findUsernameHelp().contains("Email address is required as your login.")
          settingsPage.findFullNameHelp().contains("Full name is required to display to other users.")
          settingsPage.findInitialsHelp().contains("Initials are required to display your name shortened.")
        })
 
        it('shows an error message for all required inputs with nothing filled out', () => {
          settingsPage.findFullName().clear()
          settingsPage.findInitials().clear()
          settingsPage.findSubmit().click()
          settingsPage.findErrors().each((item, index, list) => {
            if(index === 0) expect(item.text()).to.eq("Please enter your full name")
            else if(index === 1) expect(item.text()).to.eq("Please enter your initials")
          })

        })
                
    })
    
})
