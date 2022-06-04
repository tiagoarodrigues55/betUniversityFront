import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ProgressBar, Button } from 'react-bootstrap';
import Router from 'next/router';
const questions = require('../../assets/questions.json')

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function FormsProgress({ progress }) {
  const realProgress = Number((progress / questions.length * 100).toFixed(2))
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={realProgress} />
      </Box>
      {progress < 100 ? (
        <Button variant="success" onClick={() => Router.push('/forms')}>Continuar</Button>
      ) : null}
    </>
  )
}
