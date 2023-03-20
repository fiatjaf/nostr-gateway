import Head from 'next/head'
import {nip19} from 'nostr-tools'

import {getMetadata} from '../../utils/get-event'
import {linkPreviewStyle} from '../../utils/preview'
import Profile from '../../components/profile'

export async function getServerSideProps(context) {
  const pubkey = context.params.pubkey
  const relays = context.query.relays?.split(',') || []
  const previewStyle = linkPreviewStyle(context)
  const metadata = previewStyle ? await getMetadata(pubkey, relays) : null

  if (metadata) {
    // event exists, cache forever
    context.res.setHeader('Cache-Control', 'public, s-maxage=31536000')
  } else {
    // event doesn't exist, cache for a while
    context.res.statusCode = 404
    context.res.setHeader('Cache-Control', 'public, s-maxage=360')
  }

  return {
    props: {pubkey, metadata, relays, previewStyle}
  }
}

export default function ProfilePage({pubkey, metadata, relays, previewStyle}) {
  return (
    <>
      {previewStyle && linkPreview()}
      {!previewStyle && <Profile pubkey={pubkey} relays={relays} />}
    </>
  )

  function linkPreview() {
    try {
      metadata = JSON.parse(metadata.content)
    } catch (err) {
      metadata = {}
    }

    let title = metadata.display_name
      ? `${metadata.display_name} (${metadata.name})`
      : metadata.name

    return (
      <Head>
        <title>Nostr Public Key {nip19.npubEncode(pubkey)}</title>
        <meta property="og:site_name" content={nip19.npubEncode(pubkey)} />
        <meta property="og:title" content={title} />
        {metadata.picture && (
          <meta property="og:image" content={metadata.picture} />
        )}
        {metadata.about && (
          <meta property="og:description" content={metadata.about} />
        )}
        <meta property="twitter:card" content="summary" />
      </Head>
    )
  }
}
