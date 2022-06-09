import { useState, useEffect } from 'react';

import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { BiUserCircle } from 'react-icons/bi';
import { FiBarChart2, FiHome, FiMenu, FiUser } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import { BackgroundDiv, DrawerDivStyled } from './styles';

import UniBet from '../../assets/UniBet.png';

import { useAuth } from '../../hooks/auth/auth';

import { Logout } from '../../utils/logout';
import { User } from '../../Types';
import { useSession } from 'next-auth/react';

import * as S from './styles';

function Navbar() {
	const { data: session } = useSession();

	const [isHiddenBackdrop, setIsHiddenBackdrop] = useState(true);
	const [isHiddenMenu, setIsHiddenMenu] = useState(true);

	return (
		<S.Wrapper>
			<Link href="/" passHref>
				<S.NavLink>
					<FiHome color="#fff" size={38} />
				</S.NavLink>
			</Link>
			<Link href="/ranking" passHref>
				<S.NavLink>
					<FiBarChart2 color="#fff" size={38} />
				</S.NavLink>
			</Link>
			<Link href="/profile" passHref>
				<S.NavLink>
					<FiUser color="#fff" size={38} />
				</S.NavLink>
			</Link>
		</S.Wrapper>
	);
}

export default Navbar;
