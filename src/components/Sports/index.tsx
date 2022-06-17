import { BiBeer, BiFootball } from 'react-icons/bi';
import { FaBasketballBall, FaVolleyballBall } from 'react-icons/fa';
import { IoIosFootball } from 'react-icons/io';
import { MdSportsHandball } from 'react-icons/md';
import * as S from './styles';

type SportsProps = {
	sport: string;
	handleChooseSport: (sport: string) => void;
};

function Sports({ sport, handleChooseSport }: SportsProps) {
	return (
		<S.Wrapper>
			<S.Sport
				className={sport === 'Futebol' ? 'active' : ''}
				onClick={() => handleChooseSport('Futebol')}
			>
				<BiFootball size={30} color={sport === 'Futebol' ? '#F78232' : "#FFFFFF"} />
			</S.Sport>
			<S.Sport
				className={sport === 'Basquete' ? 'active' : ''}
				onClick={() => handleChooseSport('Basquete')}
			>
				<FaBasketballBall size={30} color={sport === 'Basquete' ? '#F78232' : "#FFFFFF"} />
			</S.Sport>
			<S.Sport
				className={sport === 'Vôlei' ? 'active' : ''}
				onClick={() => handleChooseSport('Vôlei')}
			>
				<FaVolleyballBall size={30} color={sport === 'Vôlei' ? '#F78232' : "#FFFFFF"} />
			</S.Sport>
			<S.Sport
				className={sport === 'Handebol' ? 'active' : ''}
				onClick={() => handleChooseSport('Handebol')}
			>
				<MdSportsHandball size={30} color={sport === 'Handebol' ? '#F78232' : "#FFFFFF"} />
			</S.Sport>
			<S.Sport
				className={sport === 'Futsal' ? 'active' : ''}
				onClick={() => handleChooseSport('Futsal')}
			>
				<IoIosFootball size={30} color={sport === 'Futsal' ? '#F78232' : "#FFFFFF"} />
			</S.Sport>
			<S.Sport
				className={sport === 'XassaPong' ? 'active' : ''}
				onClick={() => handleChooseSport('XassaPong')}
			>
				<BiBeer size={30} color={sport === 'XassaPong' ? '#F78232' : "#FFFFFF"} />
			</S.Sport>
		</S.Wrapper>
	);
}

export default Sports;
