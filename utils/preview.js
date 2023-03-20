export function shouldRenderLinkPreview(ctx) {
  const ua = ctx.req.headers['user-agent']?.toLowerCase() || ''

  return (
    !ctx.req.headers['accept']?.includes('text/html') ||
    ua.includes('telegrambot') ||
    ua.includes('twitterbot')
  )
}
