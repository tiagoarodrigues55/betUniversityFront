import {
  Container,
  Title,
  TeamName,
  RowDivStyled,
  ButtonsDivStyled,
  ButtonDivStyled,
} from './style';
import { useState, useEffect } from 'react'

interface Card {
  name: string;
  teams: string[];
  id: string;
  modality: string;
  odds: number[];
}

export default function EventCard({ event, selectOdd }) {
  const [selectedCard, setSelectedCard] = useState<Card>();
  const [selectedOdd, setSelectedOdd] = useState<number>();

  return (
    <Container className="embla__slide" key={event.id}>
      <RowDivStyled>
        <Title>{event.name}</Title>
        <Title></Title>
      </RowDivStyled>

      <TeamName>{`1: ${event.teams[0]}`}</TeamName>
      <TeamName>{`2: ${event.teams[1]}`}</TeamName>
      <ButtonsDivStyled key={event.id}>
        <ButtonDivStyled>
          <p>Time 1</p>
          <button
            onClick={() => selectOdd({ event, odd: 0 })}
          >
            {event.odds[0]}
          </button>{' '}
        </ButtonDivStyled>

        <ButtonDivStyled>
          <p>Empate</p>
          <button
            onClick={() => selectOdd({ event, odd: 2 })}
          >
            {event.odds[2]}
          </button>
        </ButtonDivStyled>
        <ButtonDivStyled>
          <p>Time 2</p>
          <button
            onClick={() => selectOdd({ event, odd: 1 })}
          >
            {event.odds[1]}
          </button>
        </ButtonDivStyled>
      </ButtonsDivStyled>
    </Container>
  );
}