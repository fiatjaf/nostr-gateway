import {createCanvas} from 'canvas'

export default function handler(req, res) {
  const {text} = req.query
  res.setHeader('content-type', 'image/png')
  const image = textToImage(text).toBuffer('image/png')
  res.status(200).send(image)
}

function textToImage(text) {
  const canvas = createCanvas(480, 300)
  const ctx = canvas.getContext('2d')
  ctx.font = '16px monospace'

  const x = 10
  const y = 10
  const lineHeight = 17
  const charsPerLine = 44

  let currentLineNumber = 1
  let currentLineText = ''
  let currentLineChars = 0

  for (let i = 0; i < text.length; i++) {
    let char = text[i]

    if (char === '\n') {
      printLine()
      continue
    }
    if (char === ' ') {
      if (currentLineChars === charsPerLine) {
        printLine()
        continue
      }
      let untilNextSpace = text.slice(i + 1).indexOf(' ')
      if (untilNextSpace === -1) {
        untilNextSpace = text.length - (i + 1) // until end
      }
      if (currentLineChars + untilNextSpace > charsPerLine) {
        printLine()
        continue
      }
    }

    currentLineText += char
    currentLineChars++
  }

  if (currentLineChars) printLine()

  function printLine() {
    ctx.fillText(currentLineText, x, y + lineHeight * currentLineNumber)
    currentLineNumber++
    currentLineText = ''
    currentLineChars = 0
  }

  return canvas
}
