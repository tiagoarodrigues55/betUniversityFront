import styled from 'styled-components';

import { colors } from '../../styles/global';

import { ButtonProps } from '.';

export const ButtonStyled = styled.button<ButtonProps>`
	padding: ${({ padding }) => padding ?? '9px 60px'};
	border-radius: 8px;
	font-size: 0.95rem;
	font-weight: bolder;
	display: inline-block;
	width: ${({ width }) => width ?? 'auto'};
	border: ${({ border }) => border ?? 'none'};
	cursor: pointer;
	background-color: ${({ color }) => color ?? colors.purple};
	color: ${({ textColor }) => textColor ?? 'black'};
	&:hover {
		text-decoration: none;
		transition: all 0.5s;
		background-color: ${({ hoverColor }) => hoverColor ?? colors.primaryPurple};
	}
`;
