import React from 'react'

import { Box, Typography, Divider } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { SquareButton } from 'atoms'
import { Layout } from 'templates/Layout'
import { COLOR } from 'theme'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  changeButton: {
    fontSize: '12px',
    color: COLOR.subOrange,
    borderBottom: `1px solid ${COLOR.subOrange}`,
    lineHeight: '13px',
    cursor: 'pointer',
  },
  info: {
    lineHeight: '1rem',
    marginBottom: '3rem',
    '& MuiTypography-root': {
      fontSize: '14px',
    },
  },
  title: {
    textAlign: 'center',
    padding: '23px 0',
    fontWeight: 700,
    fontSize: '18px',
    letterSpacing: '0.05em',
  },
  section: {
    fontSize: '16px',
    fontWeight: 700,
  },
  divider: {
    borderColor: COLOR.subtleGray,
    width: '100vw',
    maxWidth: theme.breakpoints.values.md,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}))

type Props = {
  postalCode?: string
  address?: string
  name?: string
  email?: string
  phoneNumber?: string
  handleBackButton: () => void
  handleNextButton: () => void
  children: React.ReactNode
}

export const AddressConfirm: React.FC<Props> = ({
  postalCode = '1450594',
  address = '仙台市青葉区２−２２−１０３',
  name = '斉藤 依紗',
  email = 'youremail@gmail.com',
  phoneNumber = '070-1234-5678',
  handleBackButton = () => console.log('back'),
  handleNextButton = () => console.log('next'),
  children,
}) => {
  const classes = useStyles()

  return (
    <Layout>
      <Typography className={classes.title}>お届け先情報の確認</Typography>

      {/* gift info */}
      <Box width="100%" mb={1} mt={2}>
        <Typography className={classes.section}>お受取りギフト</Typography>
      </Box>
      {children}

      <Divider className={classes.divider} />

      {/* reciever info */}
      <div className={classes.root}>
        <Box className={classes.header}>
          <Typography className={classes.section}>お届け先情報</Typography>
          <Typography className={classes.changeButton} onClick={handleBackButton}>
            変更する
          </Typography>
        </Box>
        <Box className={classes.info}>
          <Typography>{name}</Typography>
          <Typography>{phoneNumber}</Typography>
          <Typography>{email}</Typography>
          <Typography>{postalCode}</Typography>
          <Typography>{address}</Typography>
        </Box>
        <SquareButton buttonType="primary" fullWidth={true} onClick={handleNextButton}>
          確定する
        </SquareButton>
      </div>
    </Layout>
  )
}
