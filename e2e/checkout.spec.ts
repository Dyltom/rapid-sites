import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
  test('should load checkout page with cart items', async ({ page }) => {
    // Add item to cart first
    await page.goto('/store')
    await page.evaluate(() => localStorage.clear())
    await page.goto('/store/premium-coffee-beans')
    await page.getByRole('button', { name: /Add to Cart/i }).click()
    await page.waitForTimeout(100)

    // Navigate to checkout
    await page.goto('/checkout')

    // Should show checkout page
    await expect(page.getByRole('heading', { name: /Checkout/i })).toBeVisible()

    // Should show order summary
    await expect(page.getByText(/Order Summary/i)).toBeVisible()
    await expect(page.getByText(/Premium Coffee Beans/i)).toBeVisible()
  })

  test('should show empty state when no items in cart', async ({ page }) => {
    await page.goto('/store')
    await page.evaluate(() => localStorage.clear())

    await page.goto('/checkout')

    // Should redirect or show empty state
    await expect(page.getByText(/Your cart is empty|No items in cart/i)).toBeVisible()
  })

  test('should navigate to checkout from cart drawer', async ({ page }) => {
    // Add item to cart
    await page.goto('/store')
    await page.evaluate(() => localStorage.clear())
    await page.goto('/store/premium-coffee-beans')
    await page.getByRole('button', { name: /Add to Cart/i }).click()
    await page.waitForTimeout(100)

    // Open cart drawer
    await page.goto('/store')
    await page.getByRole('button', { name: /cart/i }).first().click()

    // Click "Proceed to Checkout" in drawer
    await page.getByRole('link', { name: /Proceed to Checkout/i }).click()

    // Should navigate to checkout
    await expect(page).toHaveURL('/checkout')
  })
})
