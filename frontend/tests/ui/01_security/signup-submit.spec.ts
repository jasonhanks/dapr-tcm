import { test, expect } from '@playwright/test'

import defaultProject from '../../fixtures/api/projects/default.json'

import invalidSignupAll from '../../fixtures/api/users/signup-invalid-all.json'
import invalidSignupEmail from '../../fixtures/api/users/signup-invalid-email.json'
import invalidSignupInitials from '../../fixtures/api/users/signup-invalid-initials.json'
import invalidSignupPassword from '../../fixtures/api/users/signup-invalid-password.json'
import invalidSignupPasswordConfirm from '../../fixtures/api/users/signup-invalid-password-confirm.json'
import invalidSignupPassworsMismatch from '../../fixtures/api/users/signup-invalid-password-mismatch.json'


test.describe.configure({ mode: 'parallel' })
test.describe('Signup form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')  // Navigate to the Signup screen
    await page.click("text=/Accept/") //Close the disclaimer for Firefox
    await page.click("text=/Click here to Sign Up/")
    await expect(page.locator('text=Signup for Account')).toBeVisible()
  })

  
  test.describe('Form submission valdations',() => {

    test('shows an error message for all required inputs with nothing filled out', async ({ page }) => {
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupAll) })})
      const errorMessage: string = "\
            Email must be a valid working email address\n\
            Initials must be between 2 and 5 chars long\n\
            Passwords must be at least 8 chars long\n\
            Password confirmations must be at least 8 chars long\n\
            Full name must at least 4 chars long\n\
        "
        await page.locator('#submit').click()
        await expect(page.locator('#errors')).toHaveText(errorMessage)
    })


    test('shows an error if email is invalid', async ({ page }) => {
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupEmail) })})

        await page.fill('#initials', 'VU')
        await page.fill('#full_name', 'Valid User')
        await page.fill('#password', 'asdfasdf')
        await page.fill('#password_confirm', 'asdfasdf')

        // Check for blank values
        await page.fill('#username', '')
        await page.locator('#submit').click()
        await expect(page.locator('#errors')).toHaveText("Email must be a valid working email address")

        // Make sure it requires a domain
        await page.fill('#username', 'invald-email-address')
        await page.locator('#submit').click()
        await expect(page.locator('#errors')).toHaveText("Email must be a valid working email address")

        // Make sure it's a valid formatted domain
        await page.fill('#username', 'invald-email-address@invalid')
        await page.locator('#submit').click()
        await expect(page.locator('#errors')).toHaveText("Email must be a valid working email address")
    })


    test('shows an error if initials is invalid', async ({ page }) => {
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupInitials) })})

      // Fill out form with valid values
        await page.fill('#username', 'valid-email-address@example.com')
        await page.fill('#full_name', 'Valid User')
        await page.fill('#password', 'asdfasdf')
        await page.fill('#password_confirm', 'asdfasdf')

        // Blanks are not allowed
        await page.fill('#initials', '')
        await page.locator('#submit').click()
        await expect(page.locator('#errors')).toHaveText("Initials must be between 2 and 5 chars long")

        // Must be at least 2 characters long
        await page.fill('#initials', 'I')
        await page.locator('#submit').click()
        await expect(page.locator('#errors')).toHaveText("Initials must be between 2 and 5 chars long")

        // Must be at most 5 characters long
        await page.fill('#initials', 'ABCDEF')
        await page.locator('#submit').click()
        await expect(page.locator('#errors')).toHaveText("Initials must be between 2 and 5 chars long")
    })


    test('shows an error if passwords are not valid', async ({ page }) => {
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupPassword) })})
      await page.fill('#username', 'valid-user@gmail.com')
      await page.fill('#initials', 'VU')
      await page.fill('#full_name', 'Valid User')
      await page.fill('#password_confirm', 'asdfasdf')

      // Do not allow blanks
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupPassword) })})
      await page.fill('#password', invalidSignupPassword.errors[1].value)
      await page.locator('#submit').click()
      await expect(page.locator('#errors')).toHaveText("Passwords must be at least 8 chars long\nPassword and confirmation password must match")

      // Password is too short (boundary)
      invalidSignupPassword.errors[1].value = "1234567"
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupPassword) })})
      await page.fill('#password', invalidSignupPassword.errors[1].value)
      await page.locator('#submit').click()
      await expect(page.locator('#errors')).toHaveText("Passwords must be at least 8 chars long\nPassword and confirmation password must match")
    })


    test('shows an error if confirmation passwords are not valid', async ({ page }) => {
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupPasswordConfirm) })})
      await page.fill('#username', 'valid-user@gmail.com')
      await page.fill('#initials', 'VU')
      await page.fill('#full_name', 'Valid User')
      await page.fill('#password', 'asdfasdf')

      // Do not allow blanks
      await page.fill('#password_confirm', '')
      await page.locator('#submit').click()
      await expect(page.locator('#errors')).toHaveText("Password confirmations must be at least 8 chars long\nPassword and confirmation password must match")

      // Password is too short (boundary)
      invalidSignupPasswordConfirm.errors[1].value = "1234567"
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupPasswordConfirm) })})
      await page.fill('#password_confirm', invalidSignupPasswordConfirm.errors[1].value)
      await page.locator('#submit').click()
      await expect(page.locator('#errors')).toHaveText("Password confirmations must be at least 8 chars long\nPassword and confirmation password must match")
    })


    test('shows an error if passwords do not match', async ({ page }) => {
      await page.fill('#username', 'valid-user@gmail.com')
      await page.fill('#initials', 'VU')
      await page.fill('#full_name', 'Valid User')
      await page.fill('#password', 'asdfasdf')

      // Correct lengths but match
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 403, body: JSON.stringify(invalidSignupPassworsMismatch) })})
      await page.fill('#password_confirm', invalidSignupPassworsMismatch.errors[0].value)
      await page.locator('#submit').click()
      await expect(page.locator('#errors')).toHaveText("Password and confirmation password must match")
    })

  })

})  
