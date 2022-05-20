import { InputHTMLAttributes } from 'react';

import InputMask from 'react-input-mask';

import '../Input/style.css';
import { ContainerStyled, GroupStyled } from '../Input/style';

export interface InputProps extends InputHTMLAttributes<any> {
	mask?: string;
	dataTestId?: string;
	onKeyPress?: (value: any) => void;
}

export function InputUncontrolled({
	mask = '',
	onKeyPress,
	...rest
}: InputProps) {
	return (
		<GroupStyled>
			<ContainerStyled>
				<InputMask
					style={{ width: rest.width, fontSize: '0.8rem' }}
					mask={mask}
					id={rest.id}
					onBlur={rest.onBlur}
					onKeyUp={onKeyPress}
					placeholder={rest.placeholder}
					disabled={rest.disabled}
					value={rest.value}
					onChange={rest.onChange}
					data-testid={rest.dataTestId}
				/>
			</ContainerStyled>
		</GroupStyled>
	);
}
