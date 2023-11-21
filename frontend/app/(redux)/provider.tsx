'use client'

// eslint-disable-next-line import/no-extraneous-dependencies
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from './store'

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextUIProvider>{children}</NextUIProvider>
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
