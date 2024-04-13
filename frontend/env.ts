const HTTP_PROTOCOL = process.env.NODE_ENV==='production' ? 'https':'http'
const WS_PROTOCOL = process.env.NODE_ENV==='production' ? 'wss':'ws'
export const SERVER_URL= `${HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_URL}`
export const WS_SERVER_URL= `${WS_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_URL}/ws`