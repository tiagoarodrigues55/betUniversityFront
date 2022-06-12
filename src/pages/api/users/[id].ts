import { users } from '../../../services/registers-repo'

export default async function handler(req, res) {
  const { id } = req.query
  const user = await users.getUserById(id)
  res.json(user)
}