import axios from 'axios';
import 'dotenv/config';

export default async function createUser(req, res) {
	const { email, password, favorite_team } = req.body;
	const newUser = {
		email,
		password,
		favorite_team,
		total_bet: 0,
		wallet: 0,
		score: 0,
	};
	axios.post(process.env.HOST + '/api/users', newUser).then((prevRes) => {
		console.log(prevRes);
		res.json(prevRes.data);
	});
}
