import React from 'react'

import { Box, Typography } from '@mui/material'

import { BulletPoint } from 'atoms'
import { COLOR } from 'theme'

import { styled } from '@mui/system'

const LeftBottomButton = styled(Typography)({
  fontSize: '12px',
  color: COLOR.subOrange,
  borderBottom: `1px solid ${COLOR.subOrange}`,
  lineHeight: '13px',
  cursor: 'pointer',
})

const TextOverflowEllipsis = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '12px',
  lineHeight: 'normal',
})

const Thumbnail = styled('img')({
  borderRadius: '6px',
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  backgroundColor: COLOR.backgroundBlue,
})

export const EngagedRow = (props: {
  mainText: string
  subText: string
  image: string
  rowNumber?: number
  handleClickLeftButtomButton?: () => void
  leftButtomButtonText?: string
}): JSX.Element => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: !!props.rowNumber
          ? 'auto calc(60px + 1.5rem) 1fr'
          : 'calc(60px + 1.5rem) 1fr',
        position: 'relative',
      }}
    >
      {!!props.rowNumber && (
        <Box alignSelf="center" pr="1.5rem">
          <BulletPoint character={props.rowNumber} />
        </Box>
      )}
      <Box width="60px" height="60px" justifySelf="start">
        <Thumbnail src={props.image} />
      </Box>
      <Box height="60px" overflow="hidden">
        <TextOverflowEllipsis>{props.mainText}</TextOverflowEllipsis>
        <TextOverflowEllipsis>{props.subText}</TextOverflowEllipsis>
      </Box>
      <Box position="absolute" bottom="0" right="0">
        <LeftBottomButton onClick={props.handleClickLeftButtomButton}>
          {props.leftButtomButtonText}
        </LeftBottomButton>
      </Box>
    </Box>
  )
}
