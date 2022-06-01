/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import makeStyles from '@mui/styles/makeStyles'
import { SquareButton } from 'atoms'
import { MenuAppBar } from 'organisms'
import { Layout } from 'templates/Layout'
import { COLOR } from 'theme'

const MessageField = withStyles({
  root: {
    '& .MuiFilledInput-root': {
      backgroundColor: COLOR.formGrey,
    },
    '& label.Mui-focused': {
      color: COLOR.formGrey,
    },
    '& .MuiFilledInput-multiline': {
      padding: '10px',
    },
    '& .MuiInputBase-inputMultiline': {
      fontSize: '12px',
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottom: 'none',
    },
  },
})(TextField)

const useStyles = makeStyles({
  messageCount: {
    paddingTop: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'gray',
    '& p': {
      textAlign: 'end',
      fontSize: '12px',
      letterSpacing: '1px',
      marginBottom: 0,
    },
  },
  messageInvalid: {
    color: COLOR.alertRed,
  },
  selectedGiftHeader: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '30px',
  },
  selectedGiftBox: {
    display: 'flex',
    border: `solid 1px ${COLOR.borderGray}`,
    borderRadius: '4px',
  },
  selectedGiftImg: {
    flex: 1,
    maxWidth: '85px',
  },
  selectedGiftDescription: {
    flex: 3,
    padding: '13px 10px',
    '& h6': {
      letterSpacing: '1px',
      fontSize: '14px',
      fontWeight: 700,
      margin: '0 0 4px 0',
    },
  },
  selectedGiftBrandName: {
    fontSize: '10px',
    margin: 0,
    color: COLOR.brandNameGray,
    letterSpacing: '1px',
  },
  selectedGiftPrice: {
    margin: '0 0 6px 0',
    fontSize: '10px',
  },
})

type Props = {
  giftName?: string
  giftImage?: string
  giftBrand?: string
  prices?: Array<{
    col1: string
    col2: string
  }>
  handleNextButtonClicked: () => void
  message: string
  setMessage: (message: string) => void
}

export const MessageForm = ({
  giftName,
  giftImage,
  giftBrand,
  prices,
  handleNextButtonClicked,
  message,
  setMessage,
}: Props) => {
  const classes = useStyles()
  const [isMessageInvalid, setIsMessageInvalid] = useState(false)
  const maxMessageLength = 300

  useEffect(() => {
    message.length > maxMessageLength
      ? setIsMessageInvalid(true)
      : setIsMessageInvalid(false)
  }, [message])

  return (
    <Layout>
      <MenuAppBar backButton={true} />
      <Box width="100%">
        <Box pt={5} pb={3}>
          <Typography>メッセージを入力してください（任意）</Typography>
        </Box>
        <Box textAlign="start">
          <Typography display="block" variant="body2">
            メッセージ（任意）
          </Typography>
          <MessageField
            placeholder="メッセージを入力してください（任意）"
            multiline
            rows={4}
            fullWidth
            defaultValue={message}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
        </Box>
        <Box mb={4} className={classes.messageCount}>
          <p>300文字以内</p>
          <Box>
            <p>{message.length} / 300</p>
            {isMessageInvalid ? (
              <p className={classes.messageInvalid}>300文字を超えています</p>
            ) : undefined}
          </Box>
        </Box>

        {giftName && (
          <Box>
            <Typography className={classes.selectedGiftHeader} variant="body2">
              選択中のギフト
            </Typography>
            <Box className={classes.selectedGiftBox} mb={5}>
              <img src={giftImage} className={classes.selectedGiftImg} />
              <Box className={classes.selectedGiftDescription}>
                <h6>{giftName}</h6>
                <p className={classes.selectedGiftPrice}>
                  {prices !== undefined && prices[0].col2}
                </p>
                <p className={classes.selectedGiftBrandName}>{giftBrand}</p>
              </Box>
            </Box>
          </Box>
        )}
        <SquareButton
          isDisable={isMessageInvalid}
          buttonType="primary"
          fullWidth={true}
          onClick={handleNextButtonClicked}
        >
          次へ
        </SquareButton>
      </Box>
    </Layout>
  )
}
