import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { MenuAppBar } from '../../organisms/MenuAppBar'
import { LpFooter } from './componets/LpFooter'

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export const FAQ: React.FC = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Container>
        <MenuAppBar />
        <Box py={3}>
          <Typography variant="h3">
            <b>よくある質問</b>
          </Typography>
        </Box>
        <Box py={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Q&nbsp;&nbsp;決済手段はどのような方法がありますか？
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                現在はクレジットカードとデビットカードのみに対応しています。
                <br />
                対応しているブランドはVisa、Mastercard、American Express、JCB、Diners
                Club、Discoverになります。
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Q&nbsp;&nbsp;贈り先の住所を知らないのですがギフトを贈ることは可能ですか？
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                はい、可能です。贈る方法を「メール/LINEなど」を選択頂くと、ギフト購入後にURLが発行されます。そのURLを贈りたい人に送れば、ギフトの送付先住所は本人が入力するので問題ございません。
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Q&nbsp;&nbsp;配送料金はいくらになりますか？
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                ZEFTではギフトコースを現在「5,000円（税込）」と「10,000円（税込）」の2つを用意しています。配送料はそれぞれ金額の中に含まれていますので、追加での料金は発生しません。
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Q&nbsp;&nbsp;ギフトリンクを再度確認したいのですがどうすればいいですか？
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                購入完了後のページでリンクをコピーしそびれた場合、ご入力いただいたメールアドレスにもリンクをお送りしていますのでそちらをご確認ください。
                <br />
                万が一メールが届いていない場合はお手数ですが下記お問い合わせフォームよりご連絡ください。
                <br />
                問い合わせフォーム：
                <a href="https://envlop.co/contact">https://www.envlop.co/contact</a>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
      <LpFooter />
    </React.Fragment>
  )
}
