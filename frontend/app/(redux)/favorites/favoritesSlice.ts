/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface IFavoriteProduct {
  attributes: any
  id: number
}

export interface IFavoritesState {
  favoriteProducts: IFavoriteProduct[]
  totalProducts: number
}

const initialState: IFavoritesState = {
  favoriteProducts: [],
  totalProducts: 0,
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavoritesList: (state, action: PayloadAction<IFavoriteProduct>) => {
      const updateFavoriteList = { ...action.payload }
      state.favoriteProducts.push(updateFavoriteList)
      state.totalProducts += 1
    },

    removeFavoritesList: (state, action: PayloadAction<{ id: number }>) => {
      const updatedFavoritesList = state.favoriteProducts.filter(
        item => item.id !== action.payload.id,
      )
      state.favoriteProducts = updatedFavoritesList
      state.totalProducts -= 1
    },

    clearFavoritesList: state => {
      state.favoriteProducts = []
      state.totalProducts = 0
    },
  },
})

export const { addToFavoritesList, removeFavoritesList, clearFavoritesList } =
  favoritesSlice.actions

export default favoritesSlice.reducer

const persistConfig = {
  key: 'favorites',
  storage,
}

export const persistedFavoritesSlice = persistReducer(
  persistConfig,
  favoritesSlice.reducer,
)
