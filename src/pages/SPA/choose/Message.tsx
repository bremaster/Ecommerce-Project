/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { SquareButton } from 'atoms'
import { MenuAppBar } from 'organisms'
import { Layout } from 'templates/Layout'
import { COLOR } from 'theme'

import { styled } from '@mui/system'

const MessageField = styled(TextField)({
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
})

const MessageCount = styled(Box)({
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
})

const SelectedGiftHeader = styled(Typography)({
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '30px',
})

const SelectedGiftBox = styled(Box)({
  display: 'flex',
  border: `solid 1px ${COLOR.borderGray}`,
  borderRadius: '4px',
})

const SelectedGiftImg = styled('img')({
  flex: 1,
  maxWidth: '85px',
})

const SelectedGiftDescription = styled(Box)({
  flex: 3,
  padding: '13px 10px',
  '& h6': {
    letterSpacing: '1px',
    fontSize: '14px',
    fontWeight: 700,
    margin: '0 0 4px 0',
  },
})

const SelectedGiftBrandName = styled('p')({
  fontSize: '10px',
  margin: 0,
  color: COLOR.brandNameGray,
  letterSpacing: '1px',
})

const SelectedGiftPrice = styled('p')({
  margin: '0 0 6px 0',
  fontSize: '10px',
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
  const [isMessageInvalid, setIsMessageInvalid] = useState(false)
  const maxMessageLength = 300

  useEffect(() => {
    message.length > maxMessageLength
      ? setIsMessageInvalid(true)
      : setIsMessageInvalid(false)
  }, [message])

  return (
    <Layout>
      <MenuAppBar />
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
        <MessageCount mb={4}>
          <p>300文字以内</p>
          <Box>
            <p>{message.length} / 300</p>
            {isMessageInvalid ? (
              <p style={{ color: COLOR.alertRed }}>300文字を超えています</p>
            ) : undefined}
          </Box>
        </MessageCount>

        {giftName && (
          <Box>
            <SelectedGiftHeader variant="body2">選択中のギフト</SelectedGiftHeader>
            <SelectedGiftBox mb={5}>
              <SelectedGiftImg src={giftImage} />
              <SelectedGiftDescription>
                <h6>{giftName}</h6>
                <SelectedGiftPrice>
                  {prices !== undefined && prices[0].col2}
                </SelectedGiftPrice>
                <SelectedGiftBrandName>{giftBrand}</SelectedGiftBrandName>
              </SelectedGiftDescription>
            </SelectedGiftBox>
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
