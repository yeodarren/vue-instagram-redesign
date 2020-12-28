describe('Login.vue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
    })
    it('registers user', () => {
        cy.get('[data-cy=toggle-form]').click()
        cy.get('[data-cy=register-username]').type('test').should('have.value', 'test')
        cy.get('[data-cy=register-email]').type('test@example.com').should('have.value', 'test@example.com')
        cy.get('[data-cy=register-password]').type('testing').should('have.value', 'testing')

        cy.get('[data-cy=register-form]').submit()
        cy.url().should('contain', 'http://localhost:8080/')

        cy.get('[data-cy=menu]').click()
        cy.get('[data-cy=logout]').click()
        cy.url().should('contain', 'http://localhost:8080/login')
    })

    it('logs user in and out', () => {
        cy.get('[data-cy=login-email]').type('test@example.com').should('have.value', 'test@example.com')
        cy.get('[data-cy=login-password]').type('testing').should('have.value', 'testing')

        cy.get('[data-cy=login-form]').submit()
        cy.url().should('contain', 'http://localhost:8080/')

        cy.get('[data-cy=menu]').click()
        cy.get('[data-cy=logout]').click()
        cy.url().should('contain', 'http://localhost:8080/login')
    })

    it('routes to reset password page', () => {
        cy.get('[data-cy=reset-password').click()
        cy.url().should('contain', 'http://localhost:8080/resetpassword')
    })
})