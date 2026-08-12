import { requireAuth, generateApiKey, revokeKeysForCreator } from '@/lib/auth'

export async function POST(request) {
  const auth = requireAuth(request)
  if (auth.error) return auth.response

  revokeKeysForCreator(auth.creator.id)
  const apiKey = generateApiKey(auth.creator.id)

  return Response.json({
    message: 'api key baru udah jadi, key lama otomatis mati jadi jangan dipake lagi',
    apiKey
  })
}
