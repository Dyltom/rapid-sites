import Link from 'next/link'
import { Container, Section, Grid } from '@/components/layout'
import { SectionHeader } from '@/components/sections'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

/**
 * Store/Shop Page - Working Ecommerce Demo
 *
 * Displays products from Payload CMS ecommerce plugin
 * Shows complete store functionality
 */

// Mock products for demo (replace with Payload fetch when DB is fully working)
const demoProducts = [
  {
    id: '1',
    slug: 'premium-coffee-beans',
    name: 'Premium Coffee Beans',
    description: 'Organic, fair-trade coffee beans from Colombia',
    price: 24.99,
    compareAtPrice: 29.99,
    stock: 50,
    featured: true,
    images: [],
  },
  {
    id: '2',
    slug: 'artisan-tea-collection',
    name: 'Artisan Tea Collection',
    description: 'Curated selection of premium loose-leaf teas',
    price: 34.99,
    stock: 30,
    featured: true,
    images: [],
  },
  {
    id: '3',
    slug: 'handcrafted-mug',
    name: 'Handcrafted Mug',
    description: 'Beautiful ceramic mug by local artisans',
    price: 18.99,
    stock: 25,
    featured: false,
    images: [],
  },
  {
    id: '4',
    slug: 'french-press',
    name: 'French Press Coffee Maker',
    description: 'Premium stainless steel french press',
    price: 45.99,
    stock: 15,
    featured: false,
    images: [],
  },
  {
    id: '5',
    slug: 'tea-infuser-set',
    name: 'Tea Infuser Set',
    description: 'Set of 3 premium stainless steel infusers',
    price: 22.99,
    stock: 40,
    featured: false,
    images: [],
  },
  {
    id: '6',
    slug: 'coffee-grinder',
    name: 'Burr Coffee Grinder',
    description: 'Professional grade burr grinder',
    price: 89.99,
    compareAtPrice: 99.99,
    stock: 10,
    featured: true,
    images: [],
  },
]

export default async function StorePage() {
  // TODO: Fetch from Payload API when fully configured
  // const payload = await getPayload({ config })
  // const { docs: products } = await payload.find({
  //   collection: 'products',
  //   where: { status: { equals: 'published' } },
  //   limit: 20,
  // })

  const products = demoProducts

  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" background="muted">
        <Container>
          <SectionHeader
            title="Our Store"
            description="Discover our curated collection of premium products. Complete ecommerce powered by Payload CMS."
          />

          <div className="flex gap-4 justify-center mb-8">
            <Badge variant="default">🛒 Ecommerce Plugin Active</Badge>
            <Badge variant="default">💳 Stripe Ready</Badge>
            <Badge variant="default">🌍 Multi-Currency</Badge>
            <Badge variant="default">📦 Inventory Tracking</Badge>
          </div>
        </Container>
      </Section>

      {/* Products Grid */}
      <Section padding="lg">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Products</h2>
            <p className="text-muted-foreground">{products.length} products available</p>
          </div>

          <Grid cols={3} gap="lg">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/store/${product.slug}`}>
                  {/* Product Image Placeholder */}
                  <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      {product.name.includes('Coffee') && '☕'}
                      {product.name.includes('Tea') && '🍵'}
                      {product.name.includes('Mug') && '🍺'}
                      {product.name.includes('Grinder') && '⚙️'}
                      {product.name.includes('Press') && '🫖'}
                      {product.name.includes('Infuser') && '🌿'}
                    </div>
                    {product.featured && (
                      <Badge className="absolute top-2 right-2">Featured</Badge>
                    )}
                    {product.compareAtPrice && (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        Sale
                      </Badge>
                    )}
                    {product.stock === 0 && (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  <div className="p-4">
                    {/* Product Name */}
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold">
                        {formatCurrency(product.price, 'USD')}
                      </span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatCurrency(product.compareAtPrice, 'USD')}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4 text-sm">
                      {product.stock > 20 && (
                        <span className="text-success">✓ In Stock ({product.stock} available)</span>
                      )}
                      {product.stock > 0 && product.stock <= 20 && (
                        <span className="text-warning">⚠️ Low Stock ({product.stock} left)</span>
                      )}
                      {product.stock === 0 && (
                        <span className="text-destructive">✗ Out of Stock</span>
                      )}
                    </div>

                    {/* CTA */}
                    <Button
                      className="w-full"
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'View Details'}
                    </Button>
                  </div>
                </Link>
              </Card>
            ))}
          </Grid>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🛒</div>
              <h3 className="font-semibold mb-2">Complete Ecommerce</h3>
              <p className="text-sm text-muted-foreground">
                Orders, Carts, Variants, Transactions from Payload plugin
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💳</div>
              <h3 className="font-semibold mb-2">Stripe Integration</h3>
              <p className="text-sm text-muted-foreground">
                Secure payment processing ready to configure
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <h3 className="font-semibold mb-2">Inventory Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Real-time stock levels and low stock alerts
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Admin CTA */}
      <Section padding="lg" background="accent">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Manage Your Store</h2>
            <p className="text-lg mb-8 opacity-90">
              Visit the admin panel to create products, manage orders, and configure your store
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" variant="default">
                <Link href="/admin/collections/products">Manage Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/admin/collections/orders">View Orders</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
