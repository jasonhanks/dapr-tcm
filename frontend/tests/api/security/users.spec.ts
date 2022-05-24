import { test, expect } from '@playwright/test'

import * as Factory from "factory.ts"

import { IUser } from '../../../../backend/src/models/user'


const userFactory = Factory.Sync.makeFactory<IUser>({
    username: Factory.each((i) => `test-user-${i}@example.com`),
    initials: Factory.each((i) => `BS${i}`),
    full_name: Factory.each((i) => `Bob Smith${i}`),
    password: 'asdfasdf',
    is_admin: false
})



let user


test.describe('validate successful logins', async () => {


    test.afterAll(async ({ request }) => {
        const response = await request.delete(`/api/users/${user._id}`)
        expect(response.ok()).toBeTruthy()
    })

    test.beforeAll(async ({ request }) => {
        const u = await userFactory.build()
        const data = {
            ...u,
            password_confirm: 'asdfasdf'
        }
        const response = await request.post('/api/users', {
            data: data
        })
        expect(response.ok()).toBeTruthy()
        user = (await response.json()).user
    })


    test('should create and remove users', async ({ request }) => {
        console.log(`Testing setup and teardown`)
    })

})
