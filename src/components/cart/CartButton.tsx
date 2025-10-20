'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'

/**
 * Cart Button Component
 *
 * Shows cart item count and links to cart page
 * Uses localStorage-based cart (ready for Payload ecommerce integration)
 * Includes pulse animation when items are added
 */
export function CartButton() {
  const { itemCount } = useCart()
  const [prevCount, setPrevCount] = useState(itemCount)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (itemCount > prevCount && itemCount > 0) {
      // Item was added, trigger animation
      setAnimate(true)
      setTimeout(() => setAnimate(false), 600)
    }
    setPrevCount(itemCount)
  }, [itemCount, prevCount])

  return (
    <Button variant="outline" size="sm" asChild className="relative">
      <Link href="/cart">
        🛒 Cart
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className={`absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs transition-all ${
              animate ? 'animate-ping-once' : ''
            }`}
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
