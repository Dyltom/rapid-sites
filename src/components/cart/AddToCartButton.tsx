'use client'

import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

interface AddToCartButtonProps {
  product: {
    id: string
    slug: string
    name: string
    price: number
  }
  disabled?: boolean
}

/**
 * Add to Cart Button
 *
 * Client component that adds product to cart with toast notification
 */
export function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
    })

    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Button
      size="lg"
      className="flex-1"
      disabled={disabled}
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  )
}
