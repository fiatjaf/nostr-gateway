import {createCanvas} from 'canvas'

export default function handler(req, res) {
  const {text, previewStyle} = req.query
  res.setHeader('content-type', 'image/png')
  const image = textToImage(text, previewStyle).toBuffer('image/png')
  res.status(200).send(image)
}

function textToImage(text, previewStyle) {
  if (text.length > 1000) {
    text = text.slice(0, 999) + '…'
  }

  const x = 10
  const y = 10
  const lineHeight = 17
  const width = 410
  const charsPerLine = 52
  const maxHeight = previewStyle === 'twitter' ? width / 1.91 : width * 1.5
  const height = Math.min(
    (text.length / (charsPerLine - 12) + 2) * 17,
    maxHeight
  )

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // text
  ctx.font = '16px serif'

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

  // background
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = '#dec9f8'
  ctx.fillRect(0, 0, width, height)

  return canvas
}
