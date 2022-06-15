import Image from 'next/image';
import * as S from './styles';

import logo from '../../public/logo.png';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useEffect, useState } from 'react';
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
				<S.ButtonContainer>
					<S.ButtonEvents
						onClick={() => setOpenEvents((prevState) => !prevState)}
					>
						{openEvents ? (
							<FiChevronUp size={22} color="#FFFFFF" />
						) : (
							<FiChevronDown size={22} color="#FFFFFF" />
						)}
						{event}
					</S.ButtonEvents>
					<S.Events showEvents={openEvents}>
						<S.Event onClick={() => {
							changeEvent('Integramix')
							setOpenEvents(false)
						}}>
							Integramix
						</S.Event>
						{/* <S.Event onClick={() => {
							changeEvent('Interusp')
							setOpenEvents(false)
						}}>InterUSP</S.Event>
						<S.Event onClick={() => {
							changeEvent('Intermed')
							setOpenEvents(false)
						}}>Intermed</S.Event> */}
					</S.Events>
				</S.ButtonContainer>

				<S.Wallet>
					<b>{session?.user?.wallet} $</b>
				</S.Wallet>
			</S.Top>
			<S.Bottom>
				<Logo />
			</S.Bottom>
		</S.Wrapper>
	);
}

export default Header;
