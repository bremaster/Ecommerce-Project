import React from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/system'

interface Props {
  /** click handler. default is history.goBack */
  handleClick?: () => void
  /** class name */
  position: 'top' | 'bottom'
}

const Bottom = styled('div')({
  position: 'absolute',
  height: '7vh',
  bottom: '0',
  zIndex: 1,
})

const Top = styled('div')({
  position: 'absolute',
  height: '1vh',
  zIndex: 1,
})

export const BackButton: React.FC<Props> = ({ handleClick, position }) => {
  const navigate = useNavigate()
  // if no handleClick prop is given, history.goBack() is set as default

  const SelectedTag = position === 'bottom' ? Bottom : Top

  return (
    <SelectedTag
      onClick={() => {
        if (handleClick) {
          handleClick()
        } else {
          navigate(-1)
        }
      }}
    >
      <img src={`${process.env.PUBLIC_URL}/assets/back_button.svg`} alt="back_button" />
    </SelectedTag>
  )
}
