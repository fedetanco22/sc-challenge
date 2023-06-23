import Head from 'next/head'

const SEO = ({ title, description, keywords }) => {
  const metaDescription = description
  const defaultTitle = title
  const defaultKeywords = keywords

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
