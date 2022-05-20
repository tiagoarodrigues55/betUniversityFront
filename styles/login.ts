import styled from 'styled-components';

import { colors } from './global';

export const MainStyled = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const IMGStyled = styled.img`
	width: 200px;
	margin: 3rem auto 2rem auto;
`;

export const TitleStyled = styled.h1`
	font-family: 'Montserrat';
	margin: 2rem auto 1rem auto;
	font-weight: 500;
	font-size: 24px;
	text-align: center;
	color: ${colors.primaryPurple};
`;

export const TextStyled = styled.p`
	font-family: 'Montserrat';
	margin: 0.5rem auto 0.5rem auto;
	font-size: 12px;
	text-align: center;
`;

export const AncStyled = styled.a`
	font-family: 'Montserrat';
	margin: 0.9rem auto;
	font-size: 12px;
	font-weight: bold;
	color: ${colors.primaryPurple};
	text-align: center;
`;

export const LinkStyled = styled.a`
	font-family: 'Montserrat';
	margin: 0.9rem auto;
	font-size: 12px;
	font-weight: bold;
	color: ${colors.primaryPurple};
	text-align: center;
`;

export const ButtonFaceStyled = styled.button`
	border-radius: 10px;
	background: #3d5a98;
	padding: 12px 15px;
`;

export const SpanStyled = styled.span`
	font-family: 'Montserrat';
	margin: 0.9rem auto;
	font-size: 12px;
	font-weight: bold;
	color: ${colors.primaryPurple};
	text-align: center;
	cursor: pointer;
`;
