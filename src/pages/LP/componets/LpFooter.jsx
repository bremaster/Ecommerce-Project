import React from 'react'
import { Grid, Box, Typography, Link, Container } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { COLOR } from 'theme'
import { LogoWhite } from '../../../atoms/Logo-white'

const useStyles = makeStyles(() => ({
  footer: {
    color: COLOR.textWhite,
    backgroundColor: COLOR.primaryNavy,
  },
  copyright: {
    textAlign: 'center',
    paddingTop: '1rem',
    fontSize: '10px',
  },
}))

export const LpFooter: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <Container>
        <Box pt={2} pb={1}>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Box py={2}>
                <LogoWhite />
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} />

            <Grid item xs={12} sm={3}>
              <Box my={2}>
                <Link href="/faq" color="inherit" underline="hover">
                  <Typography fontSize={'0.6rem'}>よくある質問</Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box my={2}>
                <Typography>
                  <Link
                    href="https://envlop.co"
                    color="inherit"
                    target="_blank"
                    underline="hover"
                  >
                    <Typography fontSize={'0.6rem'}> 運営会社</Typography>
                  </Link>
                  {/* following local page links are currently diabled, so uising outer link instead */}
                  {/* <Link 
                  href="/privacy" 
                  color="inherit" 
                  target="_blank"
                  >
                    プライバシーポリシー
                  </Link> */}
                  <Link
                    href="/documents/ZEFTプライバシーポリシー.pdf"
                    color="inherit"
                    target="_blank"
                    underline="hover"
                  >
                    <Typography fontSize={'0.6rem'}>プライバシーポリシー</Typography>
                  </Link>
                  {/* <Link 
                  href="/tokushou" 
                  color="inherit" 
                  target="_blank"
                  >
                    特定商取引に基づく表記
                  </Link> */}
                  <Link
                    href="/documents/ZEFT特定商取引法に基づく表示.pdf"
                    color="inherit"
                    target="_blank"
                    underline="hover"
                  >
                    <Typography fontSize={'0.6rem'}>特定商取引に基づく表記</Typography>
                  </Link>
                  {/* <Link
                   href="/term" 
                  color="inherit"
                  target="_blank"
                  >
                    利用規約
                  </Link> */}
                  <Link
                    href="/documents/ZEFT利用規約.pdf"
                    color="inherit"
                    target="_blank"
                    underline="hover"
                  >
                    <Typography fontSize={'0.6rem'}>利用規約</Typography>
                  </Link>

                  <Link
                    href="https://envlop.co/contact"
                    color="inherit"
                    target="_blank"
                    underline="hover"
                  >
                    <Typography fontSize={'0.6rem'}>お問い合わせ</Typography>
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography className={classes.copyright}>
            Copyright © 2021 ENVLOP Inc . All rights reserved.
          </Typography>
        </Box>
      </Container>
    </div>
  )
}
