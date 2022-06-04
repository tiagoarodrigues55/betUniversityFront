import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../services/supabaseClient';

export default async function getBets(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	console.log(req.query)
	const findBets = await supabase
		.from('bets')
		.select('*')
		.eq('user_id', req.query.user_id);

	return res
		.status(200)
		.json({ status: 'Bora apostar!', bets: findBets.body });
}
