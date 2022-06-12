import styled from 'styled-components';

export const Wrapper = styled.header`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	padding: 1rem 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Top = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Wallet = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`

export const ButtonContainer = styled.div`
	position: relative;
`;

export const ButtonEvents = styled.button`
	padding: 0.7rem;
	border: 1px solid orange;
	border-radius: 10px;
	font-size: 16px;

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

	background-color: #eeeeee;

	padding: 0.5rem 0;
	border-radius: 0.5rem;
`;

export const Event = styled.button`
	font-size: 16px;
	cursor: pointer;
	padding: 0.8rem;
	width: 100%;
	text-align: left;

	/* & + & { */
	/* } */

	/* background-color: #b5b5b5; */
	border: 0;
	border-bottom: 1px solid #b5b5b5;

	&:first-child {
		border-top: 1px solid #b5b5b5;
	}
`;
