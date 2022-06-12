import Image from 'next/image';
import * as S from './styles';

import logo from '../../public/logo.png';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

function Header() {
	const { data: session } = useSession();
	const [openEvents, setOpenEvents] = useState(false);

	return (
		<S.Wrapper>
			<S.Top>
				<Image src="/logo.png" width={120} height={80} />

				<S.ButtonContainer>
					<S.ButtonEvents
						onClick={() => setOpenEvents((prevState) => !prevState)}
					>
						Escolha o evento
						{openEvents ? (
							<FiChevronUp size={22} color="#AEAEB3" />
						) : (
							<FiChevronDown size={22} color="#AEAEB3" />
						)}
					</S.ButtonEvents>
					<S.Events showEvents={openEvents}>
						<S.Event>Integramix</S.Event>
						<S.Event>InterUSP</S.Event>
						<S.Event>Intermed</S.Event>
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
