import { events } from '../../../services/registers-repo'

export default async function handler(req, res) {
  const { name } = req.query
  const user = await events.getEventByName(name)
  res.json(user)
}