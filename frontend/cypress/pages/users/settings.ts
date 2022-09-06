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

    findFullNameHelp() {
        return cy.getBySel('full-name-help')
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

    findSubmitHelp() {
        return cy.getBySel('submit-help')
    }

    findSubmit() {
        return cy.get('input[data-test="submit"]')
    }

}
