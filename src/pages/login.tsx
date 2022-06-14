import LoginTemplate from '../templates/Login';
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const { afiliation_id } = router.query
  if (typeof window !== "undefined") {
    localStorage.setItem("afiliation_id", String(afiliation_id))
  }
  return <LoginTemplate />
}
