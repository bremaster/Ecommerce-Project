import React from 'react'
import {
  GradientButton,
  GradientOutlinedButton,
  SquareButton,
  AnswerButton,
  AnswerCircle,
  Tag,
  Switch,
  FormPullDown,
  VariationCard,
  VariationText,
} from 'atoms'
import {
  MenuAppBar,
  ShareLink,
  ItemSummary,
  CheckoutSummary,
  ShippingRemark,
  GiftPreview,
} from 'organisms'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  PriceTable,
  ProductGuideItem,
  DescriptionTable,
} from 'molecules'

import { Typography, Box } from '@mui/material'
import { PageIndicator } from 'molecules'

export const ComponentLibrary: React.FC = () => {
  return (
    <React.Fragment>
      <Box width="100%">
        <Box width="100%">
          <h3>VariationText</h3>
          <VariationText onClick={() => alert('aaaa')}>3ヵ月 60cm</VariationText>
          <h3>VariationCard</h3>
          <VariationCard
            width="150px"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0aNyjRpa4388plOz1_VL4B687n_xf2zTeEA&usqp=CAU"
            text="ワイルドミント＆マンダリン"
          />
          <h3>GiftPreview</h3>
          <GiftPreview
            button={<button>preview gift</button>}
            giftToken="3a9bb263b1e7f137020fb77e5581e7cb54bb0d812f214db9b14892264697c75b"
          />
          <h3>GradientOutlinedButton</h3>
          <GradientOutlinedButton>Gradient Outlined Button</GradientOutlinedButton>
          <h3>GradientOutlinedButton</h3>
          <GradientButton>Gradient Button</GradientButton>
          <h3>DescriptionTable</h3>
          <DescriptionTable
            table={[
              {
                column1: 'セット内容',
                column2: `・グリーンモンスター3袋\n・レッドヒート3袋・クリオロベリーズ3袋`,
              },
              { column1: 'アレルギー', column2: 'dddddd' },
            ]}
          />
          <h3>ShippingRemark</h3>
          <ShippingRemark
            items={[
              {
                itemName: 'ホワイトバルサミコビネガー フルムーン',
                hokkaidoFee: 1300,
                okinawaFee: 1900,
                undeliverableSites: ['〇〇島'],
              },
            ]}
          />
          <h3>ProductGuideItem</h3>
          <ProductGuideItem
            item={{
              title: '/assets/product_guide/step-1.svg',
              image: '/assets/product_guide/image-1.svg',
              text1: 'ギフトを3つまで',
              text2: '選ぶことができます。',
            }}
          />
          <ProductGuideItem
            item={{
              title: '/assets/product_guide/step-1.svg',
              image: '/assets/product_guide/image-1.svg',
              text1: 'ギフトを3つまで',
              text2: '選ぶことができます。',
            }}
            option={{
              direction: 'row',
            }}
          />
          <h3>CheckoutSummary</h3>
          <CheckoutSummary
            itemSummary={{
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0aNyjRpa4388plOz1_VL4B687n_xf2zTeEA&usqp=CAU',
              brand: 'CONDIMENTO MEDITERRANEO',
              itemName: 'ホワイトバルサミコビネガー フルムーン',
              isNoshi: true,
            }}
            priceTable={{
              productPrice: 10000,
              minShipping: 500,
              maxShipping: 1200,
            }}
          />
          <h3>ItemSummary</h3>
          <ItemSummary
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0aNyjRpa4388plOz1_VL4B687n_xf2zTeEA&usqp=CAU"
            brand="CONDIMENTO MEDITERRANEO"
            itemName="ホワイトバルサミコビネガー フルムーン"
            isNoshi={true}
          />
          <h3>PriceTable</h3>
          <PriceTable productPrice={10000} minShipping={500} maxShipping={1200} />
          <h3>FormPullDown</h3>
          <FormPullDown
            label="種類選択"
            value={''}
            handleChange={undefined}
            items={['結婚祝い', '熨斗に入れるお名前']}
            placeholder="some placeholder"
            inputRef={null}
          />
          <Switch checked={false} onChange={(value) => alert(value)} />
          <ShareLink />
          <PageIndicator
            current={3}
            max={9}
            onClickNumber={(page) => alert('go to ' + page)}
          />
          <Accordion>
            <AccordionSummary>
              <Typography variant="h5">aaaa</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>asdf 1234 ;+-^</p>
              <p>asdf 1234 ;+-^</p>
              <p>asdf 1234 ;+-^</p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h5">aaaa</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>asdf 1234 ;+-^</p>
              <p>asdf 1234 ;+-^</p>
              <p>asdf 1234 ;+-^</p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography variant="h5">お召し上がり方</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>asdf 1234 ;+-^</p>
              <p>asdf 1234 ;+-^</p>
              <p>asdf 1234 ;+-^</p>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Typography variant="h3">h3: asdf 1234 いろはにほへど 春眠不憶暁</Typography>
        <Typography variant="h4">h4: asdf 1234 いろはにほへど 春眠不憶暁</Typography>
        <Typography variant="h5">h5: asdf 1234 いろはにほへど 春眠不憶暁</Typography>
        <Typography variant="subtitle1">
          subtitle1: asdf 1234 いろはにほへど 春眠不憶暁
        </Typography>
        <Typography variant="subtitle2">
          subtitle2: asdf 1234 いろはにほへど 春眠不憶暁
        </Typography>
        <Typography variant="subtitle3">
          subtitle3: asdf 1234 いろはにほへど 春眠不憶暁
        </Typography>
        <Typography variant="body1">
          body1: asdf 1234 いろはにほへど 春眠不憶暁
        </Typography>
        <Typography variant="body2">
          body2: asdf 1234 いろはにほへど 春眠不憶暁
        </Typography>
        <Typography variant="body3">
          body3: asdf 1234 いろはにほへど 春眠不憶暁
        </Typography>
        <Typography variant="body4">
          body4: asdf 1234 いろはにほへど 春眠不憶暁
        </Typography>
        <Typography variant="caption">
          caption: asdf 1234 いろはにほへど 春眠不憶暁
        </Typography>
      </Box>
      {/* <FormPullDown */}
      {/*   label="ASDF input" */}
      {/*   value={value} */}
      {/*   handleChange={(e) => { */}
      {/*     setValue(e.target.value); */}
      {/*   }} */}
      {/*   items={TODOFUKEN_LIST} */}
      {/*   placeholder="都道府県を選択してください" */}
      {/* /> */}
      <MenuAppBar giftBoxButton={false} />
      {/* <CouponPaymentForm /> */}
      {/* <ItemCardForReciever /> */}
      <SquareButton buttonType="primary">primary</SquareButton>
      <AnswerButton>answer</AnswerButton>
      <SquareButton buttonType="outlined">outlined</SquareButton>
      <SquareButton buttonType="white">white</SquareButton>
      <AnswerCircle size="medium"></AnswerCircle>
      <Tag>Tag</Tag>
    </React.Fragment>
  )
}
