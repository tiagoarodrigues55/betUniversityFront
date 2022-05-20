import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import 'dotenv/config';

export default async function runEvent(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { event_id, winner } = req.body;
	const bets = await axios.get(
		process.env.HOST + `/api/bets?filter={"event_id": "${event_id}"}`
	);
	const usersToBeUpdated = {};
	bets.data.map((bet) => {
		const amount = bet.bet_value * bet.odds[bet.bet];
		if (bet.bet === winner) {
			usersToBeUpdated[bet.user_id]
				? (usersToBeUpdated[bet.user_id] =
						usersToBeUpdated[bet.user_id] + amount)
				: (usersToBeUpdated[bet.user_id] = amount);
		}
	});
	const updateUsers = new Promise((resolve, reject) => {
		Object.entries(usersToBeUpdated).forEach(async ([key, value]) => {
			const user = await axios.get(
				process.env.HOST + `/api/users?filter={"id":"${key}"}`
			);
			axios
				.put(process.env.HOST + `/api/users?filter={"id":"${key}"}`, {
					wallet: user.data[0].wallet + value,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((err) => reject(err));
		});
	});
	const updateBets = new Promise((resolve, reject) => {
		axios
			.put(process.env.HOST + `/api/bets?filter={"event_id": "${event_id}"}`, {
				status: 'closed',
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => reject(err));
	});
	const updateEvent = new Promise((resolve, reject) => {
		axios
			.put(process.env.HOST + `/api/events?filter={"id":"${event_id}"}`, {
				status: 'closed',
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => reject(err));
	});
	Promise.all([updateBets, updateUsers, updateEvent]).then((response) => {
		res.json(response);
	});
}
