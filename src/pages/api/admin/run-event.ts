import { NextApiRequest, NextApiResponse } from 'next';

import { users, bets, games } from '../../../services/registers-repo'


export default async function runEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { game_id, winner, result } = req.body;

  const betsToUpdate = await bets.getBetsByProps(game_id, 'game_id')

  const usersToBeUpdated = {};
  betsToUpdate.data.map((bet) => {
    const amount = bet.bet_value * bet.odds[bet.bet];
    if (bet.bet === winner) {
      usersToBeUpdated[bet.user_id]
        ? (usersToBeUpdated[bet.user_id] =
          usersToBeUpdated[bet.user_id] + amount)
        : (usersToBeUpdated[bet.user_id] = amount);
    }
  });

  const userWallets = await users.getWalletIn(Object.keys(usersToBeUpdated))

  const updateUsers = await userWallets.data.map(async ({ wallet, id, afiliation_id, score }) => {
    const user = await users.update(id, { wallet: wallet + usersToBeUpdated[id], score: score + (usersToBeUpdated[id] / 2) })
    const afiliateUser = await users.update(afiliation_id, { wallet: wallet + (usersToBeUpdated[id] / 2) })
    return { user, afiliateUser }
  });
  const updateBets = await bets.update(game_id, { status: 'close', result, winner })

  const updateGame = await games.update(game_id, { status: 'close', result })

  return Promise.all([updateBets, updateUsers, updateGame]).then((response) => {
    res.json(response);
  }).catch(err => {
    res.json(err)
  })
}
