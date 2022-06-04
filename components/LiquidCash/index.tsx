import { InputControlledCurrency } from '../InputControlledCurrency';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';


export default function LiquidCash({ onClick }) {
  const {
    control,
    formState: { errors },
    getValues,
  } = useForm();
  return (
    <>
      <InputControlledCurrency
        control={control}
        style={{ width: '300px' }}
        name="liquid"
        type="number"
        placeholder="Valor à ser liquidado"
        precision="2"
        decimalSeparator=","
        thousandSeparator="."
        onChange={() => { }}
        prefix="R$"
        error={errors.salary && errors.salary.message}
      />
      <Button
        onClick={() => onClick(getValues("liquid"))}
        text={'Liquidar'}
      />
    </>
  )
}




