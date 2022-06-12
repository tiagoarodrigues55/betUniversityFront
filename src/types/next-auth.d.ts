import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			wallet: number;
			total_bet: number;
			score: number;
			forms_progress: number;
			expected_bet: number;
			favorite_team: string;
			id: number;
		} & DefaultSession['user'];
	}
}
