import {useState, useEffect, useRef} from 'react'

import Event from './event'
import {relays, hexToNpub} from '../utils/nostr'

export default function Profile({pubkey}) {
  const [eventsById, setEvents] = useState({})
  const sub = useRef(null)

  useEffect(() => {
    import('nostr-tools').then(({relayPool}) => {
      const pool = relayPool()
      relays.forEach(r => pool.addRelay(r))

      sub.current = pool.sub({
        filter: [
          {authors: [pubkey], kinds: [0], limit: 15},
          {authors: [pubkey], kinds: [1, 2, 3, 4, 5, 17, 18, 30], limit: 15}
        ],
        cb: event => {
          setEvents(eventsById => ({...eventsById, [event.id]: event}))
        }
      })

      return () => {
        if (sub.current) sub.current.unsub()
      }
    })
  }, [pubkey])

  let events = Object.values(eventsById)
  events.sort((a, b) => {
    if (a.kind === b.kind) {
      return a.created_at - b.created_at
    }
    if (a.kind === 0) return -1
    if (b.kind === 0) return 1
    if (a.kind === 3) return -1
    if (b.kind === 3) return 1
    if (a.kind === 2) return -1
    if (b.kind === 2) return 1
    if (a.kind === 1) return -1
    if (b.kind === 1) return 1
    if (a.kind === 4) return 1
    if (b.kind === 4) return -1
    if (a.kind > b.kind) return -1
    if (a.kind < b.kind) return 1
    return 0
  })

  return (
    <>
      <h1>Events from {hexToNpub(pubkey)}</h1>

      {events.length === 0 ? (
        <div className="nes-container">
          <p>No sign of {pubkey} found yet.</p>
        </div>
      ) : (
        <>
          {events.map(event => (
            <div
              key={event.id}
              style={{marginBottom: '1rem', margin: '2.5rem'}}
            >
              <Event id={event.id} event={event} />
            </div>
          ))}
        </>
      )}
    </>
  )
}
