import { test, expect } from '@playwright/test'

import defaultProject from '../../fixtures/api/projects/default.json'
import validSignup from '../../fixtures/api/users/signup-valid.json'


test.describe('Signup form', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/')  // Navigate to the Signup screen
      await page.click("text=/Accept/") //Close the disclaimer for Firefox
      await page.click("text=/Click here to Sign Up/")
      await expect(page.locator('text=Signup for Account')).toBeVisible()
    })
  
    
    test('Validate successful Signup', async ({ page }) => {
      await page.route('**/api/projects', async (route) => { await route.fulfill({ status: 200, body: JSON.stringify(defaultProject) }) })
      await page.route('**/api/users/', async (route) => { await route.fulfill({ status: 200, body: JSON.stringify(validSignup) })})
      await page.fill('#username', 'valid-user@example.com')
      await page.fill('#initials', 'VU')
      await page.fill('#full_name', 'Valid User')
      await page.fill('#password', 'asdfasdf')
      await page.fill('#password_confirm', 'asdfasdf')
      await page.locator('#submit').click()

      // Make sure we are logged in successfully
      await expect(page.locator("#root > div:nth-child(2) > div > div > p")).toHaveText("TRAC TCM")
      await expect(page.locator("#root > div:nth-child(2) > p")).toHaveText("Home")
      await expect(page.locator('select.chakra-select')).toBeEnabled()
      await expect(page.locator('select.chakra-select')).toHaveText('Default Project')
    })
  
})  
