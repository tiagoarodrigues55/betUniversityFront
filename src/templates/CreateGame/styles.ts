import styled from 'styled-components';

export const Wrapper = styled.form`
	padding: 2rem 1.6rem;
	padding-bottom: 4rem;
	margin-bottom: 6rem;

	background-color: #3a1653;
	color: #ffff;

	h2 {
		font-size: 1.6rem;
	}

	button {
		width: 100%;
		margin-top: 1.6rem;
		padding: .8rem;
		background: orange;
		color: #fff;
		border: none;
		font-size: 1rem;
		font-weight: bold;
		border-radius: 8px;
		cursor: pointer;
	}
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	margin-top: 1.6rem;
`;

export const FormControl = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	label {
		font-size: 1.1rem;
	}

	input {
		width: 100%;
		padding: 0.8rem;
		border: 0;
		border-radius: 5px;
		outline: none;
		background-color: #eeeeee;
	}
`;

export const SelectContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;
	width: 100%;

	.select {
		color: #000;

		option {
			color: #000;
		}
	}
`;
