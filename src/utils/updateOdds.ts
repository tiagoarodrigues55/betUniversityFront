export const updateOdds = (balance: []) => {
	const equilibriumConst = 10;
	const marginHouse = 0.3;
	const balanceListDuplicate = [...balance, ...balance];
	const newOdds = [];
	balance.forEach((bet) => {
		const A = balanceListDuplicate[balance.indexOf(bet)] + equilibriumConst;
		const B = balanceListDuplicate[balance.indexOf(bet) + 1] + equilibriumConst;
		const C = balanceListDuplicate[balance.indexOf(bet) + 2] + equilibriumConst;
		const odd = (1 - marginHouse) * (1 + B / A + C / A);
		newOdds.push(Number(odd.toFixed(2)));
	});
	return newOdds;
};
