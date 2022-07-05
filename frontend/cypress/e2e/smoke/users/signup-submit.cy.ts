import SignupPage from '../../../pages/users/signup'


const signupPage: SignupPage = new SignupPage()


 
describe('Signup form submissions', () => {

    const TEXT_INVALID_LOGIN  = 'Invalid username or password'
    
    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Click here to Sign Up").click() // Navigate to the Signup form
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: '../fixtures/tcm/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: '../fixtures/tcm/projects/default.json'}).as('defaultProject')
    })
  
  
    context('Form submission valdations', () => {

 
      it('shows an error message for all required inputs with nothing filled out', () => {
        cy.intercept('POST', '/api/users', {fixture: '../fixtures/tcm/users/signup-invalid-all.json', statusCode: 403}).as('invalidSignup')
        signupPage.clickSubmit()
        cy.wait('@invalidSignup')
        signupPage.findErrors()
          .contains('Email must be a valid working email address')
          .contains('Initials must be between 2 and 5 chars long')
          .contains('Passwords must be at least 8 chars long')
          .contains('Password confirmations must be at least 8 chars long')
          .contains('Full name must at least 4 chars long')
      })


      it('shows an error if email is invalid', () => {
        const ERROR_MSG = "Email must be a valid working email address"

        cy.intercept('/api/users/', {fixture: '../fixtures/tcm/users/signup-invalid-email.json', statusCode: 403}).as('invalidSignup')
  
        signupPage.typeInitials('VU')
        signupPage.typeFullName('Valid User')
        signupPage.typePassword('asdfasdf')
        signupPage.typePasswordConfirm('asdfasdf')

        // // Check for blank values
        signupPage.findUsername().clear()
        signupPage.clickSubmit()
        signupPage.findErrors().contains(ERROR_MSG)

        // // Make sure it requires a domain
        signupPage.typeUsername('invalid-email-address')
        signupPage.clickSubmit()
        signupPage.findErrors().contains(ERROR_MSG)

        // // Make sure it's a valid formatted domain
        signupPage.typeUsername('@invalid-domain')
        signupPage.clickSubmit()
        signupPage.findErrors().contains(ERROR_MSG)
      })

  
      it('shows an error if initials is invalid', () => {
        const ERROR_MSG = "Initials must be between 2 and 5 chars long"

        cy.intercept('/api/users/', {fixture: '../fixtures/tcm/users/signup-invalid-initials.json', statusCode: 403}).as('invalidSignup')
  
        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typePassword('asdfasdf')
        signupPage.typePasswordConfirm('asdfasdf')

        // Check for blank values
        signupPage.findInitials().clear()
        signupPage.clickSubmit()
        signupPage.findErrors().contains(ERROR_MSG)

        // Must be at least 2 characters long
        signupPage.typeInitials('I')
        signupPage.clickSubmit()
        signupPage.findErrors().contains(ERROR_MSG)

        // Must be at most 5 characters long
        signupPage.typeInitials('ABCDEF')
        signupPage.clickSubmit()
        signupPage.findErrors().contains(ERROR_MSG)
      })


      it('shows an error if passwords are invalid', () => {
        cy.intercept('/api/users/', {fixture: '../fixtures/tcm/users/signup-invalid-password.json', statusCode: 403}).as('invalidSignup')
  
        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePasswordConfirm('asdfasdf')

        // Check for blank values
        signupPage.findPassword().clear()
        signupPage.clickSubmit()
        signupPage.findErrors()
          .contains('Passwords must be at least 8 chars long')
          .contains('Password and confirmation password must match')

        // Password is too short (boundary)
        signupPage.typePassword('1234567')
        signupPage.clickSubmit()
        signupPage.findErrors()
          .contains('Passwords must be at least 8 chars long')
          .contains('Password and confirmation password must match')
      })

      
      it('shows an error if confirmation passwords are invalid', () => {
        cy.intercept('/api/users/', {fixture: '../fixtures/tcm/users/signup-invalid-password-confirm.json', statusCode: 403}).as('invalidSignup')
  
        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePassword('asdfasdf')

        // Check for blank values
        signupPage.findPasswordConfirm().clear()
        signupPage.clickSubmit()
        signupPage.findErrors()
          .contains('Password confirmations must be at least 8 chars long')
          .contains('Password and confirmation password must match')

        // Password is too short (boundary)
        signupPage.typePasswordConfirm('1234567')
        signupPage.clickSubmit()
        signupPage.findErrors()
          .contains('Password confirmations must be at least 8 chars long')
          .contains('Password and confirmation password must match')
      })


      it('shows an error if passwords do not match', () => {
        cy.intercept('/api/users/', {fixture: '../fixtures/tcm/users/signup-invalid-password-mismatch.json', statusCode: 403}).as('invalidSignup')
  
        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePassword('asdfasdf')
        signupPage.typePasswordConfirm('1234567')
        signupPage.clickSubmit()
        signupPage.findErrors()
          .contains('Password and confirmation password must match')
      })


    })
  
  
  })