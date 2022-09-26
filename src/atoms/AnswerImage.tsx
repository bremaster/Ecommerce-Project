import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { Skeleton } from '@mui/material'
import { COLOR } from 'theme'
import { useAspectRatio } from 'utilities/CommonHooks'

import { styled } from '@mui/system'

interface Props {
  /** image URL */
  image: string
  /** on click handler */
  handleClick: () => void
  /** text shown below image */
  label?: string
  /** size of image */
  width?: string
}

const defaultPropsValue: Props = {
  image: 'https://picsum.photos/id/237/200/300',
  handleClick: () => {
    alert('clicked!')
  },
  label: '',
  width: '100%',
}

const StyledImg = styled('img')({
  width: '100%',
  objectFit: 'cover',
  /* aspectRatio: '1', */
  borderRadius: '0.5rem',
  border: `1px solid ${COLOR.quizoutlineGray}`,
  cursor: 'pointer',
})

const StyledSkeleton = styled(Skeleton)({
  width: '100%',
  borderRadius: '0.5rem',
  cursor: 'pointer',
})

const TextButton = styled(Button)({
  marginTop: '0.3rem',
  '& .MuiButton-label': {
    letterSpacing: '0.15rem !important', // overwrite default letter spacing
  },
})

export const AnswerImage = (props: Props): JSX.Element => {
  const squareRatioRef = useAspectRatio<HTMLImageElement>(1.0)
  const [isSrcLoaded, setIsSrcLoaded] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      setIsSrcLoaded(true)
    }

    const image = new Image()
    image.src = props.image
    image.addEventListener('load', handleLoad)
    return () => {
      image.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <Box
      width={props.width}
      display="flex"
      flexDirection="column"
      alignItems="center"
      mx="auto"
    >
      {isSrcLoaded ? (
        <StyledImg src={props.image} onClick={props.handleClick} ref={squareRatioRef} />
      ) : (
        <StyledSkeleton variant="rectangular" ref={squareRatioRef}></StyledSkeleton>
      )}
      {props.label && <TextButton onClick={props.handleClick}>{props.label}</TextButton>}
    </Box>
  )
}
AnswerImage.defaultProps = defaultPropsValue
