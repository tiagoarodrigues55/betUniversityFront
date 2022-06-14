import { users } from '../../../services/registers-repo'

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      const response = await users.getAll()
      return res.json(response.data)
    case 'POST':
      const { email, name, favorite_team, wallet, forms_progress, expected_bet, afiliation_id } = req.body;
      const newUser = {
        email,
        name,
        favorite_team,
        total_bet: 0,
        wallet,
        score: 0,
        forms_progress,
        expected_bet: Number(expected_bet),
        afiliation_id
      };

      const findUser = await users.getUserByEmail(email)

      if (findUser.status !== 200) {
        const createUser = await users.create(newUser);
        if (createUser.statusText === 'Created') {
          return res.status(200).json({ status: 'Cadastro criado com sucesso', user: createUser.body[0] });
        }
        return res.status(201).json({
          status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
          newUser,
        });
      } else {
        const updateUser = await users.update(req.body.email, req.body)
        if (updateUser.status === 200) {
          return res.status(200).json({ status: 'Atualizado com sucesso', user: updateUser.body[0] });
        } else {
          return res.status(201).json({
            status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
          });
        }
      }
    case 'PUT':
      const updateUser = await users.update(req.body.email, req.body)
      if (updateUser.status === 200) {
        return res.status(200).json({ status: 'Atualizado com sucesso', user: updateUser.body[0] });
      } else {
        return res.status(201).json({
          status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
        });
      }
  }
}