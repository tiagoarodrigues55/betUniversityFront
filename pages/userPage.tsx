import { useTable } from 'react-table'
import { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/auth/auth'

function UserPage() {
  const [data, setData] = useState([])

  const { user } = useAuth();



  useEffect(() => {
    axios.post('/api/get-bets', { user_id: user.id }).then(res => {
      console.log(res.data.bets)
      setData(res.data.bets || [])
    })
  }, [])



  return (
    <>
      {
        data.map(bet => {
          return (
            <div>
              <h2>{bet.event_id}</h2>
            </div>
          )
        })
      }
    </>
  )
}

export default UserPage