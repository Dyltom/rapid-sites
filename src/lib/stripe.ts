/**
 * Stripe Integration
 * Payment processing utilities
 */

import Stripe from 'stripe'

/**
 * Server-side Stripe instance
 */
export const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] || '', {
  apiVersion: '2025-09-30.clover',
  typescript: true,
})

/**
 * Create Stripe checkout session
 * @param params - Session parameters
 * @returns Checkout session
 */
export async function createCheckoutSession(params: {
  productId: string
  productName: string
  price: number
  currency?: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: params.currency || 'usd',
          product_data: {
            name: params.productName,
          },
          unit_amount: Math.round(params.price * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: params.metadata,
  })

  return session
}

/**
 * Verify Stripe webhook signature
 * @param payload - Request body
 * @param signature - Stripe signature header
 * @returns Verified event
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env['STRIPE_WEBHOOK_SECRET'] || ''

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}
