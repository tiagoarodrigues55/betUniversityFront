import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import { supabase } from '../../../services/supabaseClient';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
	secret: process.env.SECRET,
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token, user }) {
			const findUser = await supabase
				.from('users')
				.select('*')
				.eq('email', session?.user?.email)
				.single();

			if (findUser.data) {
				return {
					...session,
					user: {
						...session.user,
						id: findUser.data.id,
						favorite_team: findUser.data.favorite_team,
						total_bet: findUser.data.total_bet,
						wallet: findUser.data.wallet,
						score: findUser.data.score,
						forms_progress: findUser.data.forms_progress,
						expected_bet: findUser.data.expected_bet,
					},
				};
			}
			return session;
		},
		async signIn({ user, account, profile, email, credentials }) {
			try {
				// const findUser = await supabase
				// 	.from('users')
				// 	.select('*')
				// 	.eq('email', user.email)
				// 	.single();

				// const newUser = {
				// 	email: user.email,
				// 	name: user.name,
				// 	favorite_team: '',
				// 	total_bet: 0,
				// 	wallet: 0,
				// 	score: 0,
				// 	forms_progress: 0,
				// 	expected_bet: 0,
				// };

				// if (findUser.data && findUser.data.email === user.email) {
				// 	return true;
				// }

				return true;
			} catch (error) {
				return false;
			}
		},
	},
});
