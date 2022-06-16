import { games } from '../../../services/registers-repo'

export default async function handler(req, res) {
  const { date } = req.query
  const names = await games.getOldGames(date)
  console.log(names, `'${names.data.map(game => game.name).join(', ')}'`)

  const response = await games.lockGames(names.data.map(game => game.name))
  // const response = await games.lockGames(`'${names.data.map(game => game.name).join(', ')}'`)

  res.json({ response, names })
}