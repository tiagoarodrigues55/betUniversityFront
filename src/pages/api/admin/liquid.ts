import { users, bets, games } from '../../../services/registers-repo'

export default async function liquid(
  req,
  res
) {
  const { id, value } = req?.body
  if (!id || !value) {
    return res.json({ status: "error" })
  }
  const response = await users.liquidPoints(id, value)
  return res.json(response)
}