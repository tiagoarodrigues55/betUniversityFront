import axios from 'axios';
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';

import { Event } from '../../Types';
import useEmblaCarousel from 'embla-carousel-react';
import { useAuth, getUser } from '../../hooks/auth/auth';
import { InputControlledCurrency } from '../InputControlledCurrency';
import { moneyMask, undoMoneyMask } from '../../utils/masks';
import { Button } from '../Button';
import Swal from 'sweetalert2';
import LoadingScreen from '../LoadingScreen';


export const Bet = ({ selectedOdd, selectedCard, doBet }) => {
  const { setData, user } = useAuth();
  const [expectedReturn, setExpectedReturn] = useState('00,00');
  const [onLoad, setOnLoad] = useState(false)

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm();


  function useExternalValue() {
    return undoMoneyMask(getValues('bet')) ? false : true
  }

  const bet = async (card, odd) => {
    const bet = getValues('bet');
    const betValue = Number(undoMoneyMask(bet));
    if (user.wallet >= betValue) {
      const payload = {
        user_id: user.id,
        event_id: card.id,
        event_name: card.name,
        teams: card.teams,
        modality: card.modality,
        odds: card.odds,
        bet: card.odds.indexOf(odd),
        bet_value: betValue,
        offer: false,
        status: 'open',
      };
      setOnLoad(true)
      doBet(payload, betValue)
    } else {
      return Swal.fire({
        text: 'Saldo Insuficiente',
        icon: 'error',
        confirmButtonText: 'Entendi',
      });
    }
  };
  function onChange(value) {
    // setBetValue(Number(undoMoneyMask(value)))
    setExpectedReturn((Number(selectedCard.odds[selectedOdd]) * Number(undoMoneyMask(value))).toFixed(2))
  }

  return (
    onLoad ? (
      <LoadingScreen />
    ) : (
      <div>
        <h2>
          {selectedCard.name} - {selectedCard.teams[0]} X {selectedCard.teams[1]}
        </h2>
        <p>{selectedCard.teams[selectedOdd] || "Empate"} Odd: {selectedCard.odds[selectedOdd]}</p>
        <InputControlledCurrency
          control={control}
          style={{ width: '300px' }}
          name="bet"
          type="number"
          placeholder="Valor apostado em reais"
          precision="2"
          decimalSeparator=","
          thousandSeparator="."
          onChange={onChange}
          prefix="R$"
          error={errors.salary && errors.salary.message}
        />
        <p>
          Retorno esperado: R$
          {expectedReturn}
        </p>
        <Button
          onClick={() => bet(selectedCard, selectedOdd)}
          text={'Apostar'}
        />
      </div>
    )
  );
};
