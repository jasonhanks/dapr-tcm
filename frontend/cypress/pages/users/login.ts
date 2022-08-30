import '../../../cypress/support/commands'


export default class LoginPage {

    clickSignup() {
        return cy.getBySel('signup').click()
    }

    clickSubmit() {
        return this.findSubmit().click()
    }

    findAlert() {
        return cy.get('div.chakra-alert')
    }

    findErrors() {
        return cy.get('[role=alert]')
    }

    findUsernameError() {
        return cy.contains("Please enter email address")
    }

    findUsernameHelp() {
        return cy.getBySel('username-help')
    }

    findPasswordError() {
        return cy.getBySel('password-error')
    }

    findPasswordHelp() {
        return cy.getBySel('password-help')
    }

    findSubmitHelp() {
        return cy.getBySel('submit-help')
    }

    findSubmit() {
        return cy.get('input[data-test="submit"]')
    }

    typePassword(value) {
        return cy.getBySel('password').click().type(value)
    }

    typeUsername(value) {
        return cy.getBySel('username').click().type(value)
    }

}
