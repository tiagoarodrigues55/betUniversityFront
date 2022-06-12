import { games } from '../../../services/registers-repo'

export default async function handler(req, res) {
  const { name } = req.query
  const game = await games.getGameByName(name)
  res.json(game)
}