import crypto from 'crypto'

const g = globalThis

if (!g.__traktirDB) {
  g.__traktirDB = {
    creators: new Map(),
    donations: []
  }
}

const db = g.__traktirDB

export function createCreator({ username, name }) {
  if (db.creators.has(username)) {
    throw new Error('username sudah dipakai')
  }
  const creator = {
    id: crypto.randomUUID(),
    username,
    name,
    createdAt: new Date().toISOString()
  }
  db.creators.set(username, creator)
  return creator
}

export function getCreatorByUsername(username) {
  return db.creators.get(username) || null
}

export function getCreatorById(id) {
  for (const creator of db.creators.values()) {
    if (creator.id === id) return creator
  }
  return null
}

export function addDonation({ creatorId, supporterName, message, amount }) {
  const donation = {
    id: crypto.randomUUID(),
    creatorId,
    supporterName: supporterName && supporterName.trim() ? supporterName.trim() : 'Hamba Allah',
    message: message ? message.trim() : '',
    amount,
    createdAt: new Date().toISOString()
  }
  db.donations.push(donation)
  return donation
}

export function getDonationsByCreatorId(creatorId) {
  return db.donations
    .filter(d => d.creatorId === creatorId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getStats(creatorId) {
  const list = getDonationsByCreatorId(creatorId)
  const totalDonasi = list.reduce((sum, d) => sum + d.amount, 0)
  return {
    totalDonasi,
    jumlahSupporter: list.length
  }
}

export function getGlobalStats() {
  return {
    totalCreator: db.creators.size,
    totalDonasi: db.donations.reduce((sum, d) => sum + d.amount, 0),
    totalTraksaksi: db.donations.length
  }
}
