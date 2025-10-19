import Link from 'next/link'
import { Container, Section } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

/**
 * Cart Page
 *
 * Shopping cart page (demo implementation)
 * In production, this would connect to Payload ecommerce cart
 */
export default function CartPage() {
  return (
    <>
      <Section padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            {/* Empty cart state */}
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Add some products from our store to get started!
              </p>
              <Button size="lg" asChild>
                <Link href="/store">Continue Shopping</Link>
              </Button>
            </Card>

            {/* Cart functionality info */}
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">🛍️ About the Cart</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This is a demo implementation. The Payload ecommerce plugin provides:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Persistent shopping carts (database-backed)</li>
                <li>✓ Cart synced across devices for logged-in users</li>
                <li>✓ LocalStorage fallback for guest users</li>
                <li>✓ Automatic cart recovery</li>
                <li>✓ Real-time inventory checking</li>
              </ul>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  To enable full cart functionality, configure the Payload ecommerce context in your app.
                  See the Payload ecommerce plugin documentation for details.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
