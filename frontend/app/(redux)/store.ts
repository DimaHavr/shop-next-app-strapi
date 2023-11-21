import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import { persistedCartSlice } from './cart/cartSlice'
import { persistedFavoritesSlice } from './favorites/favoritesSlice'
import { persistedOrderSlice } from './order/orderSlice'

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]

export const store = configureStore({
  reducer: {
    favorites: persistedFavoritesSlice,
    cart: persistedCartSlice,
    order: persistedOrderSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions,
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
