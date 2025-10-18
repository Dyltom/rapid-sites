'use client'

import { Container, Section } from '@/components/layout'

/**
 * Booking Section Props
 */
interface BookingSectionProps {
  title?: string
  description?: string
  calcomUsername?: string
  calcomUrl?: string
  eventSlug?: string
}

/**
 * Booking Section Component
 * Embed Cal.com booking calendar
 */
export function Booking({
  title = 'Book an Appointment',
  description = 'Choose a time that works for you',
  calcomUsername,
  calcomUrl,
  eventSlug = '30min',
}: BookingSectionProps) {
  // Build Cal.com embed URL
  const embedUrl = calcomUrl || `https://cal.com/${calcomUsername}/${eventSlug}`

  return (
    <Section padding="lg">
      <Container>
        {/* Header */}
        {(title || description) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {description && <p className="text-lg text-muted-foreground">{description}</p>}
          </div>
        )}

        {/* Cal.com Embed */}
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '120%', minHeight: '630px' }}>
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
              allow="payment"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
