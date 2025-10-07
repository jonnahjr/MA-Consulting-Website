import { Helmet } from 'react-helmet-async'

interface MetaProps {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
}

const Meta = ({ title, description, keywords, image, url }: MetaProps) => {
  const siteName = 'Ma Services Solution'
  const defaultImage = '/og-image.jpg' // TODO: Add default OG image
  const defaultUrl = window.location.href

  return (
    <Helmet>
      <title>{title} | {siteName}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={`${title} | ${siteName}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${siteName}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Additional SEO */}
      <link rel="canonical" href={url || defaultUrl} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}

export default Meta