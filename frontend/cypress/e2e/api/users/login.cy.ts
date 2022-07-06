import userRequest from '../../../fixtures/api/users/valid-user.json'


let user: any


describe('USER api validations', () => {

    it('/users - POST creates a new User', () => {
        cy.request('POST', '/api/users', userRequest).as('userRequest')
        cy.get('@userRequest').then(res => {
            expect(res.status).to.eq(200)
            user = res.body.user
        })
    })


    it('/users - GET retrives a list of Users', () => {
        cy.request('GET', '/api/users').as('usersRequest')
        cy.get('@usersRequest').then(res => {
            expect(res.status).to.eq(200)
            const users = res.body
            assert.isArray(users, 'User response is an array')
            expect(users[users.length-1]).to.deep.equal(user)
        })
    })


    it('/users/login - POST should Login a user', () => {
        cy.request('POST', '/api/users/login', { username: user.username, password: userRequest.password }).as('userRequest')
        cy.get('@userRequest').then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.user).to.deep.equal(user)
        })
    })


    it('/users - PUT updates an existing User', () => {
        cy.request('PUT', '/api/users', {
            _id: user._id,
            initials: user.initials +"1",
            full_name: user.full_name +"1",
            username: "test"+ user.username
        }).as('userRequest')
        cy.get('@userRequest').then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.user.initials).to.eq(user.initials+"1")
            expect(res.body.user.full_name).to.eq(user.full_name+"1")
            expect(res.body.user.username).to.eq("test"+ user.username)
        })
    })


    it('/users/:id - DELETE deletes an existing User', () => {
        cy.request('DELETE', '/api/users/'+ user._id, userRequest).as('userRequest')
        cy.get('@userRequest').then(res => {
            expect(res.status).to.eq(200)
            console.log(res.body)
        })
    })

})
