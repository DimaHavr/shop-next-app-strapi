/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const emptyOrder = {
  orderId: '',
  paymentData: '',
  personalData: {},
  deliveryData: {},
  productsList: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: emptyOrder,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload
    },
    clearOrder: state => {
      state.order = emptyOrder
    },
  },
})

export const { setOrder, clearOrder } = orderSlice.actions

const persistConfig = {
  key: 'order',
  storage,
}

export const persistedOrderSlice = persistReducer(
  persistConfig,
  orderSlice.reducer,
)
