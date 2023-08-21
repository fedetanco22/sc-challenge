import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

import { PoppinsFont } from '@/utils/fonts'

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <body className={`${PoppinsFont.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
