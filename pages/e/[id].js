import Head from 'next/head'
import TOML from '@iarna/toml'
import {nip19} from 'nostr-tools'

import {kindNames} from '../../utils/nostr'
import {linkPreviewStyle} from '../../utils/preview'
import {getEvent, getMetadata} from '../../utils/get-event'
import Event from '../../components/event'

export async function getServerSideProps(context) {
  const id = context.params.id
  const relays = context.query.relays?.split(',') || []
  const event = await getEvent(id, relays)
  const previewStyle = linkPreviewStyle(context)
  const author =
    previewStyle && event?.id ? await getMetadata(event.pubkey, relays) : null
  const hostname = `${context.req.headers['x-forwarded-proto'] || 'https'}://${
    context.req.headers['x-forwarded-host'] || context.req.headers['host']
  }`

  if (event) {
    // event exists, cache forever
    context.res.setHeader('Cache-Control', 'public, s-maxage=31536000')
  } else {
    // event doesn't exist, cache for a while
    context.res.statusCode = 404
    context.res.setHeader('Cache-Control', 'public, s-maxage=360')
  }

  return {
    props: {id, event, author, relays, previewStyle, hostname}
  }
}

export default function EventPage({
  id,
  event,
  author,
  relays,
  previewStyle,
  hostname
}) {
  return (
    <>
      <Head>
        <title>Nostr Event {id}</title>
      </Head>
      {previewStyle && linkPreview()}
      {!previewStyle && (
        <Event id={id} event={event} author={author} relays={relays} />
      )}
    </>
  )

  function linkPreview() {
    let imageMatch = event.content.match(
      /https:\/\/[^ ]*\.(gif|jpe?g|png|webp)/g
    )
    let image = imageMatch ? imageMatch[0] : null
    let videoMatch = event.content.match(/https:\/\/[^ ]*\.(mp4|webm)/g)
    let video = videoMatch ? videoMatch[0] : null
    let videoType = video ? (video.endsWith('mp4') ? 'mp4' : 'webm') : null
    let metadata = null
    if (event.kind === 0) {
      try {
        metadata = TOML.stringify(JSON.parse(event.content))
      } catch (err) {
        /***/
      }
    }

    let npub = nip19.npubEncode(event.pubkey)
    let npubShort = npub.slice(0, 8) + '…' + npub.slice(-4)
    let authorLong = npub
    let authorShort = npubShort
    if (author) {
      try {
        let metadata = JSON.parse(author.content)
        if (metadata.name) {
          authorLong = `${metadata.name} (${npub})`
          authorShort = `${metadata.name} (${npubShort})`
        }
      } catch (err) {
        /***/
      }
    }

    let subject = event.tags.find(
      ([t]) => t === 'subject' || t === 'title'
    )?.[1]

    let useTextImage =
      (event.kind === 1 || event.kind === 30023) &&
      !image &&
      !video &&
      event.content.length > 120

    let title =
      event.kind >= 30000 && event.kind < 40000
        ? `${kindNames[event.kind]}: ${
            event.tags.find(([t, v]) => t === 't')?.[1] || '~'
          }`
        : event.kind in kindNames
        ? kindNames[event.kind]
        : `kind:${event.kind} event`
    const date = new Date(event.created_at * 1000).toISOString()
    if (previewStyle === 'twitter') {
      title += ` by ${authorShort}`
    }
    title += ` at ${date.slice(0, 10)} ${date.slice(11, 16)} UTC`

    let textImageURL = `${hostname}/api/noteimage?previewStyle=${previewStyle}&text=${encodeURIComponent(
      event.content.slice(0, 800)
    )}`
    let seenOnRelays =
      event.seenOn && event.seenOn.length > 0
        ? `seen on [ ${event.seenOn.join(' ')} ]`
        : ''

    let description = useTextImage
      ? subject
        ? `${subject} -- ${seenOnRelays}`
        : seenOnRelays
      : event.kind === 1 || event.kind === 30023
      ? event.content
      : metadata || seenOnRelays

    return (
      <Head>
        <meta property="og:site_name" content={authorLong} />
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        {useTextImage ? (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@nostrprotocol" />
            <meta property="og:image" content={textImageURL} />
            <meta name="twitter:image" content={textImageURL} />
          </>
        ) : (
          <>
            <meta property="twitter:card" content="summary" />
            {image && (
              <>
                <meta property="og:image" content={image} />
                <meta name="twitter:image" content={image} />
              </>
            )}
            {video && (
              <>
                <meta property="og:video" content={video} />
                <meta property="og:video:secure_url" content={video} />
                <meta property="og:video:type" content={`video/${videoType}`} />
              </>
            )}
          </>
        )}
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
      </Head>
    )
  }
}
