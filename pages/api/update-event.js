import axios from 'axios';
import 'dotenv/config';
import updateOdds from '../../utils/updateOdds';

export default async function updateEvent(req, res) {
	const { odds, bet, bet_value, event_id } = req.body;
	const event = await axios.get(
		process.env.HOST + `/api/events?filter={"id": "${event_id}"}`
	);
	if (!event.data[0]) {
		res.json([]);
		return;
	}
	const oldEvent = event.data[0];
	const newBets = oldEvent.bets.map((currentBet, index) =>
		index === bet ? currentBet + 1 : currentBet
	);
	const newPayments = oldEvent.payments.map((payments, index) =>
		index === bet ? payments + bet_value : payments
	);
	const newDebts = oldEvent.debts.map((debts, index) =>
		index === bet ? debts + bet_value * odds[bet] : debts
	);
	const newEvent = {
		odds: updateOdds(newDebts),
		bets: newBets,
		payments: newPayments,
		debts: newDebts,
	};
	axios
		.put(process.env.HOST + `/api/events?filter={"id":"${event_id}"}`, newEvent)
		.then((prevRes) => {
			res.json(prevRes.data);
		})
		.catch((err) => console.error(err));
}
