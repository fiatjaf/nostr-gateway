import {useEffect, useState} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'

import {getEvent} from '../../utils/get-event'
import Event from '../../components/event'

export default function EventPage({id}) {
  const router = useRouter()
  const [loading, setLoading] = useState(1)
  const [event, setEvent] = useState(null)

  useEffect(() => {
    getEvent(router.query.id, router.query.relays?.split(',') || []).then(
      event => {
        setEvent(event)
        setLoading(l => l - 1)
      }
    )
  }, [router.query.id])

  return (
    <>
      <Head>
        <title>Nostr Event {id}</title>
      </Head>
      {event ? (
        <Event id={id} event={event} />
      ) : (
        <div className="nes-container">
          {loading === 0 ? (
            <>
              <p>Event {id} wasn't found.</p>
              <p>
                Try using a <code>nevent</code> identifier with relay hints.
              </p>
            </>
          ) : (
            <p>Loading event {router.query.id}...</p>
          )}
        </div>
      )}
    </>
  )
}
