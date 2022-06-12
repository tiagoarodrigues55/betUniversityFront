import React, { MouseEventHandler, ReactElement } from 'react';
import { IconType } from 'react-icons';
import { Container, Title, Text } from './style';

interface CardProps {
	icon?: ReactElement<IconType>;
	title: string;
	text?: string | number;
	onClick: MouseEventHandler<HTMLAnchorElement>;
}

export const Card = ({ icon, title, text, onClick }: CardProps) => {
	return (
		<a onClick={onClick}>
			<Container>
				{icon}
				<Title>{title}</Title>
				<Text>{text}</Text>
			</Container>
		</a>
	);
};
