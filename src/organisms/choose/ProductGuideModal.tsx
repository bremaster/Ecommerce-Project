import React, { useState } from 'react'
import { Box, Stack, Typography, Modal, Button } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

import CarouselItem from 'molecules/choose/CarouselItem'
import { ProductGuideItem } from 'molecules'
import { GUIDE_ITEM_LIST } from 'constants/index'

const LAYOUT_BREAK_POINT = 800

const useProductGuideStyle = makeStyles((theme) =>
  createStyles({
    modal: {
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
    desktopModal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 749,
      height: 352,
      backgroundColor: '#FFF',
      borderRadius: '10px',
      padding: '36px 35px 30px',
      [theme.breakpoints.down(LAYOUT_BREAK_POINT)]: {
        display: 'none',
      },
    },
    mobileModal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 252,
      height: 380,
      backgroundColor: '#FFF',
      borderRadius: '10px',
      padding: '36px',
      [theme.breakpoints.up(LAYOUT_BREAK_POINT)]: {
        display: 'none',
      },
    },
    mobileModalItem: {
      height: '100%',
    },
    buttonStyle: {
      backgroundColor: '#FFF',
      border: `1px solid transparent`,
      borderRadius: '10px',
      width: '180px',
      height: '45px',
      background:
        'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'border-box, text',
      boxShadow: '2px 1000px 2px #fff inset',
      '&:focus': {
        outline: 0,
      },
      '& h6': {
        fontFamily: 'Outfit',
        fontSize: '14px',
        fontWeight: 600,
        background:
          'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
    buttonWrap: {
      position: 'absolute',
      width: 'calc(100% - 70px)',
      bottom: '30px',
    },
    arrow: {
      width: 25,
    },
    cancel: {
      width: 20,
      position: 'absolute',
      right: '20px',
      top: '20px',
      cursor: 'pointer',
    },
  })
)

type Props = {
  modalStatus: boolean
}

export const ProductGuideModal: React.FC<Props> = ({
  modalStatus,
}: Props): JSX.Element => {
  const [open, setOpen] = useState(!modalStatus)
  const [num, setNum] = useState(1)
  const classes = useProductGuideStyle()
  const handleClose = () => {
    setOpen(false)
    // only string type can be used in localStorage
    localStorage.setItem('modalStatus', 'true')
  }

  const increaseNum = () => {
    if (num === 4) {
      return handleClose()
    }

    return setNum(num + 1)
  }

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      className={classes.modal}
    >
      <Box>
        <Box className={classes.desktopModal}>
          <Box
            component="img"
            src="/assets/cancel.svg"
            className={classes.cancel}
            onClick={handleClose}
          />
          <Stack direction="row">
            {GUIDE_ITEM_LIST.map((item, index) => (
              <Stack direction="row" key={index}>
                <Box height="200px" key={index}>
                  <ProductGuideItem item={item} />
                </Box>
                {index + 1 < GUIDE_ITEM_LIST.length && (
                  <Stack alignItems="center" justifyContent="center">
                    <Box
                      component="img"
                      src="/assets/CaretDown.svg"
                      className={classes.arrow}
                    />
                  </Stack>
                )}
              </Stack>
            ))}
          </Stack>
          <Stack alignItems="center" className={classes.buttonWrap}>
            <Button className={classes.buttonStyle} onClick={handleClose}>
              <Typography variant="h6" component="h6">
                ギフトを選ぶ
              </Typography>
            </Button>
          </Stack>
        </Box>
        <Box className={classes.mobileModal}>
          <Stack className={classes.mobileModalItem} justifyContent="space-between">
            <Box
              component="img"
              src="/assets/cancel.svg"
              className={classes.cancel}
              onClick={handleClose}
            />
            <Box height="200px">
              <ProductGuideItem item={GUIDE_ITEM_LIST[num - 1]} />
            </Box>
            <CarouselItem num={num} />
            <Stack alignItems="center">
              <Button className={classes.buttonStyle} onClick={increaseNum}>
                <Typography variant="h6" component="h6">
                  {num < 4 ? '次へ' : 'ギフトを選ぶ'}
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  )
}
