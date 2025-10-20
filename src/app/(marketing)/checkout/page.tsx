'use client'

import Link from 'next/link'
import { Container, Section } from '@/components/layout'
import { Navigation, Footer } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/lib/utils'

/**
 * Checkout Page
 *
 * Handles checkout flow with order summary
 * Ready for Stripe integration via Payload ecommerce plugin
 */
export default function CheckoutPage() {
  const { items, itemCount, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation logoText="Rapid Sites" items={[{ href: '/', label: 'Home' }, { href: '/store', label: 'Store' }]} />
        <main className="flex-1">
          <Section padding="lg">
            <Container>
              <div className="max-w-2xl mx-auto text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h1 className="text-3xl font-bold mb-4">No items in cart</h1>
                <p className="text-muted-foreground mb-8">
                  Add some products to your cart before checking out
                </p>
                <Button size="lg" asChild>
                  <Link href="/store">Continue Shopping</Link>
                </Button>
              </div>
            </Container>
          </Section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation logoText="Rapid Sites" items={[{ href: '/', label: 'Home' }, { href: '/store', label: 'Store' }]} />
      <main className="flex-1">
        <Section padding="lg">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">Checkout</h1>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St" />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="NY" />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" placeholder="10001" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <div className="p-6 bg-muted rounded-lg text-center">
                      <div className="text-4xl mb-2">💳</div>
                      <p className="font-semibold mb-2">Stripe Integration Ready</p>
                      <p className="text-sm text-muted-foreground">
                        Payment processing via Payload ecommerce plugin + Stripe
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="p-6 sticky top-4">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-4 border-b">
                          <div className="w-16 h-16 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl flex-shrink-0">
                            {item.name.includes('Coffee') && '☕'}
                            {item.name.includes('Tea') && '🍵'}
                            {item.name.includes('Mug') && '🍺'}
                            {item.name.includes('Grinder') && '⚙️'}
                            {item.name.includes('Press') && '🫖'}
                            {item.name.includes('Infuser') && '🌿'}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-sm">
                            {formatCurrency(item.price * item.quantity, 'USD')}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>{formatCurrency(total, 'USD')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span className="text-success">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>Total</span>
                        <span>{formatCurrency(total, 'USD')}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button className="w-full" size="lg" disabled>
                        Complete Order (Demo)
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/cart">← Back to Cart</Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
