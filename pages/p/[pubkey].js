import Head from 'next/head'
import {useRouter} from 'next/router'

import Profile from '../../components/profile'

export default function ProfilePage() {
  const router = useRouter()
  const {pubkey} = router.query

  return (
    <>
      <Head>
        <title>Nostr Public Key {pubkey}</title>
      </Head>
      <Profile pubkey={pubkey} />
    </>
  )
}
