import { users, bets, games } from '../../../services/registers-repo'

export default async function runEvent(
  req,
  res
) {
  const { id, value } = req?.body
  const response = await users.liquidPoints(id, value)
  return res.json(response)
}