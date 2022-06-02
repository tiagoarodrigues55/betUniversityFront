import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../services/supabaseClient';

export default async function createUser(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	const { email, name, favorite_team, wallet, forms_progress, expected_bet } = req.body;
	const newUser = {
		email,
		name,
		favorite_team,
		total_bet: 0,
		wallet,
		score: 0,
		forms_progress,
		expected_bet,
	};

	const findUser = await supabase
		.from('users')
		.select('*')
		.eq('email', email)
		.single();

	if (findUser.body?.password === undefined || findUser.body?.password === null) {
		if (findUser.status !== 200) {
			const createUser = await supabase.from('users').insert(newUser);
			if (createUser.statusText === 'Created') {
				return res.status(200).json({ status: 'Cadastro criado com sucesso', user: createUser.body[0] });
			} else {
				return res.status(201).json({
					status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
				});
			}
		}
	} else {
		const updateuser = await supabase.from('users').update(newUser).match({ id: findUser.body.id });
		if (!updateuser.error) {
			return res.status(200).json({
				status: 'Você já possui cadastro', isUser: true
			});
		} else {
			console.log(updateuser.error)
			return res.status(201).json({
				status: 'Ocorreu algum erro inesperado, tente novamente mais tarde',
			});
		}
	}
}
