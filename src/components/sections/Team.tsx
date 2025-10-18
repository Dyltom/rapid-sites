import Image from 'next/image'
import { Container, Grid, Section } from '@/components/layout'
import { Card } from '@/components/ui/card'
import type { TeamMember } from '@/types'

/**
 * Team Section Props
 */
interface TeamSectionProps {
  title?: string
  description?: string
  members: Array<Pick<TeamMember, 'name' | 'slug' | 'role' | 'bio' | 'avatar' | 'email' | 'social'>>
  columns?: 2 | 3 | 4
  showBio?: boolean
  showContact?: boolean
}

/**
 * Team Section Component
 * Display team members in a grid
 */
export function Team({
  title = 'Our Team',
  description,
  members,
  columns = 3,
  showBio = true,
  showContact = true,
}: TeamSectionProps) {
  if (members.length === 0) return null

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

        {/* Team Grid */}
        <Grid cols={columns} gap="lg">
          {members.map((member) => (
            <Card key={member.slug} className="p-6 text-center">
              {/* Avatar */}
              {member.avatar && (
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={member.avatar.url}
                    alt={member.avatar.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Name & Role */}
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{member.role}</p>

              {/* Bio */}
              {showBio && member.bio && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
              )}

              {/* Contact & Social */}
              {showContact && (
                <div className="flex justify-center gap-3 mt-4">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </a>
                  )}
                  {member.social?.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {member.social?.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} on Twitter`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
