import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../services/supabaseClient';

export default async function createUser(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const { email, password, isGoogle } = req.body;

	if (isGoogle) {
		const findUser = await supabase
			.from('users')
			.select('*')
			.eq('email', email)
			.single();

		if ( 
			findUser.body?.password === null ||
			findUser.body?.password === undefined
		) {
			return res
				.status(200)
				.json({ status: 'Bora criar seu cadastro', isUser: false });
		} else {
			findUser.body.password = undefined;
			return res
				.status(200)
				.json({ status: 'Bora apostar!', user: findUser.body, isUser: true });
		}
	} else {
		const findUser = await supabase
			.from('users')
			.select('*')
			.eq('email', email)
			.eq('password', password)
			.single();

		if (findUser.status !== 200) {
			return res.status(200).json({
				status: 'Bora fazer seu cadastro',
				isUser: false,
			});
		} else {
			findUser.body.password = undefined;
			findUser.body.id = undefined;
			return res.status(200).json({ status: 'Bem vindo', user: findUser.body, isUser: true });
		}
	}
}
