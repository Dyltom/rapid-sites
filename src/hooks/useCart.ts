'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Cart item interface
 */
export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  quantity: number
  image?: string
}

/**
 * useCart Hook
 *
 * Manages shopping cart state with localStorage persistence
 * Simple implementation for demo - in production would use Payload ecommerce cart API
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load cart:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isLoaded])

  // Add item to cart
  const addItem = useCallback((item: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id)

      if (existingItem) {
        // Increment quantity
        return currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }

      // Add new item
      return [...currentItems, item]
    })
  }, [])

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
  }, [])

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    )
  }, [removeItem])

  // Clear entire cart
  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  // Calculate total items
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Calculate total price
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoaded,
  }
}
