import React, { useState } from 'react'

import { Box, Typography, Dialog } from '@mui/material'

import { GradientOutlinedButton } from 'atoms'
import { ShippingRemark } from 'organisms'
import { ProductWithHandlerAndStatus } from 'constants/index'

import { styled } from '@mui/system'

const StyledLink = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '200%',
  letterSpacing: '0.03em',
  textAlign: 'center',
  marginTop: '45px',
  [props.theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    marginTop: '25px',
  },
}))

export const ShippingLink = ({
  items = [],
  type,
}: {
  items: Array<Pick<ProductWithHandlerAndStatus, 'sys' | 'title' | 'shippingFee'>>
  type: 'onboarding' | 'cart'
}) => {
  const [showShippingMore, setShowShippingMore] = useState(false)

  return (
    <>
      <StyledLink color={type === 'onboarding' ? '#898989' : '#4A4A4A'}>
        最大3つまでギフトの選択肢を追加可能
      </StyledLink>
      <Dialog
        open={showShippingMore}
        onClose={() => setShowShippingMore(false)}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '10px',
            margin: '24px',
          },
        }}
      >
        <Box p="24px">
          <ShippingRemark
            items={items.map((item) => ({
              itemName: item.title,
              hokkaidoFee: item.shippingFee.hokkaidoFee,
              okinawaFee: item.shippingFee.okinawaFee,
              undeliverableSites:
                item.shippingFee.undeliverable === null
                  ? []
                  : item.shippingFee.undeliverable,
            }))}
          />
          <Box mt="24px">
            <GradientOutlinedButton onClick={() => setShowShippingMore(false)}>
              閉じる
            </GradientOutlinedButton>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
