import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, AppBar, Stack, Button, Menu, Link, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { styled } from '@mui/system'

import { GradientButton, GiftBox } from 'atoms'

const HeaderLinkLaptop = styled(Button)({
  fontFamily: 'Outfit',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '23px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  color: '#4A4A4A',
})

const StyledMenuItem = styled(MenuItem)({
  fontFamily: 'Noto Sans JP',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '14px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  padding: '6px 26px',
  color: '#4A4A4A',
})

interface Props {
  /** if true, git box (cart) button is displayed at left */
  giftBoxButton?: boolean
  /** count of items in cart */
  howManyInCart?: number
  /** if navigate to lp */
  navigateToLp?: boolean
  /** if show CTA */
  cta?: boolean
}

export const AppBarLaptop: React.FC<Props> = ({
  giftBoxButton = true,
  howManyInCart = 0,
  navigateToLp = true,
  cta = false,
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goToLp = () => navigate('/')
  const goToGiftBox = () => navigate('/product/giftbox')

  const [dropdown1, setDropdown1] = React.useState<null | HTMLElement>(null)
  const [dropdown2, setDropdown2] = React.useState<null | HTMLElement>(null)
  const open1 = Boolean(dropdown1)
  const open2 = Boolean(dropdown2)

  const handleClickDrop1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDropdown1(event.currentTarget)
  }
  const handleCloseDrop1 = () => {
    setDropdown1(null)
  }

  const handleClickDrop2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDropdown2(event.currentTarget)
  }
  const handleCloseDrop2 = () => {
    setDropdown2(null)
  }

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Stack
        direction="row"
        justifyContent="space-between"
        height="100%"
        px="2rem"
        maxWidth="lg"
        width="100%"
        mx="auto"
      >
        <Stack alignItems="center" direction="row">
          <Stack
            onClick={navigateToLp ? goToLp : undefined}
            sx={{
              cursor: 'pointer',
              placeItems: 'center',
            }}
          >
            <Box
              component="img"
              src="/logo112.svg"
              sx={{
                width: 112,
              }}
            />
          </Stack>
          <Box ml={7.5}>
            <HeaderLinkLaptop
              id="basic-button"
              aria-controls={open1 ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? 'true' : undefined}
              onClick={handleClickDrop1}
            >
              ZEFTとは
              {open1 ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 20 }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
              )}
            </HeaderLinkLaptop>
            <Menu
              id="basic-menu"
              anchorEl={dropdown1}
              open={open1}
              onClose={handleCloseDrop1}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  width: 'auto',
                  paddingTop: '16px',
                  paddingBottom: '10px',
                  borderRadius: '10px',
                },
              }}
            >
              <Link
                href="/#use"
                color="inherit"
                sx={{ textDecoration: 'none !important' }}
              >
                <StyledMenuItem onClick={handleCloseDrop1}>ZEFTの使い方</StyledMenuItem>
              </Link>
              <Link
                href="/#story"
                color="inherit"
                sx={{ textDecoration: 'none !important' }}
              >
                <StyledMenuItem onClick={handleCloseDrop1}>
                  ユーザーストーリー
                </StyledMenuItem>
              </Link>
            </Menu>
          </Box>
          <Box ml={5}>
            <HeaderLinkLaptop
              id="basic-button"
              aria-controls={open2 ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open2 ? 'true' : undefined}
              onClick={handleClickDrop2}
            >
              シーンを選ぶ
              {open2 ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 20 }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
              )}
            </HeaderLinkLaptop>
            <Menu
              id="basic-menu"
              anchorEl={dropdown2}
              open={open2}
              onClose={handleCloseDrop2}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  width: '147px',
                  paddingTop: '16px',
                  paddingBottom: '10px',
                  borderRadius: '10px',
                },
              }}
            >
              {[
                {
                  id: 'subeteNoGift',
                  innerText: 'すべて',
                },
                {
                  id: 'tanjobi',
                  innerText: '誕生日',
                },
                {
                  id: 'orei',
                  innerText: 'お礼',
                },
                {
                  id: 'syussannIwai',
                  innerText: '出産祝い',
                },
                {
                  id: 'kekkonIwai',
                  innerText: '結婚祝い',
                },
                {
                  id: 'syussannUchiIwai',
                  innerText: '出産内祝い',
                },
                {
                  id: 'kekkonUchiIwai',
                  innerText: '結婚内祝い',
                },
              ].map((item) => (
                <StyledMenuItem
                  key={item.id}
                  onClick={() => {
                    if (howManyInCart === 0 && pathname === '/') {
                      navigate('/product/onboarding/' + item.id)
                    } else {
                      navigate('/product/choose/' + item.id)
                    }
                    handleCloseDrop2()
                  }}
                >
                  {item.innerText}
                </StyledMenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing="2rem">
          {giftBoxButton && (
            <Box onClick={goToGiftBox}>
              <GiftBox count={howManyInCart} />
            </Box>
          )}
          {cta && <GradientButton width="300px">ギフトを選ぶ</GradientButton>}
        </Stack>
      </Stack>
    </AppBar>
  )
}
