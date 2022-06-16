import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import api from '../services/api'
import Swal from 'sweetalert2';


export default function Liquid(req) {
  const [password, setPassword] = useState('')

  const router = useRouter()
  useEffect(() => {
    if (password === "1234") {
      console.log(router.query.value);
      api.post('/api/admin/liquid', { id: router.query.user_id, value: router.query.value }).then(res => {
        if (!res.data.error) {
          console.log(res.data)
          return Swal.fire({
            text: 'Boa sorte!',
            title: 'Saldo liquidado com sucesso',
            icon: 'success',
            confirmButtonText: 'Bora',
            background: '#331A4d',
            color: '#2ed03d'
          });
        } else {
          return Swal.fire({
            text: res.data.error.message,
            icon: 'error',
            confirmButtonText: 'Entendi',
            background: '#331A4d',
          });
        }
      })
    }
  }, [password])
  return (
    <input onChange={(e) => setPassword(e.target.value)} />
  )
}