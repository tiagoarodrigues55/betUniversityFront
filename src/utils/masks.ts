export const moneyMask = (valor: string | number) => {
	if (!valor) return '';
	valor = parseFloat(valor.toString().replaceAll('R$', '')).toFixed(2) + '';
	valor = parseInt(valor.replace(/[\D]+/g, ''));
	valor = valor + '';
	valor = valor.replace(/([0-9]{2})$/g, ',$1');

	if (valor.length > 6) {
		valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
	}

	return 'R$ ' + valor;
};

export const dateMask = (date: string) => {
	if (!date) return '';

	const parsedDate = date.split('-');

	return parsedDate[2] + '/' + parsedDate[1] + '/' + parsedDate[0];
};

export const experyMask = (expery: string) => {
	const parsedDate = expery.split('-');

	return parsedDate[1] + '/' + parsedDate[0];
};

export const undoDateMask = (date: string) => {
	const parsedDate = date.split('/');

	return parsedDate[2] + '-' + parsedDate[1] + '-' + parsedDate[0];
};

export const undoMoneyMask = (amount: string | number) => {
	if(!amount) return
	return amount
		.toString()
		.replace('R$', '')
		.replace('.', '')
		.replace(',', '.')
		.trim();
};

export const capitalize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const phoneMask = (phone: string) => {
	const number = phone.replace('+55', '');

	return (
		'(' +
		number.substring(0, 2) +
		') ' +
		number[2] +
		' ' +
		number.substring(3, 7) +
		'-' +
		number.substring(7, number.length)
	);
};

export const cpfMask = (cpf: string) => {
	return (
		cpf.substring(0, 3) +
		'.' +
		cpf.substring(3, 6) +
		'.' +
		cpf.substring(6, 9) +
		'-' +
		cpf.substring(cpf.length - 2, cpf.length)
	);
};
