import {useState} from 'react'

import {kindNames} from '../utils/nostr'
import Content from './content'
import Tags from './tags'
import {hexToNpub} from '../utils/nostr'

export default function Event({id, event}) {
  const [showingRaw, showRaw] = useState(false)
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
            value={hexToNpub(event.pubkey)}
            className="nes-input nes-text is-primary"
          />
        </div>
        <div className="nes-field is-inline">
          <label htmlFor={`kind-${sid}`}>kind</label>
          <div style={{margin: '0 20px'}}>{event.kind}</div>
          <input
            readOnly
            id={`kind-${sid}`}
            value={(kindNames[event.kind] || '').toUpperCase()}
            className="nes-input"
          />
        </div>
        <div style={{margin: '18px 0'}}>
          <Tags event={event} />
        </div>
        <div style={{margin: '18px 0'}}>
          <Content event={event} />
        </div>
        <div className="nes-field is-inline">
          <label htmlFor={`sig-${sid}`}>signature</label>
          <input
            readOnly
            id={`sig-${sid}`}
            value={event.sig}
            className="nes-input nes-text is-disabled"
          />
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
