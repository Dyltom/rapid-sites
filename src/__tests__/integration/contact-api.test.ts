/**
 * Integration Tests for Contact API
 *
 * Tests the REAL contact endpoint with Zod validation and rate limiting
 */

import { describe, it, expect } from 'vitest'

const API_URL = process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'

describe('Contact API Integration', () => {
  describe('POST /api/contact', () => {
    it('should accept valid contact form submission', async () => {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Integration Test',
          email: 'test@example.com',
          message: 'This is a test message from integration tests',
        }),
      })

      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toHaveProperty('message')
    }, 10000)

    it('should reject invalid email with Zod validation', async () => {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'not-an-email',
          message: 'Test message',
        }),
      })

      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.errors).toBeDefined()
      expect(data.errors.some((e: any) => e.field === 'email')).toBe(true)
    }, 10000)

    it('should reject missing required fields', async () => {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '',
          email: 'test@example.com',
          message: '',
        }),
      })

      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    }, 10000)

    it('should reject message that is too short', async () => {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test',
          email: 'test@example.com',
          message: 'short', // Less than 10 characters
        }),
      })

      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.errors.some((e: any) => e.field === 'message')).toBe(true)
    }, 10000)
  })

  describe('Rate Limiting', () => {
    it('should allow requests within rate limit', async () => {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Rate Limit Test',
          email: 'ratelimit@example.com',
          message: 'Testing rate limiting functionality works correctly',
        }),
      })

      expect(response.status).toBeLessThan(429)
    }, 10000)
  })
})
