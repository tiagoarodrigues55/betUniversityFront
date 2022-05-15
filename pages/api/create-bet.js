import axios from 'axios';
import 'dotenv/config';

export default async function createBet(req, res) {
	const { user_id, event_id, modality, odds, bet, bet_value, offer } = req.body;
	const newBet = {
		user_id,
		event_id,
		modality,
		odds,
		bet,
		bet_value,
		offer,
		status: 'open',
	};
	axios.post(process.env.HOST + '/api/bets', newBet).then((prevRes) => {
		axios
			.post(process.env.HOST + '/api/update-event', newBet)
			.then((lastRes) => {
				res.json(lastRes.status);
			})
			.catch((err) => console.log(err));
	});
}
