import Bets from '../components/Bets/Bets'
import FormsProgress from '../components/FormsProgress'
import { useAuth } from '../hooks/auth/auth';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from '../components/Button';
import LiquidCash from '../components/LiquidCash'
import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react';

export default function UserPage() {
  const { setData, user } = useAuth();
  const [showQrCode, setShowQrCode] = useState(false)
  const [pointsToLiquid, setPointsToLiquid] = useState(0)

  useEffect(() => {
  }, [showQrCode])

  function teste(value) {
    setShowQrCode(true)
    setPointsToLiquid(value)
    console.log(setShowQrCode)
  }
  return (
    <>

      {
        showQrCode ? (
          <>
            <QRCodeSVG value={`http://interbet.app/liquid?points=${pointsToLiquid}`} />
            <Button text="X" onClick={() => setShowQrCode(false)} />
          </>
        ) : (
          <>
            <FormsProgress progress={user.forms_progress} />
            <br />
            Envie o Link para os seus amigos e ganhe pontos a cada vez que eles acertarem alguma aposta
            < br />
            <CopyToClipboard
              text={encodeURI(`https://interbet.app?afiliate_id=${user.name}`)}
              onCopy={() => alert("Copied")}>
              <Button text="Copiar Link" />
            </CopyToClipboard>
            <br />
            <LiquidCash onClick={teste} />
            <br />
            <Bets user_id={user.id} />
          </>
        )
      }
    </>
  )
}