import '../../../cypress/support/commands'


export default class LoginPage {

    clickLogin() {
        return cy.getBySel('login-link').click()
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

    findFullNameHelp() {
        return cy.getBySel('full_name-help')
    }

    findInitials() {
        return cy.getBySel('initials')
    }

    findInitialsHelp() {
        return cy.getBySel('initials-help')
    }

    findUsernameHelp() {
        return cy.getBySel('username-help')
    }

    findUsername() {
        return cy.getBySel('username')
    }

    findPassword() {
        return cy.getBySel('password')
    }

    findPasswordConfirm() {
        return cy.getBySel('password_confirm')
    }

    findPasswordConfirmHelp() {
        return cy.getBySel('password-confirm-help')
    }

    findPasswordHelp() {
        return cy.getBySel('password-help')
    }

    findSubmitHelp() {
        return cy.getBySel('submit-help')
    }

    findSubmit() {
        return cy.getBySel('submit')
    }

    typeFullName(value) {
        return cy.getBySel('full_name').click().type(value)
    }

    typeInitials(value) {
        return cy.getBySel('initials').click().type(value)
    }

    typePasswordConfirm(value) {
        return cy.getBySel('password_confirm').click().type(value)
    }

    typePassword(value) {
        return cy.getBySel('password').click().type(value)
    }

    typeUsername(value) {
        return cy.getBySel('username').click().type(value)
    }

}
