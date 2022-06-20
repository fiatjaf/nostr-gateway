import {nip05toURL} from '../utils/nostr'

export default function Content({event}) {
  switch (event.kind) {
    case 0: {
      try {
        const metadata = JSON.parse(event.content)
        return (
          <div className="nes-container">
            <div className="nes-field is-inline">
              <div>
                {metadata.picture ? (
                  <img
                    src={metadata.picture}
                    alt="metadata picture"
                    className="nes-avatar"
                    style={{
                      width: '96px',
                      height: '96px',
                      'image-rendering': 'pixelated'
                    }}
                  />
                ) : null}
              </div>
              <div style={{'margin-left': '28px'}}>
                <h2>{metadata.name}</h2>
                <p>{metadata.about}</p>
                {metadata.nip05 ? (
                  <a
                    href={nip05toURL(metadata.nip05)}
                    target="_blank"
                    className="nes-badge is-icon"
                    rel="noreferrer"
                  >
                    <span className="is-dark">nip05</span>
                    <span className="is-warning">{metadata.nip05}</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        )
      } catch (err) {}
      break
    }
    case 3: {
      const profiles = event.tags
        .filter(tag => tag[0] === 'p')
        .map((tag, i) => {
          let text

          if (tag.length < 2) {
            text = '<empty>'
          } else {
            text = [
              <b key="key" className="nes-text is-success">{`${tag[1]}`}</b>
            ]

            if (
              tag.length > 3 &&
              typeof tag[3] === 'string' &&
              tag[3].trim() !== ''
            ) {
              text.push(`, known as "`)
              text.push(
                <span
                  key="petname"
                  className="nes-text is-primary"
                >{`${tag[3]}`}</span>
              )
              text.push(`"`)
            }

            if (
              tag.length > 2 &&
              typeof tag[2] === 'string' &&
              tag[2].startsWith('ws')
            ) {
              // includes relay
              text.push(`, relay "`)
              text.push(
                <span
                  key="petname"
                  className="nes-text is-warning"
                >{`${tag[2]}`}</span>
              )
              text.push(`"`)
            }
          }

          return (
            <li style={{margin: '12px 0'}} key={i}>
              {text}
            </li>
          )
        })

      return <ul className="nes-list is-circle">{profiles}</ul>
    }
  }

  return (
    <div className="nes-container is-rounded is-dark content">
      {event.content}
    </div>
  )
}
