import { ButtonStyled } from './styles';

export interface ButtonProps {
	// Props for Element
	text?: string;
	id?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	className?: string;
	padding?: string;
	width?: string;
	color?: string;
	textColor?: string;
	hoverColor?: string;
	border?: string;
	dataTestId?: string;
	disable?: boolean;

	onClick?: (event: any) => void;
	onMouseDown?: () => void;
}

export function Button({
	padding,
	width,
	color,
	textColor,
	hoverColor,
	type,
	id,
	className,
	text,
	border,
	dataTestId,
	onMouseDown,
	onClick,
}: ButtonProps) {
	return (
		<ButtonStyled
			padding={padding}
			width={width}
			border={border}
			color={color}
			textColor={textColor}
			hoverColor={hoverColor}
			data-testid={dataTestId || 'button'}
			className={className}
			id={id}
			onClick={onClick}
			onMouseDown={onMouseDown}
			type={type ?? 'button'}
		>
			{text}
		</ButtonStyled>
	);
}
