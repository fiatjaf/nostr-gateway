import Head from 'next/head'

import {getEvent} from '../../utils/get-event'
import Event from '../../components/event'

export async function getServerSideProps(context) {
  const id = context.params.id
  const relays = context.query.relays?.split(',') || []
  const event = await getEvent(id, relays)

  if (event) {
    // event exists, cache forever
    context.res.setHeader('Cache-Control', 'public, s-maxage=31536000')
  } else {
    // event doesn't exist, cache for a while
    context.res.statusCode = 404
    context.res.setHeader('Cache-Control', 'public, s-maxage=360')
  }

  return {
    props: {id, event, relays}
  }
}

export default function EventPage({id, event, relays}) {
  return (
    <>
      <Head>
        <title>Nostr Event {id}</title>
      </Head>
      <Event id={id} event={event} relays={relays} />
    </>
  )
}
