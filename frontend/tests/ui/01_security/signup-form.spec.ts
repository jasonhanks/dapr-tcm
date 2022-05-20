import { test, expect } from '@playwright/test'


test.describe.configure({ mode: 'parallel' })
test.describe('Signup form', () => {
  
    test.beforeEach(async ({ page }) => {
      await page.goto('/')  // Navigate to the Signup screen
      await page.click("text=/Accept/") //Close the disclaimer for Firefox
      await page.click("text=/Click here to Sign Up/")
      await expect(page.locator('text=Signup for Account')).toBeVisible()
    })
  
    
    test.describe('Form validations', () => {
  
      test('show help text by default', async ({ page }) => {
        await expect(page.locator('#submit')).toBeVisible()
        await expect(page.locator('#field-1-helptext')).toHaveText("Enter the email you'd like to use as your login.")
        await expect(page.locator('#field-2-helptext')).toHaveText("Enter your preferred full name to use.")
        await expect(page.locator('#field-3-helptext')).toHaveText("Enter your preferred short name / initials to use.")
        await expect(page.locator('#field-4-helptext')).toHaveText('Never reuse or share your passwords.')
        await expect(page.locator('#field-5-helptext')).toHaveText("Please confirm your new password.")
      })
      
    })

  
})  
