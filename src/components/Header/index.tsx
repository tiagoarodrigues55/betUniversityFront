import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import Logo from '../Logo';
import useEvent from '../../context/EventContext';
import * as S from './styles';

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
						<S.Event
							onClick={() => {
								changeEvent('integramix');
								setOpenEvents(false);
							}}
						>
							NDU
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
					<b>
						{session?.user?.wallet?.toFixed(2)}
						<Image src="/betcoin.jpeg" width={20} height={20} />
					</b>
				</S.Wallet>
			</S.Top>
			<S.Bottom>
				<Logo />
			</S.Bottom>
		</S.Wrapper>
	);
}

export default Header;
