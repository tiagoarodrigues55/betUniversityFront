import { bets } from '../../../services/registers-repo'

export default async function handler(req, res) {
  const { id } = req.query
  const response = await bets.getBetsByEventId(id)
  res.json(response.data)
}