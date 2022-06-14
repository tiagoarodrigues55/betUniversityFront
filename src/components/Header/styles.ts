import styled from 'styled-components';

export const Wrapper = styled.header`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	padding: 1rem 0;
	margin-bottom: 1rem;
`;

export const Top = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Bottom = styled.div`
	display: flex;
	justify-content: center;
`

export const Wallet = styled.div`
	display: flex;
	align-items: center;
	margin-right: 1rem;
	color: #ffffff;
`;

export const ButtonContainer = styled.div`
	position: relative;
`;

export const ButtonEvents = styled.button`
	padding: 0.7rem;
	border-radius: 0 10px 10px 0;
	font-size: 16px;

	background-color: #391754;
	border: 0;

	display: flex;
	align-items: center;
	gap: 0.5rem;
	background: transparent;

	color: #ffffff;
	cursor: pointer;
`;

type Events = {
	showEvents: boolean;
};

export const Events = styled.div<Events>`
	display: ${({ showEvents }) => (showEvents ? 'flex' : 'none')};
	flex-direction: column;
	// gap: 1rem;

	position: absolute;
	top: 49px;
	width: 100%;

	background-color: orange;

	padding: 0.5rem 0;
	border-radius: 0.5rem;
	margin-left: 5px;
`;

export const Event = styled.button`
	font-size: 16px;
	cursor: pointer;
	padding: 0.8rem;
	width: 100%;
	text-align: left;

	/* & + & { */
	/* } */
	background-color: orange;
	color: #ffffff;
	border: 0;
	border-bottom: 1px solid #b5b5b5;

	&:first-child {
		border-top: 1px solid #b5b5b5;
	}
`;
