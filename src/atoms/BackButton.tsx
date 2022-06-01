import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { useHistory } from 'react-router-dom'

interface Props {
  /** click handler. default is history.goBack */
  handleClick?: () => void
  /** class name */
  position: 'top' | 'bottom'
}

export const BackButton: React.FC<Props> = ({ handleClick, position }) => {
  const useStyles = makeStyles({
    bottom: {
      position: 'absolute',
      height: '7vh',
      bottom: '0',
      zIndex: 1,
    },
    top: {
      position: 'absolute',
      height: '1vh',
      zIndex: 1,
    },
  })

  const classes = useStyles()
  const classValues = classes[position]

  const history = useHistory()
  // if no handleClick prop is given, history.goBack() is set as default
  const clickHandler = handleClick ? handleClick : history.goBack

  return (
    <div onClick={clickHandler} className={classValues}>
      <img src={`${process.env.PUBLIC_URL}/assets/back_button.svg`} alt="back_button" />
    </div>
  )
}
