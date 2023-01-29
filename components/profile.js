import {useState, useEffect, useRef} from 'react'
import {nip19, utils} from 'nostr-tools'

import Event from './event'
import {fallbackRelays} from '../utils/nostr'

export default function Profile({pubkey, relays}) {
  const ids = useRef({})
  const [events, setEvents] = useState([])
  const [metadataEvents, setMetadataEvents] = useState([])
  useEffect(() => {
    ids.current = {}
    setEvents([])

    import('nostr-tools').then(({relayInit}) => {
      const relays = Array.from(new Set([...fallbackRelays, ...(relays || [])]))

      relays.forEach(async url => {
        const relay = relayInit(url, id => id in ids.current)

        await relay.connect()

        let sub = relay.sub(
          [
            {authors: [pubkey], kinds: [0], limit: 15},
            {authors: [pubkey], kinds: [1, 2, 3, 4, 5, 17, 18, 30], limit: 15}
          ],
          {skipVerification: true}
        )

        sub.on('event', event => {
          ids.current[event.id] = null

          if (event.kind === 0 || event.kind === 2) {
            setMetadataEvents(events =>
              utils.insertEventIntoDescendingList(events, event)
            )
          } else {
            setEvents(events =>
              utils.insertEventIntoDescendingList(events, event)
            )
          }
        })
      })
    })
  }, [pubkey])

  return (
    <>
      <h1>Events from {nip19.npubEncode(pubkey)}</h1>

      {events.length === 0 ? (
        <div className="nes-container">
          <p>No sign of {pubkey} found yet.</p>
        </div>
      ) : (
        <>
          {metadataEvents.map(renderEvent)}
          {events.map(renderEvent)}
        </>
      )}
    </>
  )

  function renderEvent(event) {
    return (
      <div key={event.id} style={{marginBottom: '1rem', margin: '2.5rem'}}>
        <Event id={event.id} event={event} />
      </div>
    )
  }
}
