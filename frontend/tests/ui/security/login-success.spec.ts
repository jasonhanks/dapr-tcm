import { test, expect } from '@playwright/test'
import validLogin from '../../fixtures/api/users/login-valid.json'
import defaultProject from '../../fixtures/api/projects/default.json'


const TEXT_EMAIL_REQD     = 'Email address is required as your login.'
const TEXT_PASSWD_REUSE   = 'Never reuse or share your passwords with anyone.'


test.describe.configure({ mode: 'parallel' })
test.describe('Successful login', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.click("text=/Accept/") // Close the disclaimer for Firefox

    // Network intercept routes
    await page.route('**/api/users/login', async (route) => { await route.fulfill({ status: 401, body: '{}' })})
    await page.route('**/api/projects', async (route) => { await route.fulfill({ status: 200, body: JSON.stringify(defaultProject) }) })
  })


  test.describe('Successful login validations', async () => {

    test('API - navigates the user to the Dashboard with valid credentials', async ({ page }) => {
      // Network intercept route for valid login
      await page.route('**/api/users/login', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(validLogin) })
      })

      // Login the User with "valid" credentials
      await page.fill('#username', 'valid-user@gmail.com')
      await page.fill('#password', 'asdfasdf')
      await expect(page.locator('#field-1-helptext')).toHaveText(TEXT_EMAIL_REQD)
      await expect(page.locator('#field-2-helptext')).toHaveText(TEXT_PASSWD_REUSE)
      await page.click("#submit")

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