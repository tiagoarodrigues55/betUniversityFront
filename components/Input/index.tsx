import React from 'react';
import { InputHTMLAttributes } from 'react';

import { Control, Controller } from 'react-hook-form';

import InputMask from 'react-input-mask';

import {
	ContainerStyled,
	GroupStyled,
	ErrorStyled,
	ErrorDivStyled,
} from './style';

export interface InputProps extends InputHTMLAttributes<any> {
	// Props for Element
	mask?: string;
	inputRef?: React.RefObject<HTMLInputElement>;
	useExternalValue?: boolean;
	dataTestId?: string;

	// React-hook-form
	name: string;
	control?: Control;
	error?: string;
}

export function Input<ReactFragment>({
	mask = '',
	name,
	control,
	error,
	dataTestId,
	inputRef,
	useExternalValue,
	...rest
}: InputProps) {
	return (
		<>
			<GroupStyled>
				<ContainerStyled>
					<Controller
						control={control}
						name={name}
						defaultValue={rest.defaultValue}
						render={({
							field: { onChange: onChangeForm, value: valueForm },
						}) => (
							<InputMask
								{...rest}
								style={{ width: rest.width, fontSize: '0.8rem' }}
								mask={mask}
								value={useExternalValue ? rest.value : valueForm}
								onChange={(e) => {
									onChangeForm(e);
									if (rest.onChange) {
										rest.onChange(e);
									}
								}}
								data-testid={dataTestId}
							/>
						)}
					/>
				</ContainerStyled>
				<ErrorDivStyled>
					{error && <ErrorStyled>{error}</ErrorStyled>}
				</ErrorDivStyled>
			</GroupStyled>
		</>
	);
}
