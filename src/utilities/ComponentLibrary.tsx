import React from 'react'
import {
  SquareButton,
  AnswerButton,
  AnswerCircle,
  Tag,
  Switch,
  FormPullDown,
} from 'atoms'
import { MenuAppBar, ShareLink, ItemSummary, CheckoutSummary } from 'organisms'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  PriceTable,
  ProductGuideItem,
} from 'molecules'

import { Typography, Box } from '@mui/material'
import { PageIndicator } from 'molecules'

export const ComponentLibrary: React.FC = () => {
  /* const [value, setValue] = useState(''); */
  return (
    <React.Fragment>
      <Box width="100%">
        <Box width="100%">
          <h2>ProductGuideItem</h2>
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
          <h2>CheckoutSummary</h2>
          <CheckoutSummary
            itemSummary={{
              img:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0aNyjRpa4388plOz1_VL4B687n_xf2zTeEA&usqp=CAU',
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
          <h2>ItemSummary</h2>
          <ItemSummary
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0aNyjRpa4388plOz1_VL4B687n_xf2zTeEA&usqp=CAU"
            brand="CONDIMENTO MEDITERRANEO"
            itemName="ホワイトバルサミコビネガー フルムーン"
            isNoshi={true}
          />
          <h2>PriceTable</h2>
          <PriceTable productPrice={10000} minShipping={500} maxShipping={1200} />
          <h2>FormPullDown</h2>
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
      <MenuAppBar backButton={true} />
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
