describe('Create.vue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })

    it('routes to create page after log in and creates post', () => {
        cy.get('[data-cy=login-email]').type('test@example.com').should('have.value', 'test@example.com')
        cy.get('[data-cy=login-password]').type('testing').should('have.value', 'testing')

        cy.get('[data-cy=login-form]').submit()
        cy.url().should('contain', 'http://localhost:8080/')

        cy.get('[data-cy=create-button]').click()
        cy.url().should('contain', 'http://localhost:8080/create')

        cy.get('[data-cy=caption]').type('VueJS')
        cy.get('[data-cy=file]').attachFile('logo.png')
        cy.get('[data-cy=create-form]').submit()
        cy.url().should('contain', 'http://localhost:8080/')
        cy.get('[data-cy=posts]').should('have.length.gte', 1)
    })
})