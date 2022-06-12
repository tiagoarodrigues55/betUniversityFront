import {
	useState,
	InputHTMLAttributes,
	HTMLInputTypeAttribute,
	ReactElement,
} from 'react';

import { Control, Controller } from 'react-hook-form';

import InputMask from 'react-input-mask';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import {
	GroupStyled,
	ContainerStyled,
	PasswordDivStyled,
	ErrorStyled,
} from '../Input/style';

import { colors } from '../../styles/global';

interface InputProps extends InputHTMLAttributes<any> {
	// Props for Element
	dataTestId?: string;
	isControlled: boolean;
	mask?: string;
	toolTip?: ReactElement;

	// React-hook-form
	name: string;
	control?: Control;
	error?: string;
}

export function InputPassword({
	dataTestId,
	isControlled,
	mask = '',
	toolTip,
	name,
	control,
	error,
	...rest
}: InputProps) {
	const [hidden, setHidden] = useState(true);
	const [newType, setNewType] = useState<HTMLInputTypeAttribute | undefined>(
		rest.type
	);

	//  Function to hide the value
	const handleHiddenValue = () => {
		setHidden(!hidden);

		if (hidden === false) setNewType('password');
		else setNewType('text');
	};

	const showPassword = () => {
		return (
			<>
				{hidden ? (
					<PasswordDivStyled tabIndex={-1} id="hide_password">
						<AiOutlineEye onClick={handleHiddenValue} size="22px" />
					</PasswordDivStyled>
				) : (
					<PasswordDivStyled tabIndex={-1} id="show_password">
						<AiOutlineEyeInvisible
							color={colors.purple}
							onClick={handleHiddenValue}
							size="22px"
						/>
					</PasswordDivStyled>
				)}
			</>
		);
	};

	const controlledInput = () => (
		<GroupStyled>
			<ContainerStyled>
				<Controller
					data-testid="controllInput"
					control={control}
					name={name}
					render={({ field: { onChange, value } }) => (
						<InputMask
							style={{ width: rest.width, fontSize: '0.8rem' }}
							mask={mask}
							placeholder={rest.placeholder}
							disabled={rest.disabled}
							value={value}
							onChange={onChange}
							name={name}
							type={newType}
							data-testid={dataTestId}
						/>
					)}
				/>
				{showPassword()}
				{toolTip}
			</ContainerStyled>
		</GroupStyled>
	);

	const uncontrolledInput = () => (
		<GroupStyled>
			<ContainerStyled>
				<InputMask
					style={{ width: rest.width, fontSize: '0.8rem' }}
					mask={mask}
					placeholder={rest.placeholder}
					disabled={rest.disabled}
					value={rest.value}
					onChange={rest.onChange}
					name={name}
					type={newType}
					data-testid={dataTestId}
				/>
				{showPassword()}

				{toolTip}
			</ContainerStyled>
		</GroupStyled>
	);

	return (
		<>
			{isControlled ? controlledInput() : uncontrolledInput()}
			{error && <ErrorStyled>{error}</ErrorStyled>}
		</>
	);
}
