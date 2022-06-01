import * as React from 'react'
import { Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { Menu, MenuOpen } from '@mui/icons-material'
import { LpCommonProps } from './Layout'
import { IS_BUSSY_SEASON } from 'constants/index'
import { TopNotice } from './components/TopNotice'

const useStyles = makeStyles({
  ul: {
    listStyle: 'none',
    '& > li > a': {
      color: '#000000',
      textDecoration: 'none',
      display: 'block',
      width: 'auto',
    },
  },
  image: {
    objectFit: 'contain',
    '&[data-inverted="true"]': {
      transform: 'rotate(0.5turn)',
    },
  },
  button: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
  buttonText: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  buttonTextSp: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '10px',
    lineHeight: '10px',
    letterSpacing: '-0.2px',
    '& > *': {
      letterSpacing: '-0.2px',
    },
  },
  spMenu: {
    transition: 'all .5s ease-out',
  },
  spMenuNav: {
    fontWeight: 'bold',
  },
  snsList: {
    listStyle: 'none',
    '& > li > a': {
      backgroundColor: '#000000',
      color: '#FFFFFF',
    },
  },
})

export const LpHeader: React.FC<LpCommonProps> = ({ isMobileSize }) => {
  const classes = useStyles()
  const history = useHistory()

  const [menuState, setMenuState] = React.useState(false)

  const toggleMenu = () => setMenuState((state) => !state)

  type NavList = {
    text: string
    href: string
  }[]

  const navList: NavList = [
    {
      text: 'ZEFTの特徴',
      href: '#',
    },
    /* { */
    /*   text: 'ご利用者の声', */
    /*   href: '#voice', */
    /* }, */
    {
      text: '選べるコース',
      href: '#course',
    },
    {
      text: 'お届けまで',
      href: '#shipping',
    },
  ]

  React.useEffect(() => {
    if (isMobileSize) {
      setMenuState(false)
    }
  }, [isMobileSize])

  // determine sticky header size
  // to prevent sticky header from hiding hero image
  const headerHeight = React.useMemo(() => {
    // default header size
    let height = isMobileSize ? 60 : 80
    // additonal text box is added when bussy season
    if (IS_BUSSY_SEASON) {
      if (isMobileSize) {
        height += 55
      } else {
        height += 70
      }
    }
    return height + 'px'
  }, [isMobileSize, IS_BUSSY_SEASON])

  return (
    <Box component="header" width="100%" height={headerHeight}>
      <Box
        width="100%"
        position="fixed"
        bgcolor="#FFFFFF"
        display="flex"
        top="0"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        zIndex="10000"
      >
        {IS_BUSSY_SEASON && (
          <Box width="100vw">
            <TopNotice isSmallScreen={isMobileSize} />
          </Box>
        )}
        {isMobileSize ? (
          <Box
            py="1rem"
            width="100%"
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            alignItems="center"
          >
            <Box justifySelf="start" ml={2}>
              {menuState ? (
                <MenuOpen onClick={toggleMenu} />
              ) : (
                <Menu onClick={toggleMenu} />
              )}
            </Box>
            <Box justifySelf="center">
              <img
                className={classes.image}
                src="/assets/logo.svg"
                alt="logo"
                width="100"
                height="30"
              />
            </Box>
            {/* <Box> */}
            {/* 	Login Button */}
            {/* </Box> */}
          </Box>
        ) : (
          <Box
            width="100%"
            maxWidth="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={isMobileSize ? '21px' : '100px'}
            py="1.5rem"
          >
            <img
              className={classes.image}
              src="/assets/logo.svg"
              alt="logo"
              width={isMobileSize ? '100' : '179'}
              height={isMobileSize ? '30' : '54'}
            />
            <Box
              display={isMobileSize ? 'flex' : 'none'}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize="18px"
              onClick={toggleMenu}
            >
              Menu
              <img
                className={classes.image}
                data-inverted={menuState}
                src="/lp/dotted-arrow-1.svg"
                alt="menu"
                width="11px"
                height="18px"
              />
            </Box>
            <Box display="flex">
              <Box
                className={classes.ul}
                component="ul"
                display={isMobileSize ? 'none' : 'flex'}
                m="0 47px 0 0"
                p="0"
              >
                {navList.map(({ text, href }) => (
                  <Box
                    key={text}
                    component="li"
                    width="auto"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    pl="51px"
                  >
                    <a href={href}>{text}</a>
                  </Box>
                ))}
              </Box>
              <Button
                className={classes.button}
                variant="contained"
                startIcon={!isMobileSize && <img src="/lp/present.png.webp" />}
                endIcon={
                  isMobileSize ? (
                    <img src="/lp/present.png.webp" />
                  ) : (
                    <img src="/lp/arrow-2.svg" />
                  )
                }
                onClick={() => history.push('/product/top')}
              >
                <span
                  className={isMobileSize ? classes.buttonTextSp : classes.buttonText}
                >
                  ギフト<span>を送る</span>
                </span>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        className={classes.spMenu}
        bgcolor="rgba(217, 229, 245, .9)"
        width="100%"
        position="fixed"
        display={isMobileSize ? 'flex' : 'none'}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        zIndex="9999"
        top={menuState ? 0 : '-100%'}
        bottom={menuState ? 0 : '100%'}
        pt="65px"
      >
        <Box
          className={classes.ul}
          component="ul"
          display="flex"
          flexDirection="column"
          p="0"
        >
          {navList.map(({ text, href }, index) => (
            <Box
              key={text}
              component="li"
              pt={index !== 0 ? '5vh' : '0'}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <a onClick={toggleMenu} className={classes.spMenuNav} href={href}>
                {text}
              </a>
            </Box>
          ))}
        </Box>
        {/* <Box className={classes.snsList} component="ul" display="flex" p="0" mt="15vh"> */}
        {/*   {snsList.map(({ text, href }, index) => ( */}
        {/*     <Box key={`${text}-${index}`} component="li" pl={index !== 0 && '5vw'}> */}
        {/*       <Fab onClick={() => setMenuState((state) => !state)} href={href}> */}
        {/*         {text} */}
        {/*       </Fab> */}
        {/*     </Box> */}
        {/*   ))} */}
        {/* </Box> */}
      </Box>
    </Box>
  )
}
