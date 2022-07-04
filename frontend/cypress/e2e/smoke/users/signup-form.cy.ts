import SignupPage from '../../../pages/users/signup'


const signupPage: SignupPage = new SignupPage()


describe('Signup form validations', () => {

    const TEXT_EMAIL_REQD     = 'Email address is required as your login.'
    const TEXT_PASSWD_REUSE   = 'Never reuse or share your passwords with anyone.'
    const TEXT_VALID_PASSWD   = 'Enter a valid password.'
    
    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Click here to Sign Up").click() // Navigate to the Signup form
      cy.contains('Signup for Account')
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: 'tcm/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: 'tcm/projects/default.json'}).as('defaultProject')
    })
  
  
    context('Client side form validations', () => {
  
      it('shows help text by default', () => {
        signupPage.findUsernameHelp().contains("Enter the email you'd like to use as your login.")
        signupPage.findFullNameHelp().contains("Enter your preferred full name to use.")
        signupPage.findInitialsHelp().contains("Enter your preferred short name / initials to use.")
        signupPage.findPasswordHelp().contains('Never reuse or share your passwords.')
        signupPage.findPasswordConfirmHelp().contains("Please confirm your new password.")
      })
  
  
    })
  
  
  })