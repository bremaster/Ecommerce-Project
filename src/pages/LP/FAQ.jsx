import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  Divider,
  Link,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { MenuAppBar } from 'organisms/MenuAppBar'
import { Footer } from 'organisms'

import { styled } from '@mui/system'

const Wrap = styled(Container)((props) => ({
  [props.theme.breakpoints.down('md')]: {
    padding: '0 24px',
  },
}))

const Heading = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '29px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    fontSize: '16px',
    lineHeight: '23.17px',
  },
}))

const Content = styled(Typography)((props) => ({
  fontFamily: 'Noto Sans JP',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '29px',
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: '#4A4A4A',
  paddingRight: '135px',
  [props.theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '25.2px',
    paddingRight: '25px',
  },
}))

const AccordionHeader = styled(AccordionSummary)((props) => ({
  padding: '0 !important',
  height: '70px !important',
  [props.theme.breakpoints.down('md')]: {
    minHeight: '65px !important',
  },
}))

const StyledAccordion = styled(Accordion)({
  boxShadow: 'none !important',
  '&:before': {
    display: 'none',
  },
})

const AccordionWrap = styled(Box)({
  '& .Mui-expanded': {
    margin: '0 !important',
  },
  '& .MuiAccordionDetails-root': {
    padding: '0 0 20px',
  },
})

export const FAQ: React.FC = () => {
  return (
    <React.Fragment>
      <MenuAppBar />
      <Wrap>
        <Box mt={{ md: '85px', xs: '52px' }}>
          <Typography
            fontSize={{ md: 32, xs: 20 }}
            lineHeight={1.5}
            fontWeight={700}
            color="#4A4A4A"
          >
            よくあるご質問
          </Typography>
        </Box>
        <AccordionWrap mt={{ md: 12, xs: 6.25 }} mb={{ md: 8, xs: 7.75 }}>
          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Heading>支払いは何が使えますか？</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>
                クレジットカード・デビットカード・Apple Pay・Google
                Payに対応しています。対応しているブランドはVisa、Mastercard、American
                Express、JCB、Diners Club、Discover、Union Payになります。
              </Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Heading>配送料はいくらですか？</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>
                配送料は各商品の詳細ページで北海道と沖縄県を除く、最小金額と最大金額が表示されています。北海道と沖縄県の金額や配送不可地域に関しては、各商品の詳細ページの「※北海道・沖縄・離島・一部地域の送料に関してはこちら」よりご確認いただけます。
              </Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Heading>住所を知らなくても贈れますか？</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>
                可能です。ZEFTはギフトリンクを発行し、受け取った方が配送先の住所を入力する仕組みになっているので贈り主が住所を知らなくても簡単にギフトを贈れます。
              </Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Heading>認証コードが届きません。</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>
                ご入力いただいたメールアドレス宛に「hello@envlop.co」より件名「【ZEFT】
                メール認証コード送信のお知らせ」で送らせて頂いております。メインフォルダ以外や迷惑メールに振り分けられている可能性もございますのでお手数ですが再度ご確認くださいませ。また「認証コードを再送する」をタップすると再送できますのでご活用ください。
                <br />
                上記でも届かない場合は「
                <Link href="https://www.envlop.co/contact" target="_blank">
                  https://www.envlop.co/contact
                </Link>
                」よりお問い合わせください。
              </Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Heading>ギフトリンクを確認したいのですがどこでできますか？</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>
                ギフトリンク発行後、ご入力いただいたメールアドレス宛に「hello@envlop.co」より件名「ご利用ありがとうございます。」で確認用のギフトリンクを送らせて頂いております。メインフォルダ以外や迷惑メールに振り分けられている可能性もございますのでお手数ですが再度ご確認くださいませ。
                <br />
                上記でも届かない場合は「
                <Link href="https://www.envlop.co/contact" target="_blank">
                  https://www.envlop.co/contact
                </Link>
                」よりお問い合わせください。
              </Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Heading>商品のキャンセルや返品は可能ですか？</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>
                決済完了後のキャンセルや返品は承っておりません。ただし、お引き渡し商品の種類、数量に関してご注⽂内容に適合しない場合⼜は商品に破損があった場合で以下の条件を全て満たしている場合に限り、商品到着後7⽇以内に当社宛へメールにて連絡することによって商品の交換をすることができます。なお、商品到着後8⽇以降にご連絡を頂いた場合、商品の交換対応はいたしかねますのでご了承ください。
                <br />
                1 商品が未使⽤であること
                <br />2 商品の梱包物及び附属品等を配送時の状態に戻すこと
              </Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Heading>のしの記載を変更したいです。</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>
                決済完了前までに下記よりお問い合わせいただければご対応させて頂きます。
                <br />
                お問い合わせ：
                <Link href="https://www.envlop.co/contact" target="_blank">
                  https://www.envlop.co/contact
                </Link>
              </Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Heading>海外への配送は可能ですか？</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>現在海外への配送が可能な商品は取扱っておりません。</Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />

          <StyledAccordion>
            <AccordionHeader
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Heading>ZEFTへ商品を掲載したいのですが可能ですか？</Heading>
            </AccordionHeader>
            <AccordionDetails>
              <Content>
                可能です。まずは一度お話の機会を頂き、条件等を確認させて頂ければと思います。お手数ですが下記よりお気軽にお問い合わせください。
                <br />
                お問い合わせ：
                <Link href="https://www.envlop.co/contact" target="_blank">
                  https://www.envlop.co/contact
                </Link>
              </Content>
            </AccordionDetails>
          </StyledAccordion>

          <Divider />
        </AccordionWrap>
      </Wrap>
      <Footer />
    </React.Fragment>
  )
}
