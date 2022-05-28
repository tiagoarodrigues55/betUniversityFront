import { InputHTMLAttributes } from 'react';

import { Control, Controller } from 'react-hook-form';

import CurrencyInput from 'react-currency-input';

import {
	ContainerStyled,
	GroupStyled,
	ErrorStyled,
	ErrorDivStyled,
} from '../Input/style';

export interface InputProps extends InputHTMLAttributes<any> {
	// React-hook-form
	name: string;
	control?: Control;
	error?: string;
	value?: any;
	useExternalValue?: boolean;
	dataTestId?: string;

	// CurrencyInput
	decimalSeparator?: string;
	precision?: string;
	thousandSeparator?: string;
	prefix?: string;
}

export function InputControlledCurrency({
	name,
	control,
	error,
	value,
	useExternalValue,
	decimalSeparator = ',',
	precision,
	thousandSeparator = '.',
	prefix = 'R$',
	...rest
}: InputProps) {
	return (
		<GroupStyled>
			<ContainerStyled>
				<Controller
					control={control}
					data-testid="currencyInput"
					name={name}
					render={({ field: { onChange, value: valueForm } }) => (
						<CurrencyInput
							prefix={prefix}
							style={{ width: rest.width }}
							placeholder={rest.placeholder}
							data-testid={rest.dataTestId}
							value={useExternalValue ? value : valueForm}
							decimalSeparator={decimalSeparator}
							thousandSeparator={thousandSeparator}
							precision={precision}
							onChange={onChange}
							disabled={rest.disabled}
						/>
					)}
				/>
			</ContainerStyled>
			<ErrorDivStyled>
				{error && <ErrorStyled>{error}</ErrorStyled>}
			</ErrorDivStyled>
		</GroupStyled>
	);
}
