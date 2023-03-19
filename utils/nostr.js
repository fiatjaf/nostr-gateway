import {bech32} from 'bech32'

export const kindNames = {
  0: 'profile metadata',
  1: 'text note',
  2: 'relay recommendation',
  3: 'contact list',
  4: 'encrypted direct message',
  5: 'event deletion',
  6: 'repost',
  7: 'reaction',
  8: 'badge award',
  40: 'channel creation',
  41: 'channel metadata',
  42: 'channel message',
  43: 'channel hide message',
  44: 'channel mute user',
  1984: 'report',
  9735: 'zap',
  9734: 'zap request',
  10002: 'relay list',
  30008: 'profile badges',
  30009: 'badge definition',
  30078: 'app-specific data',
  30023: 'article'
}

export const fallbackRelays = [
  'wss://relay.damus.io',
  'wss://nostr-pub.wellorder.net',
  'wss://offchain.pub',
  'wss://nostr.fmt.wiz.biz',
  'wss://eden.nostr.land',
  'wss://atlas.nostr.land',
  'wss://relay.snort.social',
  'wss://nostr.fly.dev',
  'wss://nostr.nostr.band',
  'wss://relay.nostrgraph.net',
  'wss://relay.nostr.bg',
  'wss://nostr.wine',
  'wss://nos.lol',
  'wss://relay.mostr.pub',
  'wss://no.str.cr',
  'wss://brb.io',
  'wss://nostr.zebedee.cloud'
]

export function nip05toURL(identifier) {
  const [name, domain] = identifier.split('@')
  return `https://${domain}/.well-known/nostr.json?name=${name}`
}
