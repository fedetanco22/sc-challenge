import React from 'react'
import type { AppProps } from 'next/app'

import { AppContextProvider } from '../context/useAppContext'

import '../styles/globals.scss'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
