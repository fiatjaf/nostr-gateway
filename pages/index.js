export default function Home() {
  return (
    <div className="nes-container">
      <p>
        The Nostr gateway is an effort to Nostr data from relays around the
        nostrsphere into HTML pages for the consumption of the unnostrinitiated.
      </p>

      <form
        onSubmit={e => {
          e.preventDefault()
          location.href = '/' + e.target.input
        }}
      >
        <div className="nes-field">
          <label htmlFor="input">Paste a Nostr Event Key:</label>
          <input name="input" id="input" className="nes-input" />
        </div>
        <div
          className="nes-field"
          style={{display: 'flex', 'justify-content': 'flex-end'}}
        >
          <button
            type="button"
            className="nes-btn is-primary"
            style={{
              'padding-left': '28px',
              'padding-right': '28px',
              'font-size': '130%'
            }}
          >
            Go
          </button>
        </div>
      </form>

      <h2>What is Nostr?</h2>
      <p>
        A decentralized network based on cryptographic keypairs and that is not
        peer-to-peer, it is super simple and scalable and therefore has a chance
        of working.
      </p>
      <p>
        Read more at{' '}
        <a href="https://github.com/nostr-protocol/nostr">
          https://github.com/nostr-protocol/nostr
        </a>
        .
      </p>
      <p>
        You can also reach us at{' '}
        <a href="https://t.me/nostr_protocol">our Telegram group</a> while we
        don&apos;t have a decent group chat application fully working on Nostr.
      </p>
    </div>
  )
}
