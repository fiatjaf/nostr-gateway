import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import '../styles/globals.css'

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Nostr Gateway</title>
      </Head>
      <header style={{display: 'flex', 'align-items': 'center'}}>
        <Link href="/" passHref>
          <a>
            <Image
              alt="nostr logo"
              src="/logo.jpg"
              height={40}
              width={40}
              style={{'image-rendering': 'pixelated'}}
            />
          </a>
        </Link>
        <Link href="/" passHref>
          <a>
            <h1 style={{margin: '0 20px 0'}}>Nostr Gateway</h1>
          </a>
        </Link>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
