import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { users } from '../services/registers-repo';
import ProfileTemplate from '../templates/Perfil';

function Profile() {
	return <ProfileTemplate />;
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const isUserInDatabase = await users.getUserByEmail(session?.user?.email);

	// if (!session) {
	// 	return {
	// 		redirect: {
	// 			destination: '/login',
	// 			permanent: false,
	// 		},
	// 	};
	// }

	// if (!isUserInDatabase?.data?.email) {
	// 	return {
	// 		redirect: {
	// 			destination: '/register',
	// 			permanent: false,
	// 		},
	// 	};
	// }

	return {
		props: {},
	};
};
