/* eslint-disable import/no-extraneous-dependencies */
import './globals.css'
import '@smastrom/react-rating/style.css'

import type { Metadata } from 'next'
import { Exo_2, Gugi, Inter, Manrope } from 'next/font/google'
import React from 'react'
import { Toaster } from 'react-hot-toast'

import { Footer } from './(layouts)/Footer'
import { Header } from './(layouts)/Header'
import ReduxProvider from './(redux)/provider'

const inter = Inter({
  weight: ['300', '400', '700', '500', '600'],
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})
const manrope = Manrope({
  weight: ['300', '400', '700', '500', '600'],
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
})
const exo2 = Exo_2({
  weight: ['300', '400', '700', '500', '600'],
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--font-exo-2',
})
const gugi = Gugi({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gugi',
})

export const metadata: Metadata = {
  title: 'Shop - Магазин одягу',
  description: 'Shop - Магазин одягу',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='uk'
      className={`${inter.variable} ${manrope.variable} ${exo2.variable} ${gugi.variable} h-full`}
    >
      <body className='h-full'>
        <ReduxProvider>
          <Toaster />
          <div className='flex min-h-full flex-col'>
            <Header />
            {children}
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
