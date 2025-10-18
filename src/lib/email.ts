/**
 * Email Service
 * Send transactional emails via Resend
 */

import { Resend } from 'resend'

const resend = new Resend(process.env['RESEND_API_KEY'] || '')

/**
 * Send contact form email
 * @param params - Email parameters
 */
export async function sendContactFormEmail(params: {
  from: string
  to: string
  name: string
  email: string
  phone?: string
  message: string
  tenantName: string
}) {
  const { data, error } = await resend.emails.send({
    from: params.from,
    to: params.to,
    subject: `New Contact Form Submission from ${params.tenantName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${params.name}</p>
      <p><strong>Email:</strong> ${params.email}</p>
      ${params.phone ? `<p><strong>Phone:</strong> ${params.phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${params.message.replace(/\n/g, '<br>')}</p>
    `,
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}

/**
 * Send newsletter confirmation email
 * @param params - Email parameters
 */
export async function sendNewsletterConfirmation(params: {
  from: string
  to: string
  name?: string
  tenantName: string
}) {
  const { data, error } = await resend.emails.send({
    from: params.from,
    to: params.to,
    subject: `Welcome to ${params.tenantName} Newsletter`,
    html: `
      <h2>Thanks for Subscribing!</h2>
      ${params.name ? `<p>Hi ${params.name},</p>` : '<p>Hi there,</p>'}
      <p>You've successfully subscribed to our newsletter.</p>
      <p>We'll keep you updated with our latest news and updates.</p>
      <p>Thanks,<br>${params.tenantName}</p>
    `,
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}

/**
 * Send order confirmation email
 * @param params - Email parameters
 */
export async function sendOrderConfirmation(params: {
  from: string
  to: string
  name: string
  orderId: string
  total: string
  tenantName: string
}) {
  const { data, error } = await resend.emails.send({
    from: params.from,
    to: params.to,
    subject: `Order Confirmation - ${params.orderId}`,
    html: `
      <h2>Order Confirmed!</h2>
      <p>Hi ${params.name},</p>
      <p>Thank you for your order!</p>
      <p><strong>Order ID:</strong> ${params.orderId}</p>
      <p><strong>Total:</strong> ${params.total}</p>
      <p>We'll send you another email when your order ships.</p>
      <p>Thanks,<br>${params.tenantName}</p>
    `,
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}
