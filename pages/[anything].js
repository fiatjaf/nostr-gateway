import {nip19} from 'nostr-tools'

export async function getServerSideProps(context) {
  let destination
  let relays = []

  try {
    let {type, data} = nip19.decode(context.params.anything)

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
    if (context.params.anything.toLowerCase().match(/[a-f0-9]{64}/)) {
      let id = context.params.anything
      destination = `/e/${id}`
    }
  }
  if (destination) {
    destination += '?relays=' + relays.join(',')

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
