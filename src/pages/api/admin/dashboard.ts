import { games } from '../../../services/registers-repo'
import { getOdds } from '../../../utils/getOdds';

export default async function handler(req, res) {
  const { method } = req

  const response = await games.getAll()

  return res.json(response.data.map(game => {
    const entries = game.payments[0] + game.payments[1]
    const debts = game.debts[game.winner] || 0
    return {
      entries,
      debts,
      saldo: entries - debts
    }
  }))
}