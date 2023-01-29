import {useRouter} from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className="nes-container">
      <p>
        The Nostr gateway is an effort to pull Nostr data from relays around the
        nostrsphere into HTML pages for the consumption of the unnostrinitiated.
      </p>

      <form
        onSubmit={e => {
          e.preventDefault()
          router.push(`/${e.target.input.value}`)
        }}
      >
        <div className="nes-field">
          <label htmlFor="input">
            Paste a Nostr event key or a public key here in{' '}
            <a href="https://github.com/nostr-protocol/nips/blob/master/19.md">
              NIP-19
            </a>{' '}
            format:
          </label>
          <input name="input" id="input" className="nes-input" />
        </div>
        <div
          className="nes-field"
          style={{display: 'flex', justifyContent: 'flex-end'}}
        >
          <button
            type="submit"
            className="nes-btn is-primary"
            style={{
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              fontSize: '130%'
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
        or see a giant list of all things, good and bad, made with Nostr, at{' '}
        <a href="https://nostr.net">nostr.net</a>.
      </p>
      <p>
        You can also reach us at{' '}
        <a href="https://t.me/nostr_protocol">our Telegram group</a> while we
        don&apos;t have a decent group chat application fully working on Nostr.
      </p>

      <br />

      <h2>Contribute to this site!</h2>
      <p>
        You can find the source code for this gateway website at{' '}
        <a href="https://github.com/fiatjaf/nostr-gateway">
          https://github.com/fiatjaf/nostr-gateway
        </a>{' '}
        while we haven&apos;t finished implementing Git over Nostr yet.
      </p>
    </div>
  )
}
