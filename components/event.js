import {useState} from 'react'

import {kindNames} from '../utils/nostr'
import Content from './content'
import Tags from './tags'
import {hexToNpub} from '../utils/nostr'

export default function Event({id, event}) {
  const [showingRaw, showRaw] = useState(false)
  const [showingHex, showHex] = useState(false)
  const [signatureOk, setSignatureOk] = useState(null)
  const sid = id.slice(0, 4)

  if (!event)
    return (
      <div className="nes-container">
        <p>Event {id} wasn&apos;t found.</p>
      </div>
    )

  return (
    <>
      <div className="nes-container with-title">
        <p className="title id">{id}</p>

        <div className="nes-field is-inline">
          <label htmlFor={`pubkey-${sid}`}>author (pubkey)</label>
          <input
            readOnly
            id={`pubkey-${sid}`}
            value={showingHex ? event.pubkey : hexToNpub(event.pubkey)}
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
        </div>
        <div className="nes-field is-inline">
          <label htmlFor={`kind-${sid}`}>kind</label>
          <div style={{margin: '0 1rem'}}>{event.kind}</div>
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
      </div>
      {showingRaw && (
        <pre className="raw">{JSON.stringify(event, null, 2)}</pre>
      )}
    </>
  )
}
