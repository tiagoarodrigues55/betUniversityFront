import { games } from '../../../services/registers-repo'
import { getOdds } from '../../../utils/getOdds';

export default async function handler(req, res) {
  const { method } = req

  const { status, modality, event } = req?.query

  if (status && modality) {
    const response = await games.getGamesByMultipleProps({ value: status, name: 'status' }, { value: modality, name: 'modality' }, { value: event, name: 'event' })
    return res.json(response.data)
  }
  if (status) {
    const response = await games.getGamesByProps(status, 'status')
    return res.json(response.data)
  }
  if (modality) {
    const response = await games.getGamesByProps(modality, 'modality')
    return res.json(response.data)
  }

  switch (method) {
    case 'GET':
      const response = await games.getAll()
      return res.json(response.data)
    case 'POST':
      const { name, teams, modality, place, date, event } = req.body;
      const newGame = {
        name,
        teams,
        odds: getOdds(teams, modality),
        modality,
        status: 'open',
        bets: [0, 0],
        payments: [0, 0],
        debts: [0, 0],
        place,
        date,
        event,
      };

      const findGame = await games.getGameByName(name)

      if (findGame.status !== 200) {
        const createGame = await games.create(newGame);
        if (createGame.statusText === 'Created') {
          return res.status(200).json({ status: 'Cadastro criado com sucesso', game: createGame.body[0] });
        }
        return res.status(201).json({
          status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
        });
      }
      res.status(findGame.status)
      break;
    case 'PUT':
      const updateGame = await games.update(req.body.id, req.body)
      if (updateGame.status === 200) {
        return res.status(200).json({ status: 'Atualizado com sucesso', game: updateGame.body[0] });
      } else {
        return res.status(201).json({
          status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
        });
      }
  }
}