import React from 'react'

import { Box, Grid, Typography, Stack, useMediaQuery, Theme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'

import { Layout } from 'templates/Layout'
import { GradientButton, GreyButton, VariationText, VariationCard } from 'atoms'

type Variant = {
  title: string
  patterns: Array<{
    title: string
    image: null | string
    isActive: boolean
    onClick: () => void
  }>
}

type Props = {
  variants: Array<Variant>
}

export const ChooseVariation = ({ variants }: Props) => {
  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {
    defaultMatches: false,
  })
  const navigate = useNavigate()

  const title = variants.map((v) => v.title).join('・') + 'を選択'

  const everyVariantIsChecked = variants.every((v) =>
    v.patterns.some((p) => p.isActive === true)
  )

  const handleClickNext = () => {
    if (everyVariantIsChecked) {
      navigate('/gift/address')
    }
  }

  const NextButton = everyVariantIsChecked ? GradientButton : GreyButton

  return (
    <Layout maxWidth="md">
      <PageTitle text={title} />

      {variants.map((variant) => (
        <Box key={variant.title} width="100%" mb="32px" px="10px">
          <VariantTitle>{variant.title}</VariantTitle>
          <Grid container spacing="16px">
            {variant.patterns.map((pattern) => (
              <Grid key={pattern.title} item xs={6} sm={4} md={3}>
                {pattern.image === null ? (
                  <VariationText
                    width="100%"
                    isActive={pattern.isActive}
                    onClick={pattern.onClick}
                  >
                    {pattern.title}
                  </VariationText>
                ) : (
                  <VariationCard
                    text={pattern.title}
                    image={pattern.image}
                    width="100%"
                    isActive={pattern.isActive}
                    onClick={pattern.onClick}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Box mt="20px" mb={isLaptop ? '30px' : '60px'} width="100%">
        {isLaptop ? (
          <NextButton fontSize={15} fullWidth onClick={handleClickNext}>
            受け取る
          </NextButton>
        ) : (
          <Box
            sx={{
              position: 'fixed',
              bottom: '0',
              left: '0',
              right: '0',
              backgroundColor: 'white',
              borderTop: '1px solid #DDDDDD',
              zIndex: 3,
              p: '16px 5%',
            }}
          >
            <NextButton onClick={handleClickNext}>受け取る</NextButton>
          </Box>
        )}
      </Box>
    </Layout>
  )
}

const PageTitle = ({ text }: { text: string }) => (
  <Stack direction="column" alignItems="center" py="60px">
    <Typography
      sx={{
        fontFamily: "'Outfit'",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '28px',
        lineHeight: '35px',
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: '0.5rem',
      }}
    >
      {text}
    </Typography>
    <Typography
      sx={{
        fontFamily: "'Outfit'",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '0.05em',
        color: '#4A4A4A',
      }}
    >
      Select Variations
    </Typography>
  </Stack>
)

const VariantTitle = styled(Typography)({
  color: '#4a4a4a',
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  marginBottom: '16px',
})
