import Head from 'next/head'
import Image from 'next/image'

import '../styles/globals.css'

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Nostr Gateway</title>
      </Head>
      <header style={{display: 'flex', 'align-items': 'center'}}>
        <Image
          alt="nostr logo"
          src="/logo.jpg"
          height={40}
          width={40}
          style={{'image-rendering': 'pixelated'}}
        />
        <h1 style={{margin: '0 20px 0'}}>Nostr Gateway</h1>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
