/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import type { ProductItem } from '@/app/(components)/ProductsSection/ProductsList'

export interface CartItem {
  product: ProductItem
  quantity?: number
  size: string
  color: string
}

export interface CartState {
  cartItems: CartItem[]
  showCart: boolean
  totalPrice: number
  totalQuantities: number
  qty: number
  color: string
  size: string
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCart: false,
    cartItems: [] as CartItem[],
    totalPrice: 0,
    totalQuantities: 0,
    color: '',
    size: '',
  } as CartState,
  reducers: {
    setShowCart: (state, action: PayloadAction<boolean>) => {
      state.showCart = action.payload
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload
    },
    setTotalQuantities: state => {
      state.totalQuantities = state.cartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0,
      )
    },

    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload
    },
    setSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload
    },

    toggleCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; value: 'inc' | 'dec' }>,
    ) => {
      const { id, value } = action.payload
      const index = state.cartItems.findIndex(item => item.product.id === id)
      const itemToUpdate = state.cartItems[index]

      if (value === 'inc') {
        state.cartItems[index] = {
          ...itemToUpdate,
          quantity: (itemToUpdate?.quantity || 0) + 1,
        } as CartItem
        state.totalPrice += itemToUpdate?.product.attributes.price || 0
      } else if (value === 'dec') {
        if ((itemToUpdate?.quantity || 0) > 1) {
          state.cartItems[index] = {
            ...itemToUpdate,
            quantity: (itemToUpdate?.quantity || 0) - 1,
          } as CartItem
          state.totalPrice -= itemToUpdate?.product.attributes.price || 0
        }
      }
    },
    onAdd: (
      state,
      action: PayloadAction<{
        product: ProductItem
        quantity: number
        color: string
        size: string
      }>,
    ) => {
      const { product, quantity, color, size } = action.payload
      const existingItemIndex = state.cartItems.findIndex(
        item =>
          item.product.id === product.id &&
          item.color === color &&
          item.size === size,
      )

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex]

        if (existingItem && existingItem.quantity !== undefined) {
          existingItem.quantity += quantity
        }
        state.totalPrice += (product.attributes.price || 0) * quantity
      } else {
        const newCartItem = {
          product,
          quantity,
          color,
          size,
        } as CartItem
        state.totalPrice += (product.attributes.price || 0) * quantity
        state.totalQuantities += 1
        state.cartItems.push(newCartItem)
      }

      state.showCart = true
    },

    onRemove: (
      state,
      action: PayloadAction<{
        cartItem: {
          product: {
            id: number
            attributes: {
              price: number
            }
          }
          quantity: number
          color: string
          size: string
        }
      }>,
    ) => {
      const { cartItem } = action.payload
      const foundProduct = state.cartItems.find(
        item => item.product.id === cartItem.product.id,
      )
      const newCartItems = state.cartItems.filter(
        item => item.product.id !== cartItem.product.id,
      )

      if (foundProduct) {
        const quantityToRemove = cartItem.quantity || 0
        state.totalPrice -=
          (foundProduct.product.attributes.price || 0) * quantityToRemove
        state.totalQuantities -= 1 || 0
      }

      state.cartItems = newCartItems
    },
  },
})

export const {
  setSize,
  setColor,
  setShowCart,
  onAdd,
  toggleCartItemQuantity,
  onRemove,
  setCartItems,
  setTotalPrice,
  setTotalQuantities,
} = cartSlice.actions

const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems', 'totalPrice', 'totalQuantities', 'qty'],
}

export const persistedCartSlice = persistReducer(
  persistConfig,
  cartSlice.reducer,
)
