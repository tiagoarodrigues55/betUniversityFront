import styled from 'styled-components';

export const Wrapper = styled.section`
	background-color: #3a1653;
	padding: 2rem 1.6rem;

	color: #fff;
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1.6rem 0;

	div {
		display: flex;
		gap: 0.5rem;
	}
`;

export const UserProgress = styled.div`
	margin: 2.5rem 0;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const UserLiquid = styled(UserProgress)`
	gap: 0.5rem;
`;

export const Bets = styled.div`
	margin: 2rem 0;
	margin-bottom: 5rem;
`;

export const SelectContainer = styled.div`
	width: 100%;
	display: flex;
	gap: 1.6rem;
	justify-content: space-between;

	margin: 1rem 0;
`;

type SelectProps = {
	isActive: boolean;
};

export const Select = styled.button<SelectProps>`
	padding: 0.8rem;
	width: 100%;

	background-color: ${({ isActive }) => (isActive ? 'orange' : 'transparent')};
	border: ${({ isActive }) => (isActive ? 'none' : '1px solid orange')};

	color: #ffffff;
	border-radius: 10px;
`;

export const BetsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Bet = styled.div`
	padding: 0.7rem;
	background-color: #221133;
	border-radius: 0.5rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const BetValues = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	h4 {
		font-size: 18px;
	}
`;

export const Hr = styled.hr`
	width: 100%;
	height: 2px;
	background-color: #c5c5c5;
`;

export const whatsappButton = styled.a`
	button {
		font-size: 20px;
		padding: 1rem;
		width: 100%;
		margin-top: 1rem;
		background-color: orange;
		color: #ffffff;
		border-radius: 10px;
		border: none;
	}
`;

export const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	visibility: 'visible';
	opacity: '1';
	transition: all ease 0.2s;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.6);
`;

export const ButtonAward = styled.button`
	background-color: #bc6d8d;
	color: #ffffff;
	width: 100%;
	padding: 12px 0;
	text-align: center;
	border-radius: 8px;
	border: none;
	font-size: 1rem;
	margin-top: 1rem;
`;