import {useState, useEffect} from 'react'
import {nip19} from 'nostr-tools'

import Event from './event'
import {getProfileNotes, getProfileMetadataEvents} from '../utils/get-event'

export default function Profile({pubkey, relays}) {
  const [loading, setLoading] = useState(2)
  const [notes, setNotes] = useState([])
  const [metadataEvents, setMetadataEvents] = useState([])

  useEffect(() => {
    getProfileNotes(pubkey, relays).then(events => {
      setNotes(events)
      setLoading(loading => loading - 1)
    })
    getProfileMetadataEvents(pubkey, relays).then(events => {
      setMetadataEvents(events)
      setLoading(loading => loading - 1)
    })
  }, [pubkey])

  return (
    <>
      <h1>Events from {nip19.npubEncode(pubkey)}</h1>

      {notes.length + metadataEvents.length === 0 ? (
        <div className="nes-container">
          {loading === 0 ? (
            <p>No sign of {pubkey} found anywhere.</p>
          ) : (
            <p>Loading events from {pubkey}...</p>
          )}
        </div>
      ) : (
        <>
          {metadataEvents.map(renderEvent)}
          {notes.map(renderEvent)}
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
