describe('Login.vue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/resetPassword')
    })
    it('registers user', () => {
        cy.get('[data-cy=reset-email]').type('test@example.com').should('have.value', 'test@example.com')

        cy.get('[data-cy=reset-form]').submit()
        cy.get('[data-cy=success]').should('be.visible')

        cy.get('[data-cy=return-button]').click()
        cy.url().should('contain', 'http://localhost:8080/login')
    })
})