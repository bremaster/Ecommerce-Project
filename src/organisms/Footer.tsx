import React from 'react'
import { useLocation } from 'react-router-dom'

import { Grid, Box, Stack, Typography, Link, Container, Divider } from '@mui/material'

import { styled } from '@mui/system'

import { useRecommendProducts } from 'container/hooks/sender/useRecommendProducts'

const Logo = styled('img')((props) => ({
  width: '112px',
  [props.theme.breakpoints.down('md')]: {
    width: '75px',
    height: '20px',
  },
}))

const LogoWrap = styled(Stack)((props) => ({
  width: '112px',
  flexDirection: 'column',
  gap: '48px',
  [props.theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))

const FooterWrap = styled('div')({
  color: '#4A4A4A',
  backgroundColor: '#F6F6F6',
})

const Copyright = styled(Typography)({
  textAlign: 'center',
  fontSize: '10px',
  fontFamily: 'Outfit',
})

const Title = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '22.68px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  color: '#4A4A4A',
})

const StyledLink = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: '#4A4A4A',
  cursor: 'pointer',
  [props.theme.breakpoints.down('md')]: {
    fontSize: '13px',
    lineHeight: '18.82px',
  },
}))

const StyledLink2 = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '17.38px',
  },
}))

const StyledDivider = styled(Divider)((props) => ({
  borderColor: '#CFCAC4',
  width: '100%',
  display: 'none',
  [props.theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

const Icon = styled('img')((props) => ({
  width: 29,
  [props.theme.breakpoints.down('md')]: {
    width: 24,
  },
}))

type Props = {
  isMinimal?: boolean
}

export const Footer = ({ isMinimal = false }: Props) => {
  return (
    <FooterWrap>
      <Container>
        {isMinimal === false ? (
          <Box pt={{ md: 10, xs: 2 }} pb={1}>
            <Grid container mb={{ md: 14, xs: 4 }}>
              <Grid item xs={12} md={2}>
                <LogoWrap my={{ md: 0, xs: 2 }}>
                  <Logo src="/logo112.svg" />
                  <Stack direction="row" gap={2} alignItems="center" justifyContent="end">
                    <Link
                      href="https://www.instagram.com/zeft_gift/"
                      color="inherit"
                      target="_blank"
                      sx={{ textDecoration: 'none !important' }}
                    >
                      <Icon src="/instagram.svg" />
                    </Link>
                    <Link
                      href="https://twitter.com/ZEFT5050"
                      color="inherit"
                      target="_blank"
                      sx={{ textDecoration: 'none !important' }}
                    >
                      <Icon src="/twitter.svg" />
                    </Link>
                    <Link
                      href="https://www.pinterest.jp/ZEFT_Gift/"
                      color="inherit"
                      target="_blank"
                      sx={{ textDecoration: 'none !important' }}
                    >
                      <Icon src="/pinterest.svg" />
                    </Link>
                  </Stack>
                </LogoWrap>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack my={{ md: 0, xs: 2.5 }} gap={2.5}>
                  <Title>ZEFTとは</Title>

                  <Link
                    href="/#use"
                    color="inherit"
                    sx={{ textDecoration: 'none !important' }}
                  >
                    <StyledLink>ZEFTの使い方</StyledLink>
                  </Link>

                  <Link
                    href="/#story"
                    color="inherit"
                    sx={{ textDecoration: 'none !important' }}
                  >
                    <StyledLink>ユーザーストーリー</StyledLink>
                  </Link>

                  <Link
                    href="/product/brand"
                    color="inherit"
                    sx={{ textDecoration: 'none !important' }}
                  >
                    <StyledLink>ブランド一覧</StyledLink>
                  </Link>
                </Stack>
              </Grid>

              <StyledDivider />

              <Grid item xs={12} md={3}>
                <Stack my={{ md: 0, xs: 2.5 }} gap={2.5}>
                  <Title>シーンを選ぶ</Title>

                  <Stack direction={{ md: 'column', xs: 'row' }} gap={2.5}>
                    <Stack sx={{ width: '100%' }} gap={2.5}>
                      {[
                        { innerText: 'すべて', sceneId: 'subeteNoGift' },
                        { innerText: '誕生日', sceneId: 'tanjobi' },
                        { innerText: 'お礼', sceneId: 'orei' },
                        { innerText: '出産祝い', sceneId: 'syussannIwai' },
                      ].map(({ innerText, sceneId }) => (
                        <LinkToChoosePage text={innerText} id={sceneId} key={sceneId} />
                      ))}
                    </Stack>

                    <Stack sx={{ width: '100%' }} gap={2.5}>
                      {[
                        { innerText: '結婚祝い', sceneId: 'kekkonIwai' },
                        { innerText: '出産内祝い', sceneId: 'syussannUchiIwai' },
                        { innerText: '結婚内祝い', sceneId: 'kekkonUchiIwai' },
                      ].map(({ innerText, sceneId }) => (
                        <LinkToChoosePage text={innerText} id={sceneId} key={sceneId} />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>

              <StyledDivider />

              <Grid item xs={12} md={3}>
                <Stack my={{ md: 0, xs: 2.5 }}>
                  <Stack direction={{ md: 'column', xs: 'row' }} gap={2.5}>
                    <Stack sx={{ width: '100%' }} gap={{ md: 2.5, xs: 2 }}>
                      <Link
                        href="https://envlop.co"
                        color="inherit"
                        target="_blank"
                        sx={{ textDecoration: 'none !important' }}
                      >
                        <StyledLink2>運営会社</StyledLink2>
                      </Link>

                      <Link
                        href="/term"
                        color="inherit"
                        target="_blank"
                        sx={{ textDecoration: 'none !important' }}
                      >
                        <StyledLink2>利用規約</StyledLink2>
                      </Link>

                      <Link
                        href="/privacy"
                        color="inherit"
                        target="_blank"
                        sx={{ textDecoration: 'none !important' }}
                      >
                        <StyledLink2>プライバシーポリシー</StyledLink2>
                      </Link>
                    </Stack>

                    <Stack sx={{ width: '100%' }} gap={{ md: 2.5, xs: 2 }}>
                      <Link
                        href="/tokushou"
                        color="inherit"
                        target="_blank"
                        sx={{ textDecoration: 'none !important' }}
                      >
                        <StyledLink2>特定商取引に基づく表記</StyledLink2>
                      </Link>

                      <Link
                        href="/faq"
                        color="inherit"
                        target="_blank"
                        sx={{ textDecoration: 'none !important' }}
                      >
                        <StyledLink2>よくあるご質問</StyledLink2>
                      </Link>

                      <Link
                        href="https://envlop.co/contact"
                        color="inherit"
                        target="_blank"
                        sx={{ textDecoration: 'none !important' }}
                      >
                        <StyledLink2>お問い合わせ</StyledLink2>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Copyright>Copyright © 2022 ENVLOP Co., Ltd. All right reserved.</Copyright>
          </Box>
        ) : (
          <Box pt={{ md: 7, xs: 2 }} pb={1}>
            <Copyright sx={{ mt: 0 }}>
              Copyright © 2022 ENVLOP Co., Ltd. All right reserved.
            </Copyright>
          </Box>
        )}
      </Container>
    </FooterWrap>
  )
}

const LinkToChoosePage = ({ id, text }: { id: string; text: string }) => {
  const { pathname } = useLocation()

  const { productsInCart } = useRecommendProducts()

  const path =
    (productsInCart.length === 0 && pathname === '/'
      ? '/product/onboarding/'
      : '/product/choose/') + id

  // Use href instead of history.push
  // Even if the page has not changed, we need the behavior after the page transition
  return (
    <Link href={path} sx={{ textDecoration: 'none !important' }}>
      <StyledLink>{text}</StyledLink>
    </Link>
  )
}
