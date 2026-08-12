'use client'

import { useState } from 'react'

const donasiContoh = [
  { nama: 'Budi Santoso', jumlah: 20000, pesan: 'Semangat terus kontennya bang!' },
  { nama: 'Anonim', jumlah: 50000, pesan: 'Buat beli kopi ya kak' },
  { nama: 'Rina W.', jumlah: 10000, pesan: 'Lucu banget videonya wkwk' },
  { nama: 'Hamba Allah', jumlah: 100000, pesan: 'Semoga makin sukses' },
  { nama: 'Fajar', jumlah: 15000, pesan: 'Request tutorial dong' },
  { nama: 'Dewi', jumlah: 25000, pesan: 'Ditunggu part 2 nya' }
]

function formatRupiah(angka) {
  return 'Rp' + angka.toLocaleString('id-ID')
}

export default function Home() {
  const [nama, setNama] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasil, setHasil] = useState(null)
  const [gagal, setGagal] = useState('')

  async function buatAkun(e) {
    e.preventDefault()
    setLoading(true)
    setGagal('')
    setHasil(null)

    try {
      const res = await fetch('/api/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nama, username })
      })
      const data = await res.json()

      if (!res.ok) {
        setGagal(data.message || 'ada yang salah nih')
      } else {
        setHasil(data)
      }
    } catch (err) {
      setGagal('gagal connect ke server, coba lagi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="wrapper">
        <nav className="nav">
          <div className="logo"><span>trak</span>tir</div>
          <div className="nav-links">
            <a href="#fitur">Fitur</a>
            <a href="#coba">Coba API</a>
            <a href="#docs">Dokumentasi</a>
          </div>
          <a href="#coba" className="btn btn-primary">Buat Halaman Donasi</a>
        </nav>

        <section className="hero">
          <div>
            <div className="eyebrow"><span className="dot"></span> API nya udah nyala, silakan colok</div>
            <h1>Traktir creator favoritmu, <span className="garis">via API</span> juga bisa.</h1>
            <p className="lede">
              Traktir itu Saweria versi developer. Bikin halaman donasi buat kamu sendiri,
              dapet API key otomatis, terus tinggal hit endpoint buat terima, cek, sampe nampilin donasi di stream kamu.
            </p>
            <div className="cta-row">
              <a href="#coba" className="btn btn-primary">Mulai Gratis</a>
              <a href="#docs" className="btn btn-ghost">Lihat Dokumentasi</a>
            </div>
            <div className="terminal">
              <div className="baris-dot">
                <span style={{ background: '#ff5f56' }}></span>
                <span style={{ background: '#ffbd2e' }}></span>
                <span style={{ background: '#27c93f' }}></span>
              </div>
              <pre>
<span className="komentar">$ curl -X POST traktir.vercel.app/api/creators/kopi_senja/donate \</span>{'\n'}
  -H <span className="hijau-teks">"Content-Type: application/json"</span> \{'\n'}
  -d <span className="hijau-teks">{'\'{"supporterName":"Budi","amount":20000,"message":"buat kopi"}\''}</span>{'\n\n'}
<span className="komentar">{'>'} response</span>{'\n'}
{'{'} <span className="kunci">"message"</span>: "mantap, makasih udah traktir" {'}'}
              </pre>
            </div>
          </div>

          <div className="hero-visual">
            <div className="badge-live">● LIVE ALERT</div>
            <div className="printer">
              <div className="printer-slot"></div>
              <div className="struk-window">
                <div className="struk-track">
                  {[...donasiContoh, ...donasiContoh].map((d, i) => (
                    <div className="struk-item" key={i}>
                      <div className="baris-atas">
                        <span className="nama">{d.nama}</span>
                        <span className="jumlah">{formatRupiah(d.jumlah)}</span>
                      </div>
                      <div className="pesan">{d.pesan}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="wrapper" id="fitur">
        <section className="section">
          <div className="section-head">
            <div className="eyebrow"><span className="dot"></span> Kenapa Traktir</div>
            <h2>Semua yang lo butuh buat mulai nerima donasi</h2>
            <p>Nggak perlu setup backend sendiri, tinggal daftar dan API key langsung jadi.</p>
          </div>
          <div className="grid-fitur">
            <div className="kartu">
              <div className="ikon">🔑</div>
              <h3>API Key Otomatis</h3>
              <p>Setiap creator dapet API key unik pas daftar, dipakai buat akses endpoint privat kayak lihat riwayat donasi lengkap.</p>
            </div>
            <div className="kartu">
              <div className="ikon">🧾</div>
              <h3>Endpoint Donasi Publik</h3>
              <p>Supporter kamu nggak perlu akun atau API key buat traktir kamu, tinggal hit satu endpoint aja.</p>
            </div>
            <div className="kartu">
              <div className="ikon">📊</div>
              <h3>Statistik Real Time</h3>
              <p>Total donasi dan jumlah supporter otomatis kehitung, tinggal fetch dari endpoint profil.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="wrapper" id="coba">
        <section className="playground">
          <div>
            <h2>Coba langsung di sini</h2>
            <p className="ket">
              Isi nama dan username, kita bakal hit endpoint <code>POST /api/creators</code> beneran
              dan kasih kamu API key asli buat dicoba. Ini manggil API yang sama kayak yang bakal kamu pakai di project kamu.
            </p>
            <form className="form-box" onSubmit={buatAkun}>
              <label htmlFor="nama">Nama Kamu</label>
              <input
                id="nama"
                placeholder="Kopi Senja"
                value={nama}
                onChange={e => setNama(e.target.value)}
                required
              />
              <label htmlFor="username">Username (buat link donasi)</label>
              <input
                id="username"
                placeholder="kopi_senja"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Lagi bikin akun...' : 'Generate API Key'}
              </button>
            </form>
          </div>
          <div>
            <div className="hasil-box">
              {gagal && <span style={{ color: '#ff9d94' }}>{gagal}</span>}
              {!gagal && !hasil && <span className="placeholder">// hasil response bakal muncul di sini setelah kamu submit form</span>}
              {hasil && (
                <>
                  {'{'}{'\n'}
                  {'  '}"creator": {'{'} "username": "{hasil.creator.username}", "name": "{hasil.creator.name}" {'}'}{','}{'\n'}
                  {'  '}"apiKey": <span className="kunci-highlight">"{hasil.apiKey}"</span>{','}{'\n'}
                  {'  '}"halamanDonasi": "{hasil.halamanDonasi}"{'\n'}
                  {'}'}
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="wrapper" id="docs">
        <section className="docs">
          <div className="section-head">
            <div className="eyebrow"><span className="dot"></span> Dokumentasi</div>
            <h2>Daftar Endpoint</h2>
            <p>Simple, RESTful, dan cuma butuh header <code>x-api-key</code> buat endpoint yang privat.</p>
          </div>
          <div className="endpoint-list">
            <div className="endpoint">
              <span className="method post">POST</span>
              <code>/api/creators</code>
              <span className="ket-endpoint">Daftar creator baru, langsung dapet API key</span>
            </div>
            <div className="endpoint">
              <span className="method get">GET</span>
              <code>/api/creators/:username</code>
              <span className="ket-endpoint">Lihat profil publik dan statistik creator</span>
            </div>
            <div className="endpoint">
              <span className="method post">POST</span>
              <code>/api/creators/:username/donate</code>
              <span className="ket-endpoint">Kirim donasi ke creator, publik tanpa auth</span>
            </div>
            <div className="endpoint">
              <span className="method get">GET</span>
              <code>/api/me</code>
              <span className="ket-endpoint">Profil dan statistik akun kamu sendiri</span>
              <span className="auth-tag">API KEY</span>
            </div>
            <div className="endpoint">
              <span className="method get">GET</span>
              <code>/api/me/donations</code>
              <span className="ket-endpoint">Riwayat donasi lengkap dengan pesan supporter</span>
              <span className="auth-tag">API KEY</span>
            </div>
            <div className="endpoint">
              <span className="method post">POST</span>
              <code>/api/me/regenerate-key</code>
              <span className="ket-endpoint">Bikin API key baru, key lama otomatis mati</span>
              <span className="auth-tag">API KEY</span>
            </div>
          </div>
        </section>
      </div>

      <footer>
        Dibikin buat belajar REST API. Traktir bukan afiliasi resmi Saweria.
      </footer>
    </>
  )
}
