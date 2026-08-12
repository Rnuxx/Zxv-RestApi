import { requireAuth } from '@/lib/auth'
import { getStats } from '@/lib/store'

export async function GET(request) {
  const auth = requireAuth(request)
  if (auth.error) return auth.response

  const stats = getStats(auth.creator.id)

  return Response.json({ creator: auth.creator, ...stats })
}
