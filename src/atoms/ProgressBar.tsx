import { LinearProgress } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { COLOR } from 'theme'

const useStyles = makeStyles({
  root: {
    background: COLOR.progressBarGray,
  },
  barColorPrimary: {
    background: COLOR.primaryNavy,
  },
})

export type Props = {
  totalStepCount?: number
  onChange?: () => void
  className?: string
}

export const ProgressBar: React.FC<Props> = ({
  totalStepCount = 5,
  onChange,
  className,
}) => {
  const classes = useStyles()

  const [step, setStep] = React.useState<number>(0)

  const HandleChange = React.useCallback(() => {
    if (onChange) onChange()
    if (totalStepCount >= step) {
      setStep((prev) => {
        return prev + 1
      })
    }
  }, [onChange, totalStepCount, step])

  return (
    <LinearProgress
      className={className}
      onClick={HandleChange}
      color="primary"
      variant="determinate"
      classes={{ determinate: classes.root, barColorPrimary: classes.barColorPrimary }}
      value={(100 / totalStepCount) * (step - 1)}
    />
  )
}
