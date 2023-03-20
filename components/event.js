import {useRouter} from 'next/router'
import {useState} from 'react'
import {nip19} from 'nostr-tools'

import {kindNames, fallbackRelays} from '../utils/nostr'
import Content from './content'
import Tags from './tags'

export default function Event({id, event, relays = []}) {
  const router = useRouter()
  const [showingRaw, showRaw] = useState(false)
  const [showingId, showId] = useState('nevent')
  const [showingHexPubkey, showHexPubkey] = useState(false)
  const [signatureOk, setSignatureOk] = useState(null)
  const sid = id.slice(0, 4)

  if (!event)
    return (
      <div className="nes-container">
        <p>Event {id} wasn&apos;t found.</p>
        <p>
          Try using a <code>nevent</code> identifier with relay hints.
        </p>
      </div>
    )

  return (
    <div className="nes-container with-title">
      <div className="nes-field is-inline">
        <label htmlFor={`id-${sid}`}>id</label>
        <input
          readOnly
          id={`id-${sid}`}
          value={
            showingId === 'hex'
              ? event.id
              : showingId === 'nevent'
              ? nip19.neventEncode({id: event.id})
              : nip19.noteEncode(event.id)
          }
          className="nes-input nes-text is-primary"
        />
        <button
          type="button"
          className="nes-btn is-warning"
          onClick={e => {
            e.preventDefault()
            showId(
              showingId === 'note'
                ? 'hex'
                : showingId === 'hex'
                ? 'nevent'
                : event.kind === 1
                ? 'note'
                : 'hex'
            )
          }}
          style={{marginLeft: '1rem'}}
        >
          {showingId === 'note'
            ? 'hex'
            : showingId === 'hex'
            ? 'nevent'
            : event.kind === 1
            ? 'note'
            : 'hex'}
        </button>
        {router.pathname.startsWith('/p/') && (
          <a
            href={`/e/${event.id}${
              relays.length ? '?relays=' + relays.join(',') : ''
            }`}
            className="nes-btn is-primary"
            style={{marginLeft: '1rem'}}
          >
            open
          </a>
        )}
      </div>

      <div className="nes-field is-inline">
        <label htmlFor={`pubkey-${sid}`}>author</label>
        <input
          readOnly
          id={`pubkey-${sid}`}
          value={
            showingHexPubkey ? event.pubkey : nip19.npubEncode(event.pubkey)
          }
          className="nes-input nes-text is-primary"
        />
        <button
          type="button"
          className="nes-btn is-warning"
          onClick={e => {
            e.preventDefault()
            showHexPubkey(!showingHexPubkey)
          }}
          style={{marginLeft: '1rem'}}
        >
          {showingHexPubkey ? 'npub' : 'hex'}
        </button>
        {router.pathname.startsWith('/e/') && (
          <a
            href={`/p/${event.pubkey}${
              relays.length ? '?relays=' + relays.join(',') : ''
            }`}
            className="nes-btn is-primary"
            style={{marginLeft: '1rem'}}
          >
            open
          </a>
        )}
      </div>
      <div className="nes-field is-inline">
        <label htmlFor={`kind-${sid}`}>kind</label>
        <input
          readOnly
          id={`kind-${sid}`}
          value={event.kind}
          className="nes-input"
          style={{marginRight: '1rem', readOnly: true, flexGrow: 1}}
        />
        <input
          readOnly
          id={`kind-${sid}`}
          value={(kindNames[event.kind] || '').toUpperCase()}
          className="nes-input"
        />
      </div>
      <div className="nes-field is-inline">
        <label htmlFor={`date-${sid}`}>date</label>
        <input
          readOnly
          id={`date-${sid}`}
          value={new Date(event.created_at * 1000)}
          className="nes-input"
        />
      </div>
      <div className="tags-table-wrapper" style={{margin: '1rem 0'}}>
        <Tags event={event} />
      </div>
      <div style={{margin: '1rem 0'}}>
        <Content event={event} />
      </div>
      <div className="nes-field is-inline">
        <label htmlFor={`sig-${sid}`} style={{flexGrow: 2}}>
          signature
        </label>
        <input
          readOnly
          id={`sig-${sid}`}
          value={event.sig}
          className="nes-input nes-text is-disabled"
        />
        <button
          type="button"
          className={`nes-btn ${
            signatureOk === null ? '' : signatureOk ? 'is-success' : 'is-error'
          }`}
          style={{marginLeft: '1rem'}}
          onClick={ev => {
            ev.preventDefault()
            import('nostr-tools').then(({verifySignature}) => {
              setSignatureOk(verifySignature(event))
            })
          }}
        >
          {signatureOk === null ? 'check' : signatureOk ? 'valid' : 'invalid'}
        </button>
      </div>

      <div className="show-raw-button">
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={e => {
            e.preventDefault()
            showRaw(!showingRaw)
          }}
        >
          &lt;&gt;
        </button>
      </div>
      {showingRaw && (
        <div className="nes-container">
          <button
            type="button"
            className="nes-btn is-primary"
            onClick={e => {
              e.preventDefault()
              rePublishEvent(event)
            }}
          >
            Republish Event
          </button>
          <pre className="raw">{JSON.stringify(event, null, 2)}</pre>
        </div>
      )}
    </div>
  )

  async function rePublishEvent(event) {
    import('nostr-tools').then(async ({relayInit}) => {
      fallbackRelays.forEach(async url => {
        const relay = relayInit(url)
        await relay.connect()
        relay.publish(event)
      })
    })
  }
}
