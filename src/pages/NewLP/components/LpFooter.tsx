import React from 'react'
import { Grid, Box, Typography, Link, Container } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Logo } from 'atoms/Logo'

const useStyles = makeStyles(() => ({
  footer: {
    color: '#4A4A4A',
    backgroundColor: '#F6F6F6',
  },
  copyright: {
    textAlign: 'center',
    paddingTop: '1rem',
    fontSize: '10px',
    fontFamily: 'Outfit',
  },
}))

export const LpFooter: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <Container>
        <Box pt={2} pb={1}>
          <Grid container>
            <Grid item xs={12} sm={2}>
              <Box py={2}>
                <Logo />
              </Box>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Box my={2}>
                <Link href="/faq" color="inherit" underline="hover">
                  <Typography
                    fontFamily={'Outfit'}
                    fontSize={'1rem'}
                    fontWeight={600}
                    color="#4A4A4A"
                  >
                    HOME
                  </Typography>
                </Link>

                <Link href="/faq" color="inherit" underline="hover">
                  <Typography
                    fontFamily={'Outfit'}
                    fontSize={'1rem'}
                    fontWeight={600}
                    color="#4A4A4A"
                  >
                    Gifts
                  </Typography>
                </Link>

                <Link href="/faq" color="inherit" underline="hover">
                  <Typography
                    fontFamily={'Outfit'}
                    fontSize={'1rem'}
                    fontWeight={600}
                    color="#4A4A4A"
                  >
                    My Page
                  </Typography>
                </Link>

                <Link href="/faq" color="inherit" underline="hover">
                  <Typography
                    fontFamily={'Outfit'}
                    fontSize={'1rem'}
                    fontWeight={600}
                    color="#4A4A4A"
                  >
                    Faq
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box my={2}>
                <Link
                  href="https://envlop.co"
                  color="inherit"
                  target="_blank"
                  underline="hover"
                >
                  <Typography
                    fontSize={'14px'}
                    fontFamily={'Noto Sans JP'}
                    color="#4A4A4A"
                  >
                    {' '}
                    運営会社
                  </Typography>
                </Link>
                <Link
                  href="/documents/ZEFTプライバシーポリシー.pdf"
                  color="inherit"
                  target="_blank"
                  underline="hover"
                >
                  <Typography
                    fontSize={'14px'}
                    fontFamily={'Noto Sans JP'}
                    color="#4A4A4A"
                  >
                    プライバシーポリシー
                  </Typography>
                </Link>
                <Link
                  href="/documents/ZEFT特定商取引法に基づく表示.pdf"
                  color="inherit"
                  target="_blank"
                  underline="hover"
                >
                  <Typography
                    fontSize={'14px'}
                    fontFamily={'Noto Sans JP'}
                    color="#4A4A4A"
                  >
                    特定商取引に基づく表記
                  </Typography>
                </Link>
                <Link
                  href="/documents/ZEFT利用規約.pdf"
                  color="inherit"
                  target="_blank"
                  underline="hover"
                >
                  <Typography
                    fontSize={'14px'}
                    fontFamily={'Noto Sans JP'}
                    color="#4A4A4A"
                  >
                    利用規約
                  </Typography>
                </Link>

                <Link
                  href="https://envlop.co/contact"
                  color="inherit"
                  target="_blank"
                  underline="hover"
                >
                  <Typography
                    fontSize={'14px'}
                    fontFamily={'Noto Sans JP'}
                    color="#4A4A4A"
                  >
                    お問い合わせ
                  </Typography>
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} />
          </Grid>
          <Typography className={classes.copyright}>
            Copyright © 2021 ENVLOP Co., Ltd. All right reserved.
          </Typography>
        </Box>
      </Container>
    </div>
  )
}
