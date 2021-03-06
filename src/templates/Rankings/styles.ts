import styled from 'styled-components';

export const Wrapper = styled.section`
	padding: 2rem 1.6rem;
	padding-bottom: 4rem;
	margin-bottom: 6rem;
	
	background-color: #3a1653;
	color: #ffff;
`;

export const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	gap: 1.6rem;
	justify-content: space-between;

	margin: 1rem 0;
`;

type ButtonProps = {
	isActive: boolean;
};

export const Button = styled.button<ButtonProps>`
	padding: 0.8rem;
	width: 100%;

	background-color: ${({ isActive }) => (isActive ? 'orange' : 'transparent')};
	border: ${({ isActive }) => (isActive ? 'none' : '1px solid orange')};

	color: #fff;
	// color: ${({ isActive }) => (isActive ? '#ffffff' : '#000000')};
	border-radius: 10px;
`;

export const RankingList = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

export const RankingItem = styled.li`
	display: grid;
	grid-template-columns: 2fr 1fr;
	align-items: center;
	gap: 1rem;

	span:last-child {
		display: flex;
		align-items: flex-end;
		gap: 0.3rem;
	}
`;
