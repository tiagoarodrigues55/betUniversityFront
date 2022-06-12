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

export default function GameCard({ game, selectOdd }) {
  const [selectedCard, setSelectedCard] = useState<Card>();
  const [selectedOdd, setSelectedOdd] = useState<number>();

  return (
    <Container className="embla__slide" key={game.id}>
      <RowDivStyled>
        <Title>{game.name}</Title>
        <Title></Title>
      </RowDivStyled>

      <TeamName>{`1: ${game.teams[0]}`}</TeamName>
      <TeamName>{`2: ${game.teams[1]}`}</TeamName>
      <ButtonsDivStyled key={game.id}>
        <ButtonDivStyled>
          <p>Time 1</p>
          <button
            onClick={() => selectOdd({ game, odd: 0 })}
          >
            {game.odds[0]}
          </button>{' '}
        </ButtonDivStyled>

        <ButtonDivStyled>
          <p>Empate</p>
          <button
            onClick={() => selectOdd({ game, odd: 2 })}
          >
            {game.odds[2]}
          </button>
        </ButtonDivStyled>
        <ButtonDivStyled>
          <p>Time 2</p>
          <button
            onClick={() => selectOdd({ game, odd: 1 })}
          >
            {game.odds[1]}
          </button>
        </ButtonDivStyled>
      </ButtonsDivStyled>
    </Container>
  );
}