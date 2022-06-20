export const kindNames = [
  /* 0: */ 'profile metadata',
  /* 1: */ 'text note',
  /* 2: */ 'relay recommendation',
  /* 3: */ 'contact list',
  /* 4: */ 'encrypted direct message',
  /* 5: */ 'event deletion'
]

export const relays = [
  'wss://nostr-pub.wellorder.net',
  'wss://nostr-verified.wellorder.net',
  'wss://nostr.rocks',
  'wss://relay.damus.io',
  'wss://nostr.drss.io',
  'wss://nostr.bitcoiner.social',
  'wss://nostr-relay.wlvs.space',
  'wss://nostr-relay.untethr.me',
  'wss://expensive-relay.fiatjaf.com',
  'wss://nostr-relay.freeberty.net'
]

export function nip05toURL(identifier) {
  const [name, domain] = identifier.split('@')
  return `https://${domain}/.well-known/nostr.json?name=${name}`
}
