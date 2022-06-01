import React from 'react'

import makeStyles from '@mui/styles/makeStyles'
import { useHistory } from 'react-router-dom'
import { SquareButton } from 'atoms'

const useStyles = makeStyles({
  commonButton: {
    width: 'calc(100% - 1.5rem)',
    maxWidth: '1000px',
    background:
      'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
    borderRadius: '10px',
    color: 'white',
    fontFamily: 'Noto Sans JP',
  },
})

export const StartGiftDiagnosisButton: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <SquareButton
      buttonType="primary"
      className={classes.commonButton}
      onClick={() => history.push('/product/top')}
    >
      ギフト診断を始める
    </SquareButton>
  )
}
