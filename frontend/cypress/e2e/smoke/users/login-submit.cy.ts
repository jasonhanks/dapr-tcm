import LoginPage from '../../../pages/users/login'



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
        loginPage.findErrors().each((item: any, index: number) => { if(index === 0) expect(item.text()).to.eq("Please enter email address") })
      })
    
      it('shows error when using username is not an email address', () => {
        loginPage.typeUsername('not-an-email-address')
        loginPage.typePassword('asdfasdf')
        loginPage.clickSubmit()
        cy.wait('@invalidLogin')
        loginPage.findAlert().invoke('text').then((text) => expect(text).to.equal("Invalid username or password!"))
      })
    
      it('shows error when using an empty password', () => {
        loginPage.typeUsername('valid-user@gmail.com')
        loginPage.clickSubmit()
        loginPage.findErrors().each((item: any, index: number) => { if(index === 0) expect(item.text()).to.eq("Please enter your password") })
      })
    
      it('shows error when Submitting an empty form', () => {
        loginPage.clickSubmit()
        loginPage.findErrors().each((item: any, index: number) => { 
          if(index === 0) expect(item.text()).to.eq("Please enter email address") 
          else if(index === 1) expect(item.text()).to.eq("Please enter your password") 
        })
      })
  
    })
  
  })
  