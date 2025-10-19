'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/**
 * Cart Button Component
 *
 * Shows cart item count and links to cart page
 * Simple demo implementation (uses localStorage)
 */
export function CartButton() {
  const [itemCount, setItemCount] = useState(0)

  // TODO: Replace with Payload ecommerce cart context when configured
  // For now, this is a simple demo showing the UI

  return (
    <Button variant="outline" size="sm" asChild className="relative">
      <Link href="/cart">
        🛒 Cart
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
