import { userInfo } from 'os'
import Bets from '../components/Bets/Bets'
import FormsProgress from '../components/FormsProgress'
import { useAuth } from '../hooks/auth/auth';

export default function UserPage() {
  const { setData, user } = useAuth();

  return (
    <>
      <FormsProgress progress={user.forms_progress} />
      <Bets user_id={user.id} />
    </>
  )
}