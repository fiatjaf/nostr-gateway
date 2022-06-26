import Head from 'next/head'
import {useRouter} from 'next/router'

import Profile from '../../components/profile'
import {npubToHex, hexToNpub} from '../../utils/nostr'

export default function ProfilePage() {
  const router = useRouter()
  let {pubkey} = router.query
  try {
    pubkey = npubToHex(pubkey)
  } catch (_) {}

  if (pubkey === undefined) return null

  return (
    <>
      <Head>
        <title>Nostr Public Key {hexToNpub(pubkey)}</title>
      </Head>
      <Profile pubkey={pubkey} />
    </>
  )
}
