import '../../../cypress/support/commands'



export default class DashboardPage {

    findAccountMenuFullName() {
        return cy.getBySel('full_name')
    }

    findAccountMenuUsername() {
        return cy.getBySel('username')
    }
    
    findAccountMenuSettings() {
        return cy.getBySel('account-settings-link')
    }

    findAccountMenuToggleDarkMode() {
        return cy.getBySel('toggle-dark-light-link')
    }

    findAccountMenuSignoutLink() {
        return cy.getBySel('signout-link')
    }

    signoutUser() {
        return cy.getBySel('sigout-link').click()
    }

    findContentTitle() {
        return cy.getBySel('content-title')
    }

    findProjectSelector() {
        return cy.getBySel('project-select')
    }


    findTitle() {
        return cy.getBySel('title-text')
    }

    selectProject(text) {
        return cy.getBySel('project-select').select(text)
    }


    toggleAccountMenu() {
        return cy.getBySel('account-menu-button').click()
    }


}