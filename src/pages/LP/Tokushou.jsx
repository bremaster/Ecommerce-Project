import React from 'react'
import { Box, Grid, Container, Typography, Divider } from '@mui/material'
import { MenuAppBar, Footer } from 'organisms'

import { styled, experimental_sx as sx } from '@mui/system'

const Title = styled(Typography)(
  sx({
    fontSize: 14,
    lineHeight: '25.2px',
    letterSpacing: '0.03em',
    fontWeight: 700,
  })
)

const Content = styled(Typography)(
  sx({
    fontSize: 13,
    lineHeight: '23.4px',
    letterSpacing: '0.03em',
    color: '#4A4A4A',
  })
)

export function Tokushou() {
  return (
    <React.Fragment>
      <MenuAppBar />
      <Container>
        {/* Cover */}
        <Box mt={{ md: '85px', xs: '42px' }}>
          <Typography
            fontSize={{ md: 32, xs: 20 }}
            lineHeight={1.5}
            fontWeight={700}
            color="#4A4A4A"
          >
            特定商取引法の関する表記
          </Typography>
        </Box>
        <Box mt={{ md: 10, xs: 5 }} mb={{ md: 8, xs: 7.75 }}>
          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>販売業者</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>ENVLOP株式会社</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>責任者</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>代表取締役 吉辰 桜男</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>住所</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>
                〒182-0022
                <br />
                東京都調布市国領町5-43-37
              </Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>メールアドレス</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>info@envlop.co</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>ホームページ</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>https://www.envlop.co/</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>商品の販売価格</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>各商品ページをご参照ください。</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>商品以外の必要料金</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>配送料</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>支払い方法</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>クレジットカード決済</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>支払い時期</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>
                クレジットカード決済：商品が選択された時にお支払いが確定します。
              </Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>商品の引渡し時期</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>入金確認後、直ちにお届けいたします。</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>電子チケットの発行時期</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>認証後、即時発行いたします。</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>電子チケットと商品の交換</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>当社が発行するURLから、商品との引換えが可能です。</Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>発送</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>
                海外への発送/離島等一部地域への発送には対応しておりません。
              </Content>
            </Grid>
          </Grid>

          <Divider />

          <Grid container py={'15px'} spacing={1}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <Title>申込内容の変更・返金等</Title>
            </Grid>
            <Grid item xs={12} md={9}>
              <Content>
                ＜キャンセル・返金について＞
                <br />
                お支払い後は以下の場合を除き注文内容の変更、キャンセル及び返金を承ることはできません。
                <br />
                <br />
                1．当社サービスがシステム障害や何らかの原因により停止したことにより、電子チケットと対象商品との交換が不能となった場合
                <br />
                <br />
                2．対象商品の販売終了、在庫切れ、または対象店舗の閉鎖により対象商品との交換が不能となった場合
                <br />
                <br />
                ＜商品の返品・交換について＞
                <br />
                お支払い後は商品の返品・交換を承ることはできません。ただし、お引き渡し商品の種類、数量に関してご注文内容に適合しない場合又は商品に破損があった場合で以下の条件を全て満たしている場合に限り、商品到着後7日以内に当社宛へメールにて連絡することによって商品の交換をすることができます。なお、商品到着後8日以降にご連絡を頂いた場合、商品の交換対応はいたしかねますのでご了承ください。
                <br />
                <br />
                1．商品が未使用であること
                <br />
                <br />
                2．商品の梱包物及び附属品等を配送時の状態に戻すこと
              </Content>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  )
}
