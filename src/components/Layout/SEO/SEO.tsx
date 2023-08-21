import React, { FC } from 'react'
import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
}

const SEO: FC<SEOProps> = ({ title, description, keywords }) => {
  const metaDescription =
    description || 'Some default description for the challenge'
  const defaultTitle = title || 'SouthernCode Nasa Challenge'
  const defaultKeywords =
    keywords || 'Nasa Mars Rover, SouthernCode, Federico Tanco'

  return (
    <Head>
      <title>{`${title}`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="robots" content="follow, index" />
      <meta content={metaDescription} name="description" />
      <meta name="keywords" content={defaultKeywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={defaultTitle} />
      <meta property="twitter:description" content={metaDescription} />
    </Head>
  )
}

export default SEO
