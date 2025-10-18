'use client'

import { useState } from 'react'
import { Container, Grid, Section } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

/**
 * Contact Section Props
 */
interface ContactSectionProps {
  title?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  showMap?: boolean
}

/**
 * Contact Section Component
 * Contact form with optional contact information
 */
export function Contact({
  title = 'Get in Touch',
  description,
  email,
  phone,
  address,
  showMap = false,
}: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (response.ok) {
        setFormState({ name: '', email: '', phone: '', message: '' })
        alert(data.data?.message || 'Message sent successfully!')
      } else {
        alert(data.message || 'Failed to send message')
      }
    } catch {
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Section padding="lg">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && <p className="text-lg text-muted-foreground">{description}</p>}
        </div>

        <Grid cols={showMap || email || phone || address ? 2 : 1} gap="lg">
          {/* Contact Form */}
          <Card className="p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  disabled={submitting}
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          {(email || phone || address || showMap) && (
            <div className="space-y-6">
              {(email || phone || address) && (
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {email && (
                      <div>
                        <p className="text-sm font-medium mb-1">Email</p>
                        <a
                          href={`mailto:${email}`}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {email}
                        </a>
                      </div>
                    )}
                    {phone && (
                      <div>
                        <p className="text-sm font-medium mb-1">Phone</p>
                        <a
                          href={`tel:${phone}`}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {phone}
                        </a>
                      </div>
                    )}
                    {address && (
                      <div>
                        <p className="text-sm font-medium mb-1">Address</p>
                        <p className="text-muted-foreground">{address}</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {showMap && (
                <Card className="p-6 h-64">
                  <div className="w-full h-full bg-muted rounded flex items-center justify-center text-muted-foreground">
                    Map Placeholder
                  </div>
                </Card>
              )}
            </div>
          )}
        </Grid>
      </Container>
    </Section>
  )
}
