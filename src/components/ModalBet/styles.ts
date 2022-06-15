import styled from 'styled-components';

type ModalOpen = {
	isModalOpen: boolean;
};

export const Backdrop = styled.div<ModalOpen>`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	visibility: ${({ isModalOpen }) => (isModalOpen ? 'visible' : 'hidden')};
	opacity: ${({ isModalOpen }) => (isModalOpen ? '1' : '0')};
	transition: all ease 0.2s;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.6);
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	max-width: 50rem;
	padding: 2.4rem;
	background-color: #331a4d;
	border-radius: 0.5rem;
	width: 100%;
	margin: 0 2rem;
	color: #ffffff;
	button {
		cursor: pointer;
		background-color: orange;
		color: #ffffff;
		border-radius: 30px;
		padding: 1rem 1.3rem;
		border: none;
		margin-top: 2rem;
		font-size: 1.4rem;
		width: 100%;
	}

	svg {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	.form-control {
		margin: 2rem 0;
		width: 100%;

		label {
			font-size: 1.4rem;
		}

		input {
			width: 100%;
			color: #ffffff;
			margin-top: 1rem;
			padding: 0 1.6rem;
			height: 56px;
			background: transparent;
			border: 1px solid #a5a5a5;
		}
	}
`;

export const Odds = styled.div`
	margin: 2rem 0;
`;

export const Odd = styled.div`
	display: flex;
	gap: 3rem;
	margin-bottom: 1rem;
	align-items: center;
	justify-content: space-between;

	button {
		cursor: pointer;
		background-color: transparent;
		color: #ffffff;
		border-radius: 30px;
		padding: 0.8rem 1.3rem;
		border: 1px solid orange;
		font-size: 1rem;
		margin: 0;
		max-width: 9rem;
		width: 100%;
	}
`;

export const OddText = styled.div`
	display: flex;
	gap: 0.5rem;
	font-size: 1.6rem;

	span {
		color: green;
	}
`;
