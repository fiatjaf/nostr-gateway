import {SimplePool} from 'nostr-tools'
import {fallbackRelays} from './nostr'

let pool = new SimplePool({getTimeout: 5600})

export async function getEvent(id, relays) {
  return pool.get(Array.from(new Set([...(relays || []), ...fallbackRelays])), {
    ids: [id]
  })
}

export async function getProfileNotes(pubkey, relays) {
  return pool.list(
    Array.from(new Set([...(relays || []), ...fallbackRelays])),
    [{authors: [pubkey], kinds: [1], limit: 10}]
  )
}

export async function getProfileMetadataEvents(pubkey, relays) {
  return pool.list(
    Array.from(new Set([...(relays || []), ...fallbackRelays])),
    [{authors: [pubkey], kinds: [0, 2, 10002, 30008], limit: 15}]
  )
}
