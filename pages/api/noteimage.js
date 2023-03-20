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
  const maxHeight = previewStyle === 'twitter' ? width / 1.91 : width * 1.5
  const lines = computeLines(text, width - x * 2)
  const height = Math.min(lines.length * 17 + x * 3, maxHeight)
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // text
  ctx.font = '16px sans-serif'
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + lineHeight * (i + 1))
  }

  // background
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = '#dec9f8'
  ctx.fillRect(0, 0, width, height)

  return canvas
}

function computeLines(text, maxLineWidth) {
  // throwaway canvas object just for measuring text
  const canvas = createCanvas(1000, 1000)
  const ctx = canvas.getContext('2d')
  ctx.font = '16px sans-serif'

  let lines = []
  let currentLine = ''

  for (let i = 0; i < text.length; i++) {
    let char = text[i]

    if (char === '\n') {
      lines.push(currentLine)
      currentLine = ''
      continue
    }
    if (char === ' ') {
      if (ctx.measureText(currentLine).width > maxLineWidth) {
        lines.push(currentLine)
        currentLine = ''
        continue
      }
      let untilNextSpace = text.slice(i + 1).indexOf(' ')
      if (untilNextSpace === -1) {
        untilNextSpace = text.length - (i + 1) // until end
      }

      let textUntilNextSpace =
        currentLine + text.slice(i + 1, i + 1 + untilNextSpace)
      if (ctx.measureText(textUntilNextSpace).width > maxLineWidth) {
        lines.push(currentLine)
        currentLine = ''
        continue
      }
    }

    currentLine += char
  }

  if (currentLine.length) lines.push(currentLine)

  return lines
}
