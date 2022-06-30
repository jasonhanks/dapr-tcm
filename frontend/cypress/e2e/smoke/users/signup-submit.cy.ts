
 
describe('Signup form submissions', () => {

    const TEXT_INVALID_LOGIN  = 'Invalid username or password'
    
    beforeEach(() => {
      cy.visit('/')
      cy.get("button").contains("Click here to Sign Up").click() // Navigate to the Signup form
      cy.get("button").contains("Accept").click() // Close the disclaimer for Firefox
      cy.intercept('POST', '/api/users/login', {fixture: 'tcm/users/login-invalid.json'}).as('invalidLogin')
      cy.intercept('GET', '/api/projects', {fixture: 'tcm/projects/default.json'}).as('defaultProject')

    })
  
  
    context('Form submission valdations', () => {

 
      it('shows an error message for all required inputs with nothing filled out', () => {
        cy.intercept('POST', '/api/users', {fixture: 'api/users/signup-invalid-all.json', statusCode: 403}).as('invalidSignup')
        cy.get('#submit').click()
        cy.wait('@invalidSignup')
        cy.get('#errors')
          .contains('Email must be a valid working email address')
          .contains('Initials must be between 2 and 5 chars long')
          .contains('Passwords must be at least 8 chars long')
          .contains('Password confirmations must be at least 8 chars long')
          .contains('Full name must at least 4 chars long')
      })


      it('shows an error if email is invalid', () => {
        const ERROR_MSG = "Email must be a valid working email address"

        cy.intercept('/api/users/', {fixture: 'api/users/signup-invalid-email.json', statusCode: 403}).as('invalidSignup')
  
        cy.get('#initials').type('VU')
        cy.get('#full_name').type('Valid User')
        cy.get('#password').type('asdfasdf')
        cy.get('#password_confirm').type('asdfasdf')

        // // Check for blank values
        cy.get('#username').clear()
        cy.get('#submit').click()
        cy.contains('#errors', ERROR_MSG)

        // // Make sure it requires a domain
        cy.get('#username').type('invalid-email-address')
        cy.get('#submit').click()
        cy.contains('#errors', ERROR_MSG)

        // // Make sure it's a valid formatted domain
        cy.get('#username').type('@invalid-domain')
        cy.get('#submit').click()
        cy.contains('#errors', ERROR_MSG)
      })

  
      it('shows an error if initials is invalid', () => {
        const ERROR_MSG = "Initials must be between 2 and 5 chars long"

        cy.intercept('/api/users/', {fixture: 'api/users/signup-invalid-initials.json', statusCode: 403}).as('invalidSignup')
  
        cy.get('#username').type('valid-user@example.com')
        cy.get('#full_name').type('Valid User')
        cy.get('#password').type('asdfasdf')
        cy.get('#password_confirm').type('asdfasdf')

        // Check for blank values
        cy.get('#initials').clear()
        cy.get('#submit').click()
        cy.contains('#errors', ERROR_MSG)

        // Must be at least 2 characters long
        cy.get('#initials').type('I')
        cy.get('#submit').click()
        cy.contains('#errors', ERROR_MSG)

        // Must be at most 5 characters long
        cy.get('#initials').type('ABCDEF')
        cy.get('#submit').click()
        cy.contains('#errors', ERROR_MSG)
      })


      it('shows an error if passwords are invalid', () => {
        cy.intercept('/api/users/', {fixture: 'api/users/signup-invalid-password.json', statusCode: 403}).as('invalidSignup')
  
        cy.get('#username').type('valid-user@example.com')
        cy.get('#full_name').type('Valid User')
        cy.get('#initials').type('VU')
        cy.get('#password_confirm').type('asdfasdf')

        // Check for blank values
        cy.get('#password').clear()
        cy.get('#submit').click()
        cy.get('#errors')
          .contains('Passwords must be at least 8 chars long')
          .contains('Password and confirmation password must match')

        // Password is too short (boundary)
        cy.get('#password').type('1234567')
        cy.get('#submit').click()
        cy.get('#errors')
          .contains('Passwords must be at least 8 chars long')
          .contains('Password and confirmation password must match')
      })

      
      it('shows an error if confirmation passwords are invalid', () => {
        cy.intercept('/api/users/', {fixture: 'api/users/signup-invalid-password-confirm.json', statusCode: 403}).as('invalidSignup')
  
        cy.get('#username').type('valid-user@example.com')
        cy.get('#full_name').type('Valid User')
        cy.get('#initials').type('VU')
        cy.get('#password').type('asdfasdf')

        // Check for blank values
        cy.get('#password_confirm').clear()
        cy.get('#submit').click()
        cy.get('#errors')
          .contains('Password confirmations must be at least 8 chars long')
          .contains('Password and confirmation password must match')

        // Password is too short (boundary)
        cy.get('#password_confirm').type('1234567')
        cy.get('#submit').click()
        cy.get('#errors')
          .contains('Password confirmations must be at least 8 chars long')
          .contains('Password and confirmation password must match')
      })


      it('shows an error if passwords do not match', () => {
        cy.intercept('/api/users/', {fixture: 'api/users/signup-invalid-password-mismatch.json', statusCode: 403}).as('invalidSignup')
  
        cy.get('#username').type('valid-user@example.com')
        cy.get('#full_name').type('Valid User')
        cy.get('#initials').type('VU')
        cy.get('#password').type('asdfasdf')
        cy.get('#password_confirm').type('1234567')
        cy.get('#submit').click()
        cy.get('#errors')
          .contains('Password and confirmation password must match')
      })


    })
  
  
  })