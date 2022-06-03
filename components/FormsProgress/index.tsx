import { ProgressBar, Button } from 'react-bootstrap';
import Router from 'next/router';
const questions = require('../../assets/questions.json')

export default function FormsProgress({ progress }) {
  const realProgress = Number((progress / questions.length).toFixed(2))
  return (
    <>
      <ProgressBar now={realProgress} label={`${realProgress}%`} />
      {progress < 100 ? (
        <Button striped variant="success" onClick={() => Router.push('/forms')}>Continuar</Button>
      ) : null}
    </>
  )
}