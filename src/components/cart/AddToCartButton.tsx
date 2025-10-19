'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
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
 * Client component that adds product to cart
 */
export function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      size="lg"
      className="flex-1"
      disabled={disabled || added}
      onClick={handleAddToCart}
    >
      {added ? '✓ Added to Cart!' : 'Add to Cart'}
    </Button>
  )
}
