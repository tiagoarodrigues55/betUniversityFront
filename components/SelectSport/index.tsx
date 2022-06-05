import { Card } from '../../components/ModalityCard';

import {
  CardDiv,
  CardsSection,
  TwoCards,
  TwoCardsSecond,
} from './styles';
import { FaFutbol } from 'react-icons/fa';
import { MdSportsHandball } from 'react-icons/md';
import { GiPartyPopper } from 'react-icons/gi';
import { BsCalendarEvent } from 'react-icons/bs';

export default function SelectSport({ selectSport }) {
  return (
    <CardsSection>
      <TwoCards>
        <Card
          icon={<FaFutbol size={30} className="mt-3" />}
          title="Futebol"
          text="Ver partidas"
          onClick={() => selectSport("futebol")}
        />
        <CardDiv>
          <Card
            icon={<MdSportsHandball size={30} className="mt-3" />}
            title="Handebol"
            text="Ver partidas"
            onClick={() => selectSport("handebol")}
          />
        </CardDiv>
      </TwoCards>

      <TwoCardsSecond>
        <Card
          icon={<GiPartyPopper size={30} className="mt-3" />}
          title="Festas"
          text="Ver festas"
          onClick={() => selectSport("futsal")}
        />
        <CardDiv>
          <Card
            icon={<BsCalendarEvent size={30} className="mt-3" />}
            title="Eventos"
            text="Ver eventos"
            onClick={() => selectSport("basquete")}
          />
        </CardDiv>
      </TwoCardsSecond>
    </CardsSection>
  )
}