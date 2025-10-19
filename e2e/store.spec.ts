import { test, expect } from '@playwright/test'

test.describe('Store E2E Tests', () => {
  test('should load store page with products', async ({ page }) => {
    await page.goto('/store')

    // Check page loaded
    await expect(page).toHaveTitle(/Rapid Sites/)

    // Check header
    await expect(page.getByRole('heading', { name: /Our Store/i })).toBeVisible()

    // Check at least one product is visible
    await expect(page.getByText(/Premium Coffee Beans/i)).toBeVisible()

    // Check prices display
    await expect(page.getByText(/\$24.99/)).toBeVisible()
  })

  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('/store')

    // Click first "View Details" button
    await page.getByRole('button', { name: /View Details/i }).first().click()

    // Should navigate to product page
    await expect(page).toHaveURL(/\/store\/.+/)

    // Should show "Add to Cart" button
    await expect(page.getByRole('link', { name: /Add to Cart/i })).toBeVisible()

    // Should show "Back to Store" button
    await expect(page.getByRole('link', { name: /Back to Store/i })).toBeVisible()
  })

  test('should navigate from product to cart', async ({ page }) => {
    await page.goto('/store/premium-coffee-beans')

    // Click Add to Cart
    await page.getByRole('link', { name: /Add to Cart/i }).click()

    // Should navigate to cart
    await expect(page).toHaveURL('/cart')

    // Should show cart page
    await expect(page.getByRole('heading', { name: /Shopping Cart/i })).toBeVisible()
  })

  test('should navigate back from cart to store', async ({ page }) => {
    await page.goto('/cart')

    // Click Continue Shopping
    await page.getByRole('link', { name: /Continue Shopping/i }).click()

    // Should navigate to store
    await expect(page).toHaveURL('/store')

    // Should show products
    await expect(page.getByText(/Premium Coffee Beans/i)).toBeVisible()
  })

  test('should show correct product information on detail page', async ({ page }) => {
    await page.goto('/store/premium-coffee-beans')

    // Check product name
    await expect(page.getByRole('heading', { name: /Premium Coffee Beans/i })).toBeVisible()

    // Check price
    await expect(page.getByText(/\$24.99/)).toBeVisible()

    // Check stock status
    await expect(page.getByText(/In Stock/i)).toBeVisible()

    // Check SKU
    await expect(page.getByText(/SKU:/)).toBeVisible()
  })

  test('should display sale badge for discounted products', async ({ page }) => {
    await page.goto('/store')

    // Check for sale badges on products with compareAtPrice
    const saleBadges = page.getByText('Sale')
    await expect(saleBadges.first()).toBeVisible()
  })

  test('should show stock indicators', async ({ page }) => {
    await page.goto('/store')

    // Should show stock status
    await expect(page.getByText(/In Stock/i).first()).toBeVisible()
  })
})
