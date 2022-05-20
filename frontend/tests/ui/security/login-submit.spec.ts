import { test, expect } from '@playwright/test'
import validLogin from '../../fixtures/api/users/login-valid.json'
import defaultProject from '../../fixtures/api/projects/default.json'


const TEXT_EMAIL_REQD     = 'Email address is required as your login.'
const TEXT_INVALID_LOGIN  = 'Invalid username or password'
const TEXT_PASSWD_REUSE   = 'Never reuse or share your passwords with anyone.'


test.describe.configure({ mode: 'parallel' })
test.describe('Login form submissions', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.click("text=/Accept/") // Close the disclaimer for Firefox

    // Network intercept routes
    await page.route('**/api/users/login', async (route) => { await route.fulfill({ status: 401, body: '{}' })})
    await page.route('**/api/projects', async (route) => { await route.fulfill({ status: 200, body: JSON.stringify(defaultProject) }) })
  })


  test.describe('Error validations', () => {

    test('API - when using an empty username', async ({ page }) => {
      await page.fill('#password', 'asdfasdf')
      await page.click('#submit')
      await expect(page.locator('#errors')).toHaveText(TEXT_INVALID_LOGIN)
    })
  
    test('API - when using username is not an email address', async ({ page }) => {
      await expect(page.locator('#submit')).toBeVisible()
      await page.fill('#username', 'not-an-email-address')
      await page.fill('#password', 'asdfasdf')
      await page.click("#submit")
      await expect(page.locator("#errors")).toHaveText(TEXT_INVALID_LOGIN)
    })
  
    test('API - when using an empty password', async ({ page }) => {
      await page.fill('#username', 'valid-email@gmail.com')
      await page.click("#submit")
      await expect(page.locator("#errors")).toHaveText(TEXT_INVALID_LOGIN)
    })
  
    test('API - when Submitting an empty form', async ({ page }) => {
      await page.click("#submit")
      await expect(page.locator("#errors")).toHaveText(TEXT_INVALID_LOGIN)
    })

  })


})