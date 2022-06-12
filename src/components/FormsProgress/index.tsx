import styled from 'styled-components';
import * as React from 'react';
import LinearProgress, {
	LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ProgressBar, Button } from 'react-bootstrap';
import Router from 'next/router';
import Link from 'next/link';
const questions = require('../../assets/questions.json');

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number }
) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

export const Anchor = styled.a`
	padding: 0.8rem;
	width: 100%;
  display: block;
  text-align: center;

	background-color: orange;
	border: none;
	color: #ffffff;

	border-radius: 10px;

	cursor: pointer;
	text-decoration: none;
`;

export default function FormsProgress({ progress }) {
	const realProgress = Number(((progress / questions.length) * 100).toFixed(2));
	return (
		<>
			<Box sx={{ width: '60%' }}>
				<LinearProgressWithLabel value={realProgress} />
			</Box>
			{progress < 100 ? (
				<Link href="/forms" passHref>
					<Anchor>Continuar</Anchor>
				</Link>
			) : null}
		</>
	);
}
