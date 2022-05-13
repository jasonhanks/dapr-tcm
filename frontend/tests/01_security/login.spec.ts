import { test, expect } from '@playwright/test'
import validLogin from '../fixtures/api/users//login-valid.json'
import defaultProject from '../fixtures/api/projects/default.json'


test.describe('Login form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    // Network intercept routes
    await page.route('**/api/users/login', async (route) => { await route.fulfill({ status: 401, body: '{}' })})
    await page.route('**/api/projects', (route) => { route.fulfill({ status: 200, body: JSON.stringify(defaultProject) }) })
  })


  test.describe('Form validations', () => {

    test('show errors by default', async ({ page }) => {
      await expect(page.locator('#login')).toBeVisible()
      await expect(page.locator('#field-1-helptext')).toHaveText("Email address is required as your login.")
      await expect(page.locator('#field-2-feedback')).toHaveText("Enter a valid password.")
    })

    test('changes Password help text when filled out', async ({ page }) => {
      await expect(page.locator('#field-1-helptext')).toHaveText("Email address is required as your login.")
      await expect(page.locator('#field-2-feedback')).toHaveText("Enter a valid password.")
      await page.fill('#password', 'asdfasdf')
      await expect(page.locator('#field-2-helptext')).toHaveText("Never reuse or share your passwords with anyone.")
    })

    test('show no errors when properly filled out', async ({ page }) => {
      await expect(page.locator('#field-1-helptext')).toHaveText("Email address is required as your login.")
      await expect(page.locator('#field-2-feedback')).toHaveText("Enter a valid password.")
      await page.fill('#username', 'valid-user@gmail.com')
      await page.fill('#password', 'asdfasdf')
      await expect(page.locator("#field-1-helptext")).toHaveCount(0)
      await expect(page.locator('#field-2-helptext')).toHaveText("Never reuse or share your passwords with anyone.")
    })

  })


  test.describe('Error validations', () => {

    test('API - when using an empty username', async ({ page }) => {
      await page.fill('#password', 'asdfasdf')
      await page.click('#login')
      await expect(page.locator('#errors')).toHaveText("Invalid username or password")
    })
  
    test('API - when using username is not an email address', async ({ page }) => {
      await expect(page.locator('#login')).toBeVisible()
      await page.fill('#username', 'not-an-email-address')
      await page.fill('#password', 'asdfasdf')
      await page.click("#login")
      await expect(page.locator("#errors")).toHaveText("Invalid username or password")
    })
  
    test('API - when using an empty password', async ({ page }) => {
      await page.fill('#username', 'valid-email@gmail.com')
      await page.click("#login")
      await expect(page.locator("#errors")).toHaveText("Invalid username or password")
    })
  
    test('API - when Submitting an empty form', async ({ page }) => {
      await page.click("#login")
      await expect(page.locator("#errors")).toHaveText("Invalid username or password")
    })

  })


  test.describe('API - successful login validations', async () => {

    test('navigates the user to the Dashboard with valid credentials', async ({ page }) => {
      // Network intercept route for valid login
      await page.route('**/api/users/login', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(validLogin) })
      })

      // Login the User with "valid" credentials
      await page.fill('#username', 'valid-user@gmail.com')
      await page.fill('#password', 'asdfasdf')
      await expect(page.locator('#field-1-helptext')).toHaveCount(0)
      await expect(page.locator('#field-2-helptext')).toHaveText("Never reuse or share your passwords with anyone.")
      await page.click("#login")

      // Make sure we are logged in successfully
      await expect(page.locator("#root > div:nth-child(2) > div > div > p")).toHaveText("TRAC TCM")
      await expect(page.locator("#root > div:nth-child(2) > p")).toHaveText("Home")
      await expect(page.locator('select.chakra-select')).toBeEnabled()
      await expect(page.locator('select.chakra-select')).toHaveText('Default Project')


      // // Open the User Menu and validate it
      await expect(page.locator('#menu-button-19')).toHaveClass(/chakra-button/)
      await page.click('#menu-button-19')
      await expect(page.locator('#menu-list-19 > :nth-child(3) > :nth-child(1) > :nth-child(1)')).toHaveText('Valid User')
      await expect(page.locator(':nth-child(3) > :nth-child(1) > :nth-child(2)')).toHaveText('valid-user@gmail.com')

      await expect(page.locator('#menu-list-19-menuitem-15')).toHaveText('Account Settings')
      await expect(page.locator('#menu-list-19-menuitem-16')).toHaveText('Toggle Light / Dark Mode')
      await expect(page.locator('#menu-list-19-menuitem-17')).toHaveText('Sign Out')
      await page.click('#menu-button-19')
    })

  })

})