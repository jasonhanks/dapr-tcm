import SignupPage from '../../../pages/users/signup'


const signupPage: SignupPage = new SignupPage()


 
describe('Signup form submissions', () => {

    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Click here to Sign Up").click() // Navigate to the Signup form
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: '../fixtures/tcm/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: '../fixtures/tcm/projects/default.json'}).as('defaultProject')
    })
  
  
    context('Form submission valdations', () => {

 
      it('shows an error message for all required inputs with nothing filled out', () => {
        signupPage.findUsernameHelp().invoke("text").then(text => expect(text).to.eq("Enter the email you'd like to use as your login."))
        signupPage.findPasswordHelp().invoke("text").then(text => expect(text).to.eq("Never reuse or share your passwords."))
        signupPage.findFullNameHelp().invoke("text").then(text => expect(text).to.eq("Enter your preferred full name to use."))
        signupPage.findInitialsHelp().invoke("text").then(text => expect(text).to.eq("Enter your preferred short name / initials to use."))
        signupPage.findPasswordConfirmHelp().invoke("text").then(text => expect(text).to.eq("Please confirm your new password."))
        signupPage.clickSubmit()

        const errors: any = signupPage.findErrors().each((item, index, list) => {
          if(index === 0) expect(item.text()).to.eq("Please enter your email address")
          else if(index === 1) expect(item.text()).to.eq("Please enter your full name")
          else if(index === 2) expect(item.text()).to.eq("Please enter your initials")
          else if(index === 3) expect(item.text()).to.eq("Please enter your password")
          else if(index === 4) expect(item.text()).to.eq("Please enter your password again")
        })
        console.log(errors)
      })


      it('shows an error if email is invalid', () => {
        const ERROR_MSG = "Email must be a valid working email address"

        cy.intercept('/users', {fixture: '../fixtures/tcm/users/signup-invalid-email.json', statusCode: 403}).as('invalidSignup')
  
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePassword('asdfasdf')
        signupPage.typePasswordConfirm('asdfasdf')
        signupPage.clickSubmit()
        signupPage.findErrors().each((item, index) => { if(index === 0) expect(item.text()).to.eq("Please enter your email address") })

        // // Make sure it requires a domain
        signupPage.typeUsername('invalid-email-address')
        signupPage.clickSubmit()
        // cy.wait('@invalidSignup')
        signupPage.findAlert().invoke('text').then((text) => expect(text).to.equal("Error: Email must be a valid working email address\n!"))
        cy.get("[aria-label=Close]").click()

        // // Make sure it's a valid formatted domain
        signupPage.typeUsername('@invalid-domain')
        signupPage.clickSubmit()
        signupPage.findAlert().invoke('text').then((text) => expect(text).to.equal("Error: Email must be a valid working email address\n!"))
        cy.get("[aria-label=Close]").click()
      })

  
      it('shows an error if initials is invalid', () => {
        const ERROR_MSG = "Initials must be between 2 and 5 chars long"

        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typePassword('asdfasdf')
        signupPage.typePasswordConfirm('asdfasdf')

        // Check for blank values
        signupPage.findInitials().clear()
        signupPage.clickSubmit()
        signupPage.findErrors().each((item, index) => { if(index === 0) expect(item.text()).to.eq("Please enter your initials") })

        // Must be at least 2 characters long
        signupPage.typeInitials('I')
        signupPage.clickSubmit()
        signupPage.findErrors().each((item, index) => { if(index === 0) expect(item.text()).to.eq("Minimum length is 2") })

        // Must be at most 5 characters long
        signupPage.findInitials().clear()
        signupPage.typeInitials('ABCDEF')
        signupPage.clickSubmit()
        signupPage.findErrors().each((item, index) => { if(index === 0) expect(item.text()).to.eq("Maximum length is 4") })
      })


      it('shows an error if passwords are invalid', () => {
        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePasswordConfirm('asdfasdf')

        // Check for blank values
        signupPage.findPassword().clear()
        signupPage.clickSubmit()
        signupPage.findErrors().each((item, index) => { 
          if(index === 0) expect(item.text()).to.eq("Please enter your password") 
        })

        // Password is too short (boundary)
        signupPage.typePassword('1234567')
        signupPage.clickSubmit()
        signupPage.findErrors().each((item, index) => { 
          if(index === 0) expect(item.text()).to.eq("Minimum length is 8") 
        })
      })

      
      it('shows an error if confirmation passwords are invalid', () => {
        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePassword('asdfasdf')

        // Check for blank values
        signupPage.findPasswordConfirm().clear()
        signupPage.clickSubmit()
        signupPage.findErrors().each((item, index) => { if(index === 0) expect(item.text()).to.eq("Please enter your password again") })

        // Password is too short (boundary)
        signupPage.typePasswordConfirm('1234567')
        signupPage.clickSubmit()
        signupPage.findErrors().each((item, index) => {  if(index === 0) expect(item.text()).to.eq("Minimum length is 8")  })
      })


      it('shows an error if passwords do not match', () => {
        cy.intercept('/api/users', {fixture: '../fixtures/tcm/users/signup-invalid-password-mismatch.json', statusCode: 403}).as('invalidSignup')
        signupPage.typeUsername('valid-user@example.com')
        signupPage.typeFullName('Valid User')
        signupPage.typeInitials('VU')
        signupPage.typePassword('asdfasdf')
        signupPage.typePasswordConfirm('12345678')
        signupPage.clickSubmit()
        cy.wait('@invalidSignup')
        signupPage.findAlert().invoke('text').then((text) => expect(text).to.equal("Error: Password and confirmation password must match\n!"))

      })


    })
  
  
  })