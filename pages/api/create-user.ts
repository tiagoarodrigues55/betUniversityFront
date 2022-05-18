import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import 'dotenv/config';

export default async function createUser(req: NextApiRequest,
	res: NextApiResponse) {
	const { email, password, favorite_team } = req.body;
	const newUser = {
		email,
		password,
		favorite_team,
		total_bet: 0,
		wallet: 100,
		score: 0,
	};

	axios.post(process.env.HOST + '/api/users', newUser).then((prevRes) => {
		console.log(prevRes);
		res.json(prevRes.data);
	});
}
