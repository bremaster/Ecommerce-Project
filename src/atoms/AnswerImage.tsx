import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Skeleton } from '@mui/material'
import { COLOR } from 'theme'
import { useAspectRatio } from 'utilities/CommonHooks'

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

const useStyles = makeStyles({
  img: {
    width: '100%',
    objectFit: 'cover',
    /* aspectRatio: '1', */
    borderRadius: '0.5rem',
    border: `1px solid ${COLOR.quizoutlineGray}`,
    cursor: 'pointer',
  },
  skeleton: {
    width: '100%',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
  textButton: {
    marginTop: '0.3rem',
    '& .MuiButton-label': {
      letterSpacing: '0.15rem !important', // overwrite default letter spacing
    },
  },
})

export const AnswerImage = (props: Props): JSX.Element => {
  const classes = useStyles()
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
        <img
          className={classes.img}
          src={props.image}
          onClick={props.handleClick}
          ref={squareRatioRef}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          className={classes.skeleton}
          ref={squareRatioRef}
        ></Skeleton>
      )}
      {props.label && (
        <Button className={classes.textButton} onClick={props.handleClick}>
          {props.label}
        </Button>
      )}
    </Box>
  )
}

AnswerImage.defaultProps = defaultPropsValue
