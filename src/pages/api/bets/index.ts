import { bets } from '../../../services/registers-repo'

export default async function handler(req, res) {
  const { method } = req

  const { status, game_id } = req?.query

  if (status && game_id) {
    const response = await bets.getBetsByMultipleProps({ value: status, name: 'status' }, { value: game_id, name: 'game_id' })
    res.json(response.data)
  }
  if (status) {
    const response = await bets.getBetsByProps(status, 'status')
    res.json(response.data)
  }
  if (game_id) {
    const response = await bets.getBetsByProps(game_id, 'game_id')
    res.json(response.data)
  }

  switch (method) {
    case 'GET':
      const response = await bets.getAll()
      res.json(response.data)
      break;
    case 'POST':
      const { user_id, game_id, game_name, teams, modality, odds, bet, bet_value, offer } = req.body;
      const newBet = {
        user_id,
        game_id,
        modality,
        odds,
        bet,
        bet_value: Number(bet_value),
        offer,
        game_name,
        teams,
        status: 'open',
        result: null
      };
      console.log(newBet)
      const createBet = await bets.create(newBet);
      const updatedGame = await bets.updateGame(newBet)
      const updateUser = await bets.updateUser(Number(bet_value), user_id)

      const error = createBet.error || updatedGame.error || updateUser.error
      if (error) {
        console.log(createBet.error, updatedGame.error, updateUser.error)
        return res.status(500).json({ error })
      }
      return res.status(200).json({ status: 'Aposta criada com sucesso', bet: createBet.body[0] })

    case 'PUT':
      const updateBet = await bets.update(req.body.id, req.body)
      if (updateBet.status === 200) {
        return res.status(200).json({ status: 'Atualizado com sucesso', user: updateBet.body[0] });
      } else {
        return res.status(201).json({
          status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
        });
      }
  }
}