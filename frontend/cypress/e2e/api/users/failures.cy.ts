import userRequest from '../../../fixtures/api/users/valid-user.json'



describe('USER api failure checks', () => {

    it('/users - POST fails to create a duplicate User', function () {
        // Create an initial User
        cy.request('POST', '/api/users', userRequest).as('userRequest')
        cy.get('@userRequest').then(res => {
            expect(res.status).to.eq(201)
            this.user = res.body.user

            // Submit a duplicate request which should fail since the User already exists
            cy.request({ method: 'POST', url: '/api/users', body: userRequest, failOnStatusCode: false }).as('userRequest2')
            cy.get('@userRequest2').then(res => {
                expect(res.status).to.eq(403)

            })

            cy.request('DELETE', '/api/users/'+ this.user._id, userRequest).as('userRequest3')
            cy.get('@userRequest3').then(res => {
                expect(res.status).to.eq(200)
            })

        })

    })



    it('/users/login - POST should fail Login with invalid password', () => {

        // Should fail with an invalid password
        cy.request({ 
            method: 'POST', 
            url: '/api/users/login', 
            body: { username: userRequest.username, password: userRequest.password+"-invalid" }, 
            failOnStatusCode: false 
        }).as('invalidPassword')
        cy.get('@invalidPassword').then(res => {
            expect(res.status).to.eq(401)
        })
    })


    it('/users - PUT updates fail for an invalid (non-existent) User id', () => {
        cy.request({ 
            method: 'PUT', 
            url: '/api/users', 
            body: { _id: "0000000aa000a0aa00a000aa", initials: userRequest.initials +"1", full_name: userRequest.full_name +"1", 
            username: "test"+ userRequest.username },
            failOnStatusCode: false
        }).as('userRequest')
        cy.get('@userRequest').then(res => { expect(res.status).to.eq(403) })
    })


    it('/users/:id - DELETE deletes an existing User', () => {
        cy.request({ 
            method: 'DELETE', 
            url: `/api/users/0000000aa000a0aa00a000aa`, 
            failOnStatusCode: false
        }).as('userRequest')
        cy.get('@userRequest').then(res => {
            expect(res.status).to.eq(403)
        })
    })

})
