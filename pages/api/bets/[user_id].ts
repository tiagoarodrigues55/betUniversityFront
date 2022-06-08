import { bets } from '../../../services/registers-repo'

export default async function handler(req, res) {
  const { user_id } = req.query
  const response = await bets.getBetsByUserId(user_id)
  res.json(response.data)
}