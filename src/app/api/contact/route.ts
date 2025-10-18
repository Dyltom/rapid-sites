import { NextRequest } from 'next/server'
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  parseRequestBody,
  withErrorHandler,
} from '@/lib/api'
import { sendContactFormEmail } from '@/lib/email'
import { isValidEmail } from '@/lib/validation'

/**
 * Contact Form Submission API
 */
async function handleContactSubmission(request: NextRequest) {
  const body = await parseRequestBody<{
    name: string
    email: string
    phone?: string
    message: string
  }>(request)

  if (!body) {
    return errorResponse('Invalid request body', 'INVALID_BODY', 400)
  }

  // Validation
  const errors = []
  if (!body.name || body.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' })
  }
  if (!body.email || !isValidEmail(body.email)) {
    errors.push({ field: 'email', message: 'Valid email is required' })
  }
  if (!body.message || body.message.trim().length === 0) {
    errors.push({ field: 'message', message: 'Message is required' })
  }

  if (errors.length > 0) {
    return validationErrorResponse(errors)
  }

  // TODO: Get tenant from context
  const tenantEmail = process.env['CONTACT_EMAIL'] || 'contact@rapidsites.dev'
  const tenantName = 'Rapid Sites' // TODO: Get from tenant context

  try {
    // Send email
    await sendContactFormEmail({
      from: process.env['EMAIL_FROM'] || 'noreply@rapidsites.dev',
      to: tenantEmail,
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      tenantName,
    })

    // TODO: Save to database (ContactSubmission collection)

    return successResponse({
      message: "Thank you for your message. We'll be in touch soon!",
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return errorResponse('Failed to send message. Please try again.', 'EMAIL_ERROR', 500)
  }
}

export const POST = withErrorHandler(handleContactSubmission)
