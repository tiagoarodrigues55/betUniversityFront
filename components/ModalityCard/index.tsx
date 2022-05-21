import React, { ReactElement } from 'react';
import { IconType } from 'react-icons';
import { Container, Title, Text } from './style';

interface CardProps {
	icon?: ReactElement<IconType>;
	title: string;
	text?: string | number;
}

export const Card = ({ icon, title, text }: CardProps) => {
	return (
		<Container>
			{icon}
			<Title>{title}</Title>
			<Text>{text}</Text>
		</Container>
	);
};
