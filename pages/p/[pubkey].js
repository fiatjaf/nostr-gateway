import Head from 'next/head'
import {useRouter} from 'next/router'
import {nip19} from 'nostr-tools'

import Profile from '../../components/profile'

export default function ProfilePage() {
  const router = useRouter()
  let {pubkey, relays} = router.query
  try {
    let res = nip19.decode(pubkey)
    pubkey = res.data.pubkey || res.data
    relays = res.data.relays ? res.data.relays.join(',') : relays
  } catch (_) {}

  if (pubkey === undefined) return null

  return (
    <>
      <Head>
        <title>Nostr Public Key {nip19.npubEncode(pubkey)}</title>
      </Head>
      <Profile pubkey={pubkey} relays={relays} />
    </>
  )
}
