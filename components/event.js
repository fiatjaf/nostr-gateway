import {useState} from 'react'
import {nip19} from 'nostr-tools'

import {kindNames, fallbackRelays} from '../utils/nostr'
import Content from './content'
import Tags from './tags'

export default function Event({id, event}) {
  const [showingRaw, showRaw] = useState(false)
  const [showingHex, showHex] = useState(false)
  const [signatureOk, setSignatureOk] = useState(null)
  const sid = id.slice(0, 4)

  if (!event)
    return (
      <div className="nes-container">
        <p>Event {id} wasn&apos;t found.</p>
        <p>
          Maybe you pasted in a hex pubkey? <a href={'/p/' + id}>Click here</a>{' '}
          to check...
        </p>
      </div>
    )

return (
  <>
    <div className="nes-container with-title">
      <p className="title id">
        <a href={`/e/${id}`}>{id}</a>
      </p>

        <div className="nes-field is-inline">
          <label htmlFor={`pubkey-${sid}`}>author</label>
          <input
            readOnly
            id={`pubkey-${sid}`}
            value={showingHex ? event.pubkey : nip19.npubEncode(event.pubkey)}
            className="nes-input nes-text is-primary"
          />
          <button
            type="button"
            className="nes-btn is-warning"
            onClick={e => {
              e.preventDefault()
              showHex(!showingHex)
            }}
            style={{marginLeft: '1rem'}}
          >
            {showingHex ? 'npub' : 'hex'}
          </button>
          <a
            href={`/p/${event.pubkey}`}
            className="nes-btn is-primary"
            style={{marginLeft: '1rem'}}
          >
            profile
          </a>
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
        <div style={{margin: '1rem 0'}}>
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
              signatureOk === null
                ? ''
                : signatureOk
                ? 'is-success'
                : 'is-error'
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
    </>
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
