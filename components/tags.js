import Link from 'next/link'

export default function Tags({event}) {
  let tags = event.tags
  if (event.kind === 3) {
    // filter out these as they are already shown in <Content />
    tags = tags.filter(tag => tag[0] !== 'p')
  }

  if (tags.length === 0) return null

  const maxCols = tags.reduce((max, t) => (t.length > max ? t.length : max), 0)

  return (
    <div className="nes-table-responsive">
      <table className="nes-table is-bordered">
        <thead>
          <tr>
            <th colSpan={maxCols}>tags</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, r) => (
            <tr key={r}>
              {tag.map((item, c) => (
                <td
                  key={c}
                  colSpan={
                    c === tag.length - 1 && c + 1 < maxCols ? maxCols - c : 1
                  }
                >
                  {c === 1 && (tag[0] === 'p' || tag[0] === 'e') ? (
                    <Link passHref href={'/' + tag[0] + '/' + item}>
                      {item}
                    </Link>
                  ) : (
                    item
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
