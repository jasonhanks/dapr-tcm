import { test, expect } from '@playwright/test'
import validLogin from '../../fixtures/api/users/login-valid.json'
import defaultProject from '../../fixtures/api/projects/default.json'


const TEXT_EMAIL_REQD     = 'Email address is required as your login.'
const TEXT_PASSWD_REUSE   = 'Never reuse or share your passwords with anyone.'
const TEXT_VALID_PASSWD   = 'Enter a valid password.'


test.describe('Login form validations', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.click("text=/Accept/") // Close the disclaimer for Firefox
  })


  test.describe('Client validations', () => {

    test('show errors by default', async ({ page }) => {
      await expect(page.locator('#submit')).toBeVisible()
      await expect(page.locator('#field-1-helptext')).toHaveText(TEXT_EMAIL_REQD)
      await expect(page.locator('#field-2-feedback')).toHaveText(TEXT_VALID_PASSWD)
    })

    test('changes Password help text when filled out', async ({ page }) => {
      await expect(page.locator('#field-1-helptext')).toHaveText(TEXT_EMAIL_REQD)
      await expect(page.locator('#field-2-feedback')).toHaveText(TEXT_VALID_PASSWD)
      await page.fill('#password', 'asdfasdf')
      await expect(page.locator('#field-2-helptext')).toHaveText(TEXT_PASSWD_REUSE)
    })

    test('show no errors when properly filled out', async ({ page }) => {
      await expect(page.locator('#field-1-helptext')).toHaveText(TEXT_EMAIL_REQD)
      await expect(page.locator('#field-2-feedback')).toHaveText(TEXT_VALID_PASSWD)
      await page.fill('#username', 'valid-user@gmail.com')
      await page.fill('#password', 'asdfasdf')
      await expect(page.locator("#field-1-helptext")).toHaveText(TEXT_EMAIL_REQD)
      await expect(page.locator('#field-2-helptext')).toHaveText(TEXT_PASSWD_REUSE)
    })

  })

})