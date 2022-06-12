import { BiFootball } from 'react-icons/bi';
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
				<BiFootball size={30} color="#000" />
			</S.Sport>
			<S.Sport
        className={sport === 'Basquete' ? 'active' : ''}
				onClick={() => handleChooseSport('Basquete')}
			>
				<FaBasketballBall size={30} color="#000" />
			</S.Sport>
			<S.Sport
        className={sport === 'Volei' ? 'active' : ''}
				onClick={() => handleChooseSport('Volei')}
			>
				<FaVolleyballBall size={30} color="#000" />
			</S.Sport>
			<S.Sport
        className={sport === 'Handebol' ? 'active' : ''}
				onClick={() => handleChooseSport('Handebol')}
			>
				<MdSportsHandball size={30} color="#000" />
			</S.Sport>
			<S.Sport
				className={sport === 'Futsal' ? 'active' : ''}
				onClick={() => handleChooseSport('Futsal')}
			>
        <IoIosFootball size={30} color="#000" />
			</S.Sport>
		</S.Wrapper>
	);
}

export default Sports;
