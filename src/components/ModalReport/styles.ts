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

export const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	/* align-items: center; */
	position: relative;
	max-width: 50rem;
	width: 100%;
	padding: 2.4rem;
	background-color: #331a4d;
	border-radius: 0.5rem;
	margin: 0 1rem;
	color: #ffffff;

	@media (max-width: 400px) {
		padding: 1.6rem;
	}

	h4 {
		font-size: 1.8rem;
	}

	button {
		cursor: pointer;
		background-color: orange;
		color: #ffffff;
		border-radius: 20px;
		padding: .8rem;
		border: none;
		font-size: 1.2rem;
		width: 100%;
	}

	.form-control {
		margin: 2rem 0;
		width: 100%;

		label {
			font-size: 1.4rem;
		}

		textarea {
			width: 100%;
			color: #ffffff;
			margin-top: 1rem;
			padding: 1rem;
			height: 8rem;
			background: transparent;
			border: 1px solid #a5a5a5;
		}
	}
`;

