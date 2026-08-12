import { getCreatorByUsername, getStats } from '@/lib/store'

export async function GET(request, { params }) {
  const creator = getCreatorByUsername(params.username)

  if (!creator) {
    return Response.json({ message: 'creator tidak ditemukan' }, { status: 404 })
  }

  const stats = getStats(creator.id)

  return Response.json({
    username: creator.username,
    name: creator.name,
    ...stats
  })
}
