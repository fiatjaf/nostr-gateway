import Head from 'next/head'
import {useRouter} from 'next/router'
import {nip19} from 'nostr-tools'

export default function AnyPage() {
  const router = useRouter()
  console.log('query', router.query)
  let {anything} = router.query
  let destination
  let relays = []

  try {
    let {type, data} = nip19.decode(anything)

    switch (type) {
      case 'nsec':
        break
      case 'npub':
        destination = `/p/${data}`
        break
      case 'nprofile':
        destination = `/p/${data.pubkey}`
        relays = data.relays
        break
      case 'note':
        destination = `/e/${data}`
        break
      case 'nevent':
        destination = `/e/${data.id}`
        relays = data.relays
        break
      case 'nrelay':
        break
    }
  } catch (_) {
    if (anything.match(/[a-f0-9]{64}/)) {
      destination = `/e/${anything}`
    }
  }

  if (destination) {
    if (relays.length > 0) destination += '?relays=' + relays.join(',')

    return (
      <Head>
        <meta httpEquiv="Refresh" content={`0; url='${destination}'`} />
      </Head>
    )
  }

  return 'not found'
}
