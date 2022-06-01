import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'
import { Skeleton } from '@mui/material'
import { useAspectRatio } from 'utilities/CommonHooks'

interface Props {
  image: string
}
const defaultPropsValue: Props = {
  image: 'https://picsum.photos/200/200/?random',
}

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    textAlign: 'start',
    margin: '0 auto 0 0',
    '& img': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '100%',
    },
  },
  skeleton: {
    minWidth: theme.spacing(7),
    maxWidth: theme.spacing(7),
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    cursor: 'pointer',
  },
}))

export const AnswerImageCircle = (props: Props) => {
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
      display="flex"
      flexDirection="column"
      alignItems="center"
      mx="auto"
      className={classes.imgContainer}
    >
      {isSrcLoaded ? (
        <img src={props.image} ref={squareRatioRef} />
      ) : (
        <Skeleton
          variant="rectangular"
          className={classes.skeleton}
          ref={squareRatioRef}
        ></Skeleton>
      )}
    </Box>
  )
}

AnswerImageCircle.defaultProps = defaultPropsValue
