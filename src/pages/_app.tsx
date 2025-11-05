import 'leaflet/dist/leaflet.css'
import '#styles/leaflet-custom.css'
import '#styles/globals.css'

import type { AppProps } from 'next/app'
import { Catamaran } from 'next/font/google'
import Head from 'next/head'

const catamaran = Catamaran({
  subsets: ['latin'],
  variable: '--font-catamaran',
})

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main className={`${catamaran.variable} font-sans text-base`}>
      <Component {...pageProps} />
    </main>
  </>
)

export default App
