import { events } from '../../../services/registers-repo'
import { getOdds } from '../../../utils/getOdds';

export default async function handler(req, res) {
  const { method } = req

  const { status, modality } = req?.query

  if (status) {
    const response = await events.getEventsByProps(status, 'status')
    res.json(response.data)
  }
  if (modality) {
    const response = await events.getEventsByProps(modality, 'modality')
    res.json(response.data)
  }

  switch (method) {
    case 'GET':
      const response = await events.getAll()
      res.json(response.data)
      break;
    case 'POST':
      const { name, teams, modality, place, date } = req.body;
      const newEvent = {
        name,
        teams,
        odds: getOdds(teams, modality),
        modality,
        status: 'open',
        bets: [0, 0, 0],
        payments: [0, 0, 0],
        debts: [0, 0, 0],
        place,
        date,
      };

      const findEvent = await events.getEventByName(name)

      if (findEvent.status !== 200) {
        const createEvent = await events.create(newEvent);
        if (createEvent.statusText === 'Created') {
          return res.status(200).json({ status: 'Cadastro criado com sucesso', user: createEvent.body[0] });
        }
        return res.status(201).json({
          status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
        });
      }
      res.status(findEvent.status)
      break;
    case 'PUT':
      const updateEvent = await events.update(req.body.name, req.body)
      if (updateEvent.status === 200) {
        return res.status(200).json({ status: 'Atualizado com sucesso', user: updateEvent.body[0] });
      } else {
        return res.status(201).json({
          status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
        });
      }
  }
}