import { requireAuth } from '@/lib/auth'
import { getDonationsByCreatorId } from '@/lib/store'

export async function GET(request) {
  const auth = requireAuth(request)
  if (auth.error) return auth.response

  const donations = getDonationsByCreatorId(auth.creator.id)

  return Response.json({ donations })
}
