import { useState, useEffect } from 'react';

import { useAuth } from '../hooks/auth/auth';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';
import FooterBar from '../components/FooterBar'
import { Navbar } from '../components/Navbar'
import Feed from './feed'
import Login from './Login'
import UserPage from './userPage'

export default function Index() {
	const { setData, user } = useAuth();
	const [page, setPage] = useState("feed")
	const [loading, setLoading] = useState(false);
	const pages = {
		feed: <Feed />,
		userPage: <UserPage />
	}
	return (

		// user ? (
		// 	<Login />
		// ) : (
		<>
			<Navbar title="Interbet" link="http://localhost:3000" />
			{pages[page]}
			{/* <FooterBar/> */}
		</>
		// )
	);
}
