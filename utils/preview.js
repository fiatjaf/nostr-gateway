export function linkPreviewStyle(ctx) {
  const ua = ctx.req.headers['user-agent']?.toLowerCase() || ''

  if (ua.includes('telegrambot')) return 'telegram'
  if (ua.includes('twitterbot')) return 'twitter'
  if (ua.includes('mattermost')) return 'mattermost'
  if (ua.includes('slack')) return 'slack'
  if (ua.includes('discord')) return 'discord'
  if (!ctx.req.headers['accept']?.includes('text/html')) return 'unknown'
  return null
}

export function wantsShortPreviewImage(previewStyle) {
  if (previewStyle === 'twitter' || previewStyle === 'mattermost') return true
  return false
}
