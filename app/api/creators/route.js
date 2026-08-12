import { createCreator, getCreatorByUsername } from '@/lib/store'
import { generateApiKey } from '@/lib/auth'

export async function POST(request) {
  const body = await request.json().catch(() => null)

  if (!body || !body.username || !body.name) {
    return Response.json({ message: 'username dan name wajib diisi' }, { status: 400 })
  }

  const username = String(body.username).toLowerCase().trim()

  if (!/^[a-z0-9_]{3,20}$/.test(username)) {
    return Response.json(
      { message: 'username cuma boleh huruf kecil, angka, underscore, panjang 3-20 karakter' },
      { status: 400 }
    )
  }

  if (getCreatorByUsername(username)) {
    return Response.json({ message: 'username sudah dipakai, coba yang lain' }, { status: 409 })
  }

  const creator = createCreator({ username, name: body.name })
  const apiKey = generateApiKey(creator.id)

  return Response.json(
    {
      message: 'akun berhasil dibuat, simpan api key ini baik baik soalnya cuma muncul sekali ini aja',
      creator,
      apiKey,
      halamanDonasi: `/${creator.username}`
    },
    { status: 201 }
  )
}
