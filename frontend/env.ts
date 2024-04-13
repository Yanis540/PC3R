const PROTOCOL = process.env.NODE_ENV==='production' ? 'https':'http'
export const SERVER_URL= `${PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_URL}`
export const WS_SERVER_URL= `ws://${process.env.NEXT_PUBLIC_SERVER_URL}/ws`