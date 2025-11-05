import Head from 'next/head'

import Map from '#components/Map'

const MapPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lokichain Peers Map',
    url: 'https://21chain.com/',
    description:
      'Interactive map showing real-time Flokicoin (FLC) peer nodes and network distribution on Lokichain.',
    image: 'https://21chain.com/og/lokichain-peers-map.png',
    publisher: {
      '@type': 'Organization',
      name: 'Flokicoin',
      url: 'https://flokicoin.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://21chain.com/logo.svg',
      },
    },
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lokichain Peers Map | Real-Time Flokicoin Node Network Explorer</title>

        <meta
          name="description"
          content="Explore the Lokichain network in real time. View active Flokicoin (FLC) peers, full nodes, and their geographic distribution on the interactive map."
        />
        <meta
          name="keywords"
          content="Lokichain, Flokicoin, FLC, node map, peers map, blockchain nodes, network explorer, P2P map, crypto nodes"
        />
        <meta name="robots" content="index,follow" />

        <link rel="canonical" href="https://21chain.com/" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0B1221" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Flokicoin" />
        <meta property="og:title" content="Lokichain Peers Map | Flokicoin Node Network Explorer" />
        <meta
          property="og:description"
          content="Live map of Lokichain peers and full nodes worldwide. Monitor network connections, status, and node health in real time."
        />
        <meta property="og:url" content="https://21chain.com/" />
        <meta property="og:image" content="https://21chain.com/lokichain-peers-map.png" />
        <meta property="og:image:alt" content="Lokichain peers map preview" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Lokichain Peers Map | Real-Time Flokicoin Node Network Explorer"
        />
        <meta
          name="twitter:description"
          content="Visualize active Lokichain (FLC) nodes and peers across the globe."
        />
        <meta name="twitter:image" content="https://21chain.com/lokichain-peers-map.png" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div>
        <Map />
      </div>
    </>
  )
}

export default MapPage
