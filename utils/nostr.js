import {bech32} from 'bech32'

export const kindNames = {
  0: 'profile metadata',
  1: 'text note',
  2: 'relay recommendation',
  3: 'contact list',
  4: 'encrypted direct message',
  5: 'event deletion',
  7: 'reaction',
  40: 'channel creation',
  41: 'channel metadata',
  42: 'channel message',
  43: 'channel hide message',
  44: 'channel mute user'
}

export const fallbackRelays = [
  'wss://nostr-relay.untethr.me',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr.zebedee.social',
  'wss://nostr.bitcoiner.social',
  'wss://nostr.fmt.wiz.biz',
  'wss://nostr-relay.wlvs.space',
  'wss://relay.snort.social',
  'wss://nostr.fly.dev',
  'wss://nostr.nostr.band',
  'wss://relay.realsearch.cc',
  'wss://relay.nostrgraph.net',
  'wss://relay.minds.com/nostr/v1/ws'
]

export function nip05toURL(identifier) {
  const [name, domain] = identifier.split('@')
  return `https://${domain}/.well-known/nostr.json?name=${name}`
}
