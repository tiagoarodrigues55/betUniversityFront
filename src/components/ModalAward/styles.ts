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

	max-height: 40rem;
	overflow-y: auto;

	@media (max-width: 400px) {
		padding: 1.6rem;
	}

	h4 {
		font-size: 1.6rem;
	}
`;

export const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

export const ProductsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;

	margin-top: 24px;
`;

export const Product = styled.div`
	display: grid;
	grid-template-columns: 127px auto;
	gap: 1rem;
`;

export const ProductImage = styled.div`
	background-color: #260539;
	padding: 12px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
`;

export const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	span {
		font-size: 14px;
	}

	h5 {
		font-size: 18px;
		font-weight: 500;
	}
`;

type SelectAwardButtonProps = {
	isAwardSelected: boolean
}

export const SelectAwardButton = styled.button<SelectAwardButtonProps>`
	padding: 9px 0;
	width: 100%;
	text-align: center;
	color: #fff;
	cursor: pointer;
	background: ${({ isAwardSelected }) =>
		isAwardSelected ? 'orange' : 'transparent'};
	border: ${({ isAwardSelected }) =>
		isAwardSelected ? '1px solid orange' : '1px solid orange'};
	border-radius: 8px;
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
	margin-top: 24px;
`;