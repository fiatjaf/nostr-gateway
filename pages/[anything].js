import {npubToHex} from '../utils/nostr'

export async function getServerSideProps(context) {
  let destination
  try {
    let pubkey = npubToHex(context.params.anything)
    console.log(pubkey)
    destination = `/p/${pubkey}`
  } catch (_) {
    if (context.params.anything.toLowerCase().match(/[a-f0-9]{64}/)) {
      let id = context.params.anything
      destination = `/e/${id}`
    }
  }
  if (destination) {
    return {
      redirect: {destination, permanent: false}
    }
  } else {
    return {
      notFound: true
    }
  }
}

export default function AnyPage() {
  return null
}
