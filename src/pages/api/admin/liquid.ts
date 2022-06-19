import { users, bets, games } from '../../../services/registers-repo'

export default async function liquid(
  req,
  res
) {
  const { id, value } = req?.query
  const response = await users.liquidPoints(id, value)
  return res.json(response)
}