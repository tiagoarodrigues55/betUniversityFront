import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
`

export const Sport = styled.button`
	border-radius: 30px 30px 0 0;
	background: #f5f5f5;
	padding: 10px;

	display: flex;
	justify-content: center;
	align-items: center;

	border: 0;
	cursor: pointer;

	&.active {
		background: #b8b8b8;
	}
`;