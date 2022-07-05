import DashboardPage from '../../../pages/dashboard/home'
import SignupPage from '../../../pages/users/signup'


const dashboardPage: DashboardPage = new DashboardPage()
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
        cy.intercept('POST', '/api/users', {fixture: 'tcm/users/signup-valid.json', statusCode: 200}).as('validSignup')

        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePassword('asdfasdf')
        signupPage.typePasswordConfirm('asdfasdf')
        signupPage.clickSubmit()
        cy.wait(['@validSignup', '@defaultProject'])
    
        // Make sure we are logged in successfully
        // Make sure we are logged in successfully
        dashboardPage.findTitle().contains("TRAC TCM")
        dashboardPage.findContentTitle().contains("Home")
        dashboardPage.findProjectSelector().should("have.value", "Default Project")
        
        // Open the User Menu and validate it
        dashboardPage.toggleAccountMenu()
        dashboardPage.findAccountMenuFullName().contains("Valid User")
        dashboardPage.findAccountMenuUsername().contains("valid-user@example.com")
        dashboardPage.toggleAccountMenu()
      })


    })
  
  
  })