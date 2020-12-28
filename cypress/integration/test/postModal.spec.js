describe('PostModal.vue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })

    it('opens post modal', () => {
        cy.get('[data-cy=login-email]').type('test@example.com').should('have.value', 'test@example.com')
        cy.get('[data-cy=login-password]').type('testing').should('have.value', 'testing')

        cy.get('[data-cy=login-form]').submit()
        cy.url().should('contain', 'http://localhost:8080/')

        cy.get('[data-cy=post]').first().click()
        cy.get('[data-cy=post-modal]').should('be.visible')
    })

    it('adds comment to comment section', () => {
        cy.get('[data-cy=post]').first().click()
        cy.get('[data-cy=post-modal]').should('be.visible')

        cy.get('[data-cy=comment]').type('Comment')
        cy.get('[data-cy=comment-form]').submit()

        cy.get('[data-cy=comments]').should('have.length.gte', 1)
    })
})