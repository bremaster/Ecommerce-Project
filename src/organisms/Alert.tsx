import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
  message: {
    whiteSpace: 'pre-line',
  },
})

export const Alert = ({
  message,
  handleClose,
}: {
  message: string
  handleClose: () => void
}): JSX.Element => {
  const classes = useStyles()

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'エラーが発生しました'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className={classes.message}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>閉じる</Button>
      </DialogActions>
    </Dialog>
  )
}
