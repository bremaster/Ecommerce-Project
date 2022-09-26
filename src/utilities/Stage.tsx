import React from 'react'
import { ReThank } from '../pages/SPA/reciever/checkout/ReThank'
import { Thank } from '../pages/SPA/checkout/Thank'
import { ComponentLibrary } from './ComponentLibrary'
import { Layout } from '../templates/Layout'
import { ConfirmationSection } from 'organisms'
import { CloseIcon } from 'atoms'

import 'react-spring-bottom-sheet/dist/style.css'

export const Stage: React.FC = () => {
  return (
    <Layout maxWidth="md">
      <ComponentLibrary />
      <ReThank />
      <Thank expire="2022-09-11" />
      <div style={{ border: '2px solid red' }}>
        <h4>Messaging app launch test</h4>
        <a
          style={{ padding: '5px', display: 'block' }}
          href="https://line.me/R/share?text=https://aaa.t9e18s8ut0y0.stg.zeft.app/giftshare?token=d0cd6f86fe7bfa9fc379bd91b7a108bc3c51140875dcef052fae0eeff97825e1"
        >
          Line
        </a>
        <a
          style={{ padding: '5px', display: 'block' }}
          href="fb-messenger://share?link=https://aaa.t9e18s8ut0y0.stg.zeft.app/giftshare?token=d0cd6f86fe7bfa9fc379bd91b7a108bc3c51140875dcef052fae0eeff97825e1"
        >
          messenger
        </a>
        <a
          style={{ padding: '5px', display: 'block' }}
          href="http://instagram.com/_u/{USERNAME}/"
        >
          launch instagram (patternA)
        </a>
        <a
          style={{ padding: '5px', display: 'block' }}
          href="instagram://user?username=untitled.tiff"
        >
          launch instagram (patternB)
        </a>
      </div>

      <CloseIcon onClick={() => alert('asdfda')} />
      <ConfirmationSection
        sender={{ name: 'aaa', email: 'asdf@gmail.com', phone: '09099998888' }}
        items={[
          {
            image: 'https://picsum.photos/id/237/300/300',
            brand: 'courier',
            name: 'cake',
          },
          {
            image: 'https://picsum.photos/id/237/300/300',
            brand: 'CONDIMENTO MEDITERRANEO',
            name: 'エキストラバージンオリーブオイルと泉の岩塩3種',
          },
        ]}
        price={6000}
      />
      {/* <CartContent /> */}
      {/* <CheckOutForm */}
      {/*   sender={{ */}
      {/*     name: 'asdf', */}
      {/*     onChangeName: () => alert('aaa'), */}
      {/*     email: 'aaa@gmail.com', */}
      {/*     onChangeEmail: () => alert('aaa'), */}
      {/*     phone: '09022221111', */}
      {/*     onChangePhone: () => alert('aaa'), */}
      {/*     message: 'asdf', */}
      {/*     setMessage: () => alert('adf'), */}
      {/*   }} */}
      {/*   waygift="URLONLY" */}
      {/*   recipient={{ */}
      {/*     name: 'adsf', */}
      {/*     onChangeName: () => alert('aaa'), */}
      {/*     postalCode: '0902345', */}
      {/*     onChangePostalCode: () => alert('aaa'), */}
      {/*     address: 'asdfasdfasdf', */}
      {/*     onChangeAddress: () => alert('aaa'), */}
      {/*     phone: '09022221111', */}
      {/*     onChangePhone: () => alert('aaa'), */}
      {/*   }} */}
      {/*   wayrecipient={{ */}
      {/*     value: 'UNKNOWN', */}
      {/*     onClickSendToMe: () => alert('aaa'), */}
      {/*     onClickSendToOthers: () => alert('aaa'), */}
      {/*   }} */}
      {/*   price={5000} */}
      {/* > */}
      {/*   <h2>adfa</h2> */}
      {/* </CheckOutForm> */}
      {/* <GiftConfirm */}
      {/*   gifts={[ */}
      {/*     { */}
      {/*       giftName: 'バスボム', */}
      {/*       giftBrand: 'THAN', */}
      {/*       giftImage: */}
      {/*         'https://res.cloudinary.com/zeft/image/upload/q_auto,f_auto,w_auto,c_fill/v1623768795/zeft_landing/ui2_recc2l.png', */}
      {/*       handleClick: () => alert('clicked'), */}
      {/*     }, */}
      {/*     { */}
      {/*       giftName: 'バスボム2', */}
      {/*       giftBrand: 'THAN2', */}
      {/*       giftImage: */}
      {/*         'https://res.cloudinary.com/zeft/image/upload/q_auto,f_auto,w_auto,c_fill/v1623768795/zeft_landing/ui2_recc2l.png', */}
      {/*       handleClick: () => alert('clicked'), */}
      {/*     }, */}
      {/*   ]} */}
      {/*   prices={[ */}
      {/*     { */}
      {/*       col1: 'カード', */}
      {/*       col2: '¥500円（税別）', */}
      {/*     }, */}
      {/*     { */}
      {/*       col1: '合計', */}
      {/*       col2: '¥3,500円（税別）', */}
      {/*       isImportant: true, */}
      {/*     }, */}
      {/*   ]} */}
      {/*   handleNoLoginAndBuy={() => alert('clicked')} */}
      {/*   handleLoginAndBuy={() => alert('clicked')} */}
      {/* /> */}
      {/* <GiftConfirm /> */}
      {/* <h3>GIVER</h3> */}
      {/* <SquareButton buttonType="primary" href="./product/quiz/1"> */}
      {/*   送りて */}
      {/* </SquareButton> */}
      {/* <h3>REVIEVER</h3> */}
      {/* <SquareButton */}
      {/*   buttonType="primary" */}
      {/*   href="./gift/ab68f008fd7f863aad1e9b80f6521d30773683025c70dd652cc56833f1044bc0" */}
      {/* > */}
      {/*   貰い手 */}
      {/* </SquareButton> */}
      {/* <h3>COMP LIB</h3> */}
      {/* <h3>PRODUCT CHECK</h3> */}
      {/* <ProductCheck /> */}
      {/* <h3>THANK</h3> */}
      {/* <h3>RE THANK</h3> */}
      {/* <Top /> */}
    </Layout>
  )
}
