import React, { useState } from 'react'

import { Box, Dialog, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles'

/* import { GradientOutlinedButton } from 'atoms' */

type Props = {
  button: React.ReactNode
  giftToken: string
}

export const GiftPreview = ({ button, giftToken }: Props) => {
  const [open, setOpen] = useState(false)
  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), {
    defaultMatches: false,
  })

  /* Show reciever page in iframe */
  const giftLink = `/gift?token=${giftToken}&preview=true`
  const recieverPage = (
    <iframe width="100%" height="100%" frameBorder="0" src={giftLink} />
  )

  return (
    <>
      <Box onClick={() => setOpen(true)}>{button}</Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiPaper-root': isLaptop
            ? {
                borderRadius: '10px',
                margin: 'auto',
                width: '100vw',
                height: '100vh',
                maxWidth: '900px',
              }
            : {
                /* Decrease size to 90% */
                borderRadius: '10px',
                width: '100vw',
                height: '100vh',
                MozTransform: 'scale(0.9, 0.9)',
                WebkitTransform: 'scale(0.9, 0.9)',
                OTransform: 'scale(0.9, 0.9)',
                msTransform: 'scale(0.9, 0.9)',
                transform: 'scale(0.9, 0.9)',
                MozTransformOrigin: 'top left',
                WebkitTransformOrigin: 'top left',
                OTransformOrigin: 'top left',
                msTransformOrigin: 'top left',
                transformOrigin: 'top left',
                left: '5%',
                top: '5%',
                margin: '0',
              },
        }}
      >
        {recieverPage}
      </Dialog>
    </>
  )
}
