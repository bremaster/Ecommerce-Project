import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { styled } from '@mui/system'

import {
  Box,
  AppBar,
  Stack,
  Link,
  IconButton,
  Container,
  Grid,
  Typography,
  Divider,
  Modal,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import { Logo, GiftBox } from 'atoms'

const Title = styled(Typography)({
  fontFamily: 'Outfit',
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '25.2px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  color: '#4A4A4A',
  marginBottom: 20,
})

const StyledLink = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '23.17px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: '#4A4A4A',
})

interface Props {
  /** if true, git box (cart) button is displayed at left */
  giftBoxButton?: boolean
  /** count of items in cart */
  howManyInCart?: number
  /** if navigate to lp */
  navigateToLp?: boolean
}

export const AppBarMobile: React.FC<Props> = ({
  giftBoxButton = true,
  howManyInCart = 0,
  navigateToLp = true,
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goToLp = () => navigate('/')
  const goToGiftBox = () => navigate('/product/giftbox')

  const [openHeader, setOpenHeader] = React.useState(false)

  const toggleHeader = () => {
    setOpenHeader(!openHeader)
  }

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Box position="absolute" left="17px" top="12px" onClick={toggleHeader}>
          <IconButton>{openHeader ? <CloseIcon /> : <MenuIcon />}</IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Box
            p="10px"
            onClick={navigateToLp ? goToLp : undefined}
            sx={{
              cursor: 'pointer',
              '& img': {
                transform: 'scale(0.9)',
              },
            }}
          >
            <Logo />
          </Box>
        </Box>
        {giftBoxButton === true && (
          <Box position="absolute" right="22px" top="18px" onClick={goToGiftBox}>
            <GiftBox count={howManyInCart} />
          </Box>
        )}
      </AppBar>
      <Modal
        open={openHeader}
        onClose={toggleHeader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={{ backgroundColor: 'white' }}>
          <AppBar position="static" color="transparent" elevation={0} sx={{ height: 64 }}>
            <Box position="absolute" left="17px" top="12px" onClick={toggleHeader}>
              <IconButton>{openHeader ? <CloseIcon /> : <MenuIcon />}</IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Box
                p="10px"
                onClick={navigateToLp ? goToLp : undefined}
                sx={{
                  cursor: 'pointer',
                  '& img': {
                    transform: 'scale(0.9)',
                  },
                }}
              >
                <Logo />
              </Box>
            </Box>
          </AppBar>
          <Box pt={2} pb={1}>
            <Grid container>
              <Grid item xs={12}>
                <Box my={3} gap={2.5}>
                  <Title>ZEFTとは</Title>

                  <Stack sx={{ width: '100%' }} gap={2.5}>
                    <Link href="/#use" color="inherit" underline="none">
                      <StyledLink onClick={toggleHeader}>ZEFTの使い方</StyledLink>
                    </Link>
                    <Link href="/#story" color="inherit" underline="none">
                      <StyledLink onClick={toggleHeader}>ユーザーストーリー</StyledLink>
                    </Link>
                  </Stack>
                </Box>
              </Grid>

              <Divider sx={{ borderColor: '#CFCAC4', width: '100%' }} />

              <Grid item xs={12}>
                <Stack my={3}>
                  <Title>シーンを選ぶ</Title>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '50% 50%',
                      gridGap: '16px',
                    }}
                  >
                    {[
                      {
                        id: 'subeteNoGift',
                        innerText: 'すべて',
                      },
                      {
                        id: 'kekkonIwai',
                        innerText: '結婚祝い',
                      },
                      {
                        id: 'tanjobi',
                        innerText: '誕生日',
                      },
                      {
                        id: 'syussannUchiIwai',
                        innerText: '出産内祝い',
                      },
                      {
                        id: 'orei',
                        innerText: 'お礼',
                      },
                      {
                        id: 'kekkonUchiIwai',
                        innerText: '結婚内祝い',
                      },
                      {
                        id: 'syussannIwai',
                        innerText: '出産祝い',
                      },
                    ].map((item) => (
                      <StyledLink
                        key={item.id}
                        onClick={() => {
                          toggleHeader()
                          if (howManyInCart === 0 && pathname === '/') {
                            navigate('/product/onboarding/' + item.id)
                          } else {
                            navigate('/product/choose/' + item.id)
                          }
                        }}
                        sx={{
                          cursor: 'pointer',
                        }}
                      >
                        {item.innerText}
                      </StyledLink>
                    ))}
                  </Box>
                </Stack>
              </Grid>

              <Divider sx={{ borderColor: '#CFCAC4', width: '100%' }} />

              <Grid item xs={12}>
                <Stack my={2.5} gap={2.5}>
                  <Link href="/faq" color="inherit" underline="none">
                    <StyledLink>よくあるご質問</StyledLink>
                  </Link>

                  <Link href="https://envlop.co/contact" color="inherit" underline="none">
                    <StyledLink>お問い合わせ</StyledLink>
                  </Link>

                  <Stack direction="row" gap={2} justifyContent="end">
                    <Link
                      href="https://www.instagram.com/zeft_gift/"
                      color="inherit"
                      target="_blank"
                      sx={{ textDecoration: 'none !important' }}
                    >
                      <Box component="img" src="/instagram.svg" sx={{ width: 24 }} />
                    </Link>
                    <Link
                      href="https://twitter.com/ZEFT5050"
                      color="inherit"
                      target="_blank"
                      sx={{ textDecoration: 'none !important' }}
                    >
                      <Box component="img" src="/twitter.svg" sx={{ width: 24 }} />
                    </Link>
                    <Link
                      href="https://www.pinterest.jp/ZEFT_Gift/"
                      color="inherit"
                      target="_blank"
                      sx={{ textDecoration: 'none !important' }}
                    >
                      <Box component="img" src="/pinterest.svg" sx={{ width: 24 }} />
                    </Link>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  )
}
