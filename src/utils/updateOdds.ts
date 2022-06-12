export const updateOdds = (balance: []) => {
	const equilibriumConst = (balance[0] + balance[1] + 10);
	const marginHouse = 0.1;
	const balanceListDuplicate = [...balance, ...balance];
	const newOdds = [];
	balance.forEach((bet) => {
		const A = balanceListDuplicate[balance.indexOf(bet)] + equilibriumConst;
		const B = balanceListDuplicate[balance.indexOf(bet) + 1] + equilibriumConst;
		const odd = (1 - marginHouse) * (1 + B / A);
		newOdds.push(Number(odd.toFixed(2)));
	});
	return newOdds;
};
