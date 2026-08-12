import crypto from 'crypto'
import { getCreatorById } from './store'

const g = globalThis

if (!g.__traktirKeys) {
  g.__traktirKeys = new Map()
}

const keyStore = g.__traktirKeys

function hashKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex')
}

export function generateApiKey(creatorId) {
  const raw = 'trk_' + crypto.randomBytes(24).toString('hex')
  keyStore.set(hashKey(raw), creatorId)
  return raw
}

export function revokeKeysForCreator(creatorId) {
  for (const [hash, id] of keyStore.entries()) {
    if (id === creatorId) keyStore.delete(hash)
  }
}

export function getCreatorFromApiKey(rawKey) {
  if (!rawKey) return null
  const creatorId = keyStore.get(hashKey(rawKey))
  if (!creatorId) return null
  return getCreatorById(creatorId)
}

export function requireAuth(request) {
  const key = request.headers.get('x-api-key')
  const creator = getCreatorFromApiKey(key)
  if (!creator) {
    return {
      error: true,
      response: Response.json(
        { message: 'api key tidak valid, cek lagi header x-api-key kamu' },
        { status: 401 }
      )
    }
  }
  return { error: false, creator }
}
