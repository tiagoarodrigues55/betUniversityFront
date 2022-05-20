import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import 'dotenv/config';
import { getOdds } from '../../utils/getOdds';

export default async function createEvent(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { name, teams, modality } = req.body;
	const newEvent = {
		name,
		teams,
		odds: getOdds(teams, modality),
		modality,
		status: 'open',
		bets: [0, 0, 0],
		payments: [0, 0, 0],
		debts: [0, 0, 0],
	};
	axios.post(process.env.HOST + '/api/events', newEvent).then((prevRes) => {
		console.log(prevRes);
		return res.json(prevRes.data);
	});
}
