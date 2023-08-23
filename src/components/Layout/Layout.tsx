import React, { FC } from 'react'

import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import SEO from './SEO/SEO'

interface LayoutProps {
  children: React.ReactNode
  title: string
  description: string
  keywords: string
}

const Layout: FC<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <div>
      <SEO title={title} description={description} keywords={keywords} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
