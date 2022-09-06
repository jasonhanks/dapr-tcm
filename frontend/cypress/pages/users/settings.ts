import '../../../cypress/support/commands'


export default class SettingsPage {

    clickSubmit() {
        return this.findSubmit().click()
    }

    findAlert() {
        return cy.get('div.chakra-alert')
    }

    findErrors() {
        return cy.get('[role=alert]')
    }

    findFullName() {
        return cy.getBySel('full-name')
    }

    findInitials() {
        return cy.getBySel('initials')
    }

    findUsernameHelp() {
        return cy.getBySel('username-help')
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
