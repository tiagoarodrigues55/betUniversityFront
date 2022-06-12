import { OddsTypes } from '../types/global';

const marginHouse = 0.3
export const getOdds = ({ teams }: OddsTypes, { modality }: OddsTypes) => {
	return [2 - marginHouse, 2 - marginHouse];
};
