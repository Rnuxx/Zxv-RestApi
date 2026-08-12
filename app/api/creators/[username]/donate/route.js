import { getCreatorByUsername, addDonation } from '@/lib/store'

export async function POST(request, { params }) {
  const creator = getCreatorByUsername(params.username)

  if (!creator) {
    return Response.json({ message: 'creator tidak ditemukan' }, { status: 404 })
  }

  const body = await request.json().catch(() => null)

  if (!body || !body.amount || Number(body.amount) <= 0) {
    return Response.json({ message: 'amount wajib diisi dan harus lebih dari 0' }, { status: 400 })
  }

  const donation = addDonation({
    creatorId: creator.id,
    supporterName: body.supporterName,
    message: body.message,
    amount: Number(body.amount)
  })

  return Response.json(
    { message: `mantap, makasih udah traktir ${creator.name}`, donation },
    { status: 201 }
  )
}
