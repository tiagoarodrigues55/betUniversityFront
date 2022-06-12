import Image from 'next/image';
import * as S from './styles';

import logo from '../../public/logo.png';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Logo from '../Logo';
import useEvent from '../../context/EventContext';

function Header() {
	const { changeEvent, event } = useEvent();
	const { data: session } = useSession();
	const [openEvents, setOpenEvents] = useState(false);

	return (
		<S.Wrapper>
			<S.Top>
				<Logo />

				<S.ButtonContainer>
					<S.ButtonEvents
						onClick={() => setOpenEvents((prevState) => !prevState)}
					>
						{event}
						{/* Escolha o evento */}
						{openEvents ? (
							<FiChevronUp size={22} color="#AEAEB3" />
						) : (
							<FiChevronDown size={22} color="#AEAEB3" />
						)}
					</S.ButtonEvents>
					<S.Events showEvents={openEvents}>
						<S.Event onClick={() => changeEvent('Integramix')}>Integramix</S.Event>
						<S.Event onClick={() => changeEvent('Interusp')}>InterUSP</S.Event>
						<S.Event onClick={() => changeEvent('Intermed')}>Intermed</S.Event>
					</S.Events>
				</S.ButtonContainer>
			</S.Top>
			<S.Wallet>
				<span>Betcoin:</span>
				<b>{session?.user?.wallet}</b>
			</S.Wallet>
		</S.Wrapper>
	);
}

export default Header;
