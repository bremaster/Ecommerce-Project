import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react'

import { useNavigate } from 'react-router-dom'
import {
  Box,
  InputLabel,
  Typography,
  Stack,
  SelectChangeEvent,
  ButtonBase,
  Divider,
  Dialog,
} from '@mui/material'

import { Checkbox, Switch, GradientButton, GradientOutlinedButton } from 'atoms'

import {
  Alert,
  LoadingModal,
  AuthModal,
  AuthErrorModal,
  PreviewModal,
  Card,
  ShareLink,
  CheckoutSummary,
  TermsOfService,
  ShippingRemark,
  Footer,
  Loading,
} from 'organisms'
import { FormRow, PullDownFormRow } from 'molecules'
import { Layout } from 'templates/Layout'

import { COLOR } from 'theme'

import { webAuth } from 'utilities/webAuth'
import { GiftScene, GIFT_SCENE_LIST } from 'constants/searchForm'
import { Product } from 'constants/index'
import { dataLayerPush } from 'utilities/GoogleAnalytics'
import { checkHalfWidth } from 'utilities/checkHalfWidth'
import { getSalesChannel } from 'utilities/SalesChannel'

import { styled } from '@mui/system'

const SKIP_AUTH = process.env.REACT_APP_AUTH0_SKIP_AUTH === 'true'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
//
const SETTING = {
  api: {
    url: process.env.REACT_APP_CLOUD_RUN_CADU_API_URL,
    //url: "https://cadu-apiserver-3itmlfcdwa-an.a.run.app",
    //url: "http://localhost:8000"
  },
}

const YEN_MARK = '\xA5'

const MessageCount = styled(Box)({
  paddingTop: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  color: COLOR.brandNameGray,
  '& p': {
    textAlign: 'end',
    fontSize: '12px',
    letterSpacing: '1px',
    marginBottom: 0,
  },
})

const Price = styled(Typography)({
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '10px',
  lineHeight: '150%',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  marginBottom: '5px',
})

const PriceValue = styled(Typography)({
  fontFamily: "'Outfit'",
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '25px',
  letterSpacing: '0.05em',
  color: '#4A4A4A',
  marginBottom: '10px',
})

const PriceMemo = styled(Typography)({
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '17px',
  color: '#4A4A4A',
})

const PriceLink = styled('span')({
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '17px',
  textDecorationLine: 'underline',
  color: '#FE8B7B',
  cursor: 'pointer',
})

const PreviewButton = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  lineHeight: '43px',
  letterSpacing: '0.03em',
  textDecoration: 'underline',
  width: '100%',
  marginTop: '18px',
  cursor: 'pointer',
})

export type Props = {
  sender: {
    name?: string
    email?: string
    phone?: string
    recipientName?: string
    message: string
    isNewsletter: boolean
    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangePhone: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChangeRecipientName: (event: React.ChangeEvent<HTMLInputElement>) => void
    setMessage: (message: string) => void
    selectedItems: string[]
    toggleNewsLetter: () => void
    children?: React.ReactNode
  }
  price: number
  setExpire: (arg: string) => void
  scenesInCart: Array<GiftScene>
  itemsInCart: Array<Product>
}

export type SenderType = Pick<
  Props['sender'],
  | 'name'
  | 'email'
  | 'phone'
  | 'message'
  | 'selectedItems'
  | 'recipientName'
  | 'isNewsletter'
> & {
  noshiType: number
  noshiNaire: string
}

export const RegisterGift: React.FC<Props> = ({
  sender,
  price,
  setExpire,
  scenesInCart,
  itemsInCart,
}: Props) => {
  const emailtype =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    isNewsletter: '',
    naire3rd: '',
    naire2st: '',
    naire1st: '',
    selection: '',
    recipientName: '',
  })

  const navigate = useNavigate()

  // Noshi is japanese gift wrapping. useNoshi determines wrapping config.
  const noshi = useNoshi(itemsInCart, scenesInCart)

  const tempPrevSender = sessionStorage.getItem('sender')

  // calculate price
  const [minPriceInAll, maxPriceInAll] = calcMinAndMaxPrice(itemsInCart)

  // validation の成否
  // const [validateOk, setValidateOk] = useState(false);
  const { name, phone, email, message, isNewsletter } = sender
  useEffect(() => {
    // setValidateOk(false);
  }, [name, phone, email, message, isNewsletter, price])

  const [open, setOpen] = useState(false)
  const [erroropen, setErrorOpen] = useState(false)

  const [isMessageInvalid, setIsMessageInvalid] = useState(false)
  const maxMessageLength = 300

  // watch  message change
  useEffect(() => {
    sender.message.length > maxMessageLength
      ? setIsMessageInvalid(true)
      : setIsMessageInvalid(false)
  }, [sender.message])

  // check access_token, link created or not, temp sender
  useEffect(() => {
    const hasAccessToken = window.location.hash.indexOf('access_token') > -1
    // Prevent gift links from being created when a user comes via browser back
    const isAuthRequested = linkCreatedStatus.get() === 'AUTH_REQUESTED'
    if (hasAccessToken && isAuthRequested && !!tempPrevSender) {
      const prevSender: SenderType = JSON.parse(tempPrevSender)
      onSubmit(prevSender)
    } else {
      setShow(true)
    }
  }, [])

  const [trunsactionState, setTransactionState] = useState<undefined | 'running'>(
    undefined
  )
  const [error, setError] = useState<string>('')

  const [showShippingMore, setShowShippingMore] = useState(false)

  const [resend, setResend] = useState(false)

  const salesChannel = getSalesChannel()

  const onSubmit = async (payload: SenderType) => {
    setTransactionState('running')
    const reqUrl = `${SETTING.api.url}/card`
    const reqBody = JSON.stringify({
      selected: payload.selectedItems,
      email: payload.email,
      phone: payload.phone,
      isNewsletter: payload.isNewsletter,
      idToken: 'NOIDTOKENFORNOW',
      message: payload.message.trim(),
      messageTo: payload.recipientName,
      name: payload.name,
      noshiType: payload.noshiType,
      noshiNaire: payload.noshiNaire,
      salesChannel: !!salesChannel ? salesChannel : '',
    })
    const successCallback = (json: { Expires: string; Token: string }) => {
      setExpire(json.Expires)
      // push event to data layer
      dataLayerPush({ event: 'link created', cardToken: json.Token })
      linkCreatedStatus.set('CREATED')
      navigate(`/product/success?token=${json.Token}`)
    }
    try {
      const response = await fetch(reqUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: reqBody,
      })
      const json = await response.json()
      if (json.Success == true) {
        successCallback(json)
      } else {
        setTransactionState(undefined)
        setError('決済に失敗しました。')
      }
    } catch (err) {
      setTransactionState(undefined)
      setError('エラーが発生しました。通信環境をご確認ください。')
      console.log(err)
      // TODO: send error to google analytics
      // setError('エラーが発生しました:' + err);
    }
  }

  const handleOpen = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errorFlag = validationSubmit()

    if (!errorFlag) {
      sessionStorage.removeItem('sender')
      dataLayerPush({
        event: 'create link info submitted',
        totalPriceRange: `${minPriceInAll} - ${maxPriceInAll}`,
        numberOfGifts: itemsInCart.length,
        sceneSelected: noshi.noshiScene.value,
        noshiApplied: noshi.isNoshi,
        noshiTypeSelected: noshi.noshigamiId,
      })

      if (SKIP_AUTH) {
        skipLogin()
        return
      }
      requestCode()
      setOpen(true)
    } else {
      const errorElement = document.getElementById(`title_${errorFlag}`)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const requestCode = () => {
    linkCreatedStatus.set('AUTH_REQUESTED')
    webAuth.passwordlessStart(
      {
        connection: 'email',
        send: 'code',
        email: sender.email,
      },
      function (err: unknown) {
        if (err) {
          onAuthError()
        }

        saveSender()
      }
    )
  }

  const onAuthError = () => {
    setErrorOpen(true)
  }

  const saveSender = () => {
    const senderToBeSaved: SenderType = {
      name: sender.name,
      phone: sender.phone,
      email: sender.email,
      message: sender.message,
      selectedItems: sender.selectedItems,
      recipientName: sender.recipientName,
      isNewsletter: sender.isNewsletter,
      noshiType: noshi.noshigamiId,
      noshiNaire: noshi.naire.nameList.filter((name) => name !== '').join(' / '),
    }
    sessionStorage.setItem('sender', JSON.stringify(senderToBeSaved))
  }

  const savePreviewData = () => {
    const previewData = {
      to: sender.recipientName,
      from: sender.name,
      message: sender.message,
      itemsInCart: itemsInCart,
    }
    localStorage.setItem('previewData', JSON.stringify(previewData))
  }

  const skipLogin = () => {
    linkCreatedStatus.set('AUTH_REQUESTED')
    alert('Auth process is skipped. More detail is written in README')
    saveSender()
    location.href = '/product/checkout#access_token=testtoken'
    location.reload()
  }

  const validationSubmit = () => {
    let flag
    let tempError = Object.assign(errors)

    if (!sender.recipientName || sender.recipientName == '') {
      tempError = {
        ...tempError,
        recipientName: '必須項目を入力してください',
      }
      if (!flag) flag = 'recipientName'
    }

    if (message == '') {
      tempError = {
        ...tempError,
        message: '必須項目を入力してください',
      }
      if (!flag) flag = 'message'
    }

    if (noshi.isNoshi) {
      if (noshi.noshiScene.value == '') {
        tempError = {
          ...tempError,
          selection: '必須項目を入力してください',
        }
        if (!flag) flag = 'selection'
      }

      if (noshi.naire.nameList[0] == '') {
        tempError = {
          ...tempError,
          naire1st: '必須項目を入力してください',
        }
        if (!flag) flag = 'naire1st'
      }

      if (noshi.naire.amount >= 2) {
        if (noshi.naire.nameList[1] == '') {
          tempError = {
            ...tempError,
            naire2st: '必須項目を入力してください',
          }
          if (!flag) flag = 'naire2st'
        }
      }

      if (noshi.naire.amount == 3) {
        if (noshi.naire.nameList[2] == '') {
          tempError = {
            ...tempError,
            naire3rd: '必須項目を入力してください',
          }
          if (!flag) flag = 'naire3rd'
        }
      }
    }

    if (name == '') {
      tempError = {
        ...tempError,
        name: '必須項目を入力してください',
      }
      if (!flag) flag = 'name'
    }

    if (!emailtype.test(email ? email : '')) {
      tempError = {
        ...tempError,
        email: '正しいメールアドレスを入力してください',
      }
      if (!flag) flag = 'email'
    }

    if (email == '') {
      tempError = {
        ...tempError,
        email: '必須項目を入力してください',
      }
      if (!flag) flag = 'email'
    }

    if (phone) {
      if (phone?.length > 11) {
        tempError = {
          ...tempError,
          phone: '10桁または11桁で入力してください',
        }
        if (!flag) flag = 'phone'
      }
    }

    if (!checkHalfWidth(phone)) {
      tempError = {
        ...tempError,
        phone: '半角数字のみで入力してください',
      }
      if (!flag) flag = 'phone'
    }

    if (phone == '') {
      tempError = {
        ...tempError,
        phone: '必須項目を入力してください',
      }
      if (!flag) flag = 'phone'
    }

    setErrors(tempError)
    return flag
  }

  const validation = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    let flag = 0
    if (e.target.name == 'message') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'phone') {
      if (!checkHalfWidth(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: '半角数字のみで入力してください',
        })
        flag++
      }
      if (
        !(e.target.value.length == 11 || e.target.value.length == 10) ||
        !/^-?\d+$/.test(e.target.value)
      ) {
        setErrors({
          ...errors,
          [e.target.name]: '10桁または11桁で入力してください',
        })
        flag++
      }
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'email') {
      if (!emailtype.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: '正しいメールアドレスを入力してください',
        })
        flag++
      }
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'name') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'recipientName') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'selection') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'naire1st') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'naire2st') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }

    if (e.target.name == 'naire3rd') {
      if (e.target.value === '') {
        setErrors({
          ...errors,
          [e.target.name]: '必須項目を入力してください',
        })
        flag++
      }
      if (flag == 0) {
        setErrors({
          ...errors,
          [e.target.name]: '',
        })
      }
    }
  }

  // カーソルが真ん中あたりに来ることがあるので
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return show === false ? (
    <Loading />
  ) : (
    <>
      <Layout maxWidth="md">
        <PageTitle />

        <Box mb="56px">
          <ShareLink />
        </Box>

        <form onSubmit={handleOpen} style={{ width: '100%' }}>
          {itemsInCart.length > 0 && (
            <Card header="選んだギフト" num={1} mb="70px">
              {itemsInCart.map((item, idx) => (
                <Box key={item.sys.id} mb="2rem">
                  {idx > 0 && (
                    <Divider
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        borderColor: '#CFCAC4',
                        mb: '1.5rem',
                      }}
                    />
                  )}
                  <CheckoutSummary
                    itemSummary={{
                      img: item.productImageCloudinary[0].secure_url,
                      brand: item.brand.brandName,
                      itemName: item.title,
                      isNoshi: item.noshi,
                    }}
                    priceTable={{
                      productPrice: item.productPrice,
                      minShipping: item.shippingFee.minFee,
                      maxShipping: item.shippingFee.maxFee,
                    }}
                  />
                </Box>
              ))}
              <Divider sx={{ borderColor: '#CFCAC4', mb: '1.5rem' }} />
              <Box textAlign={{ sm: 'left', md: 'right' }} mb="1rem">
                <Price>お支払い予定金額(税込)</Price>
                <PriceValue>
                  {minPriceInAll === maxPriceInAll
                    ? YEN_MARK + minPriceInAll.toLocaleString('en-US')
                    : `${YEN_MARK + minPriceInAll.toLocaleString('en-US')} ～ ${
                        YEN_MARK + maxPriceInAll.toLocaleString('en-US')
                      }`}
                </PriceValue>
                <PriceMemo
                  onClick={() => {
                    setShowShippingMore(true)
                  }}
                >
                  ※北海道・沖縄・離島・一部地域の送料に関しては
                  <PriceLink>こちら</PriceLink>
                </PriceMemo>
                <Dialog
                  open={showShippingMore}
                  onClose={() => setShowShippingMore(false)}
                  sx={{
                    '& .MuiPaper-root': {
                      borderRadius: '10px',
                      margin: '24px',
                    },
                  }}
                >
                  <Box p="24px">
                    <ShippingRemark
                      items={itemsInCart.map((item) => ({
                        itemName: item.title,
                        hokkaidoFee: item.shippingFee.hokkaidoFee,
                        okinawaFee: item.shippingFee.okinawaFee,
                        undeliverableSites:
                          item.shippingFee.undeliverable === null
                            ? []
                            : item.shippingFee.undeliverable,
                      }))}
                    />
                    <Box mt="24px">
                      <GradientOutlinedButton onClick={() => setShowShippingMore(false)}>
                        閉じる
                      </GradientOutlinedButton>
                    </Box>
                  </Box>
                </Dialog>
              </Box>
            </Card>
          )}

          <Card header="メッセージを入力する" num={2} mb="70px">
            <FormRow
              label="宛名"
              value={sender.recipientName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                validation(e)
                sender.onChangeRecipientName(e)
              }}
              type="text"
              id="recipientName"
              required={true}
              invalid={!!errors.recipientName}
              errorMessage={errors.recipientName}
              placeholder="例）山田太郎"
            />
            <Box textAlign="start">
              <FormRow
                label="メッセージ"
                value={sender.message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length <= 300) {
                    validation(e)
                    sender.setMessage(e.target.value)
                  }
                }}
                type="text"
                id="message"
                required={true}
                multiline
                rows={4}
                invalid={!!errors.message}
                errorMessage={errors.message}
                placeholder="お相手へのメッセージを入力してください"
              />
            </Box>
            <MessageCount mb="24px">
              <p>300文字以内</p>
              <Box>
                <p>{sender.message.length} / 300</p>
                {isMessageInvalid ? (
                  <p style={{ color: COLOR.alertRed }}>300文字を超えています</p>
                ) : undefined}
              </Box>
            </MessageCount>
            <Box>
              {!noshi.isNoshiNGAtAll && (
                <Box mb="24px">
                  <InputLabel
                    shrink
                    sx={{
                      color: '#4A4A4A',
                      fontFamily: "'Noto Sans JP'",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      marginBottom: '0',
                      lineHeight: '32px',
                    }}
                  >
                    熨斗の有無
                  </InputLabel>
                  <Switch checked={noshi.isNoshi} onChange={noshi.onChangeNoshiToggle} />
                </Box>
              )}
              {noshi.isNoshi === true && (
                <PullDownFormRow
                  label="熨斗の種類選択"
                  value={noshi.noshiScene.value as string}
                  items={noshi.noshiScene.options as string[]}
                  onChange={(e) => {
                    validation(e)
                    noshi.onChangeNoshiScene(e)
                  }}
                  register={null}
                  placeholder="熨斗を選択してください"
                  errorMessage={errors.selection}
                  required={true}
                  id="selection"
                  invalid={!!errors.selection}
                />
              )}
            </Box>
            {noshi.noshigamiId !== 0 && (
              <>
                {/* show up to 3 input forms */}
                <FormRow
                  label="熨斗に入れるお名前"
                  value={noshi.naire.nameList[0]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    validation(e)
                    noshi.onChangeNaire1st(e)
                  }}
                  type="text"
                  id="naire1st"
                  required={true}
                  invalid={!!errors.naire1st}
                  errorMessage={errors.naire1st}
                  placeholder="例）山田太郎"
                  mb="8px"
                />
                {noshi.naire.amount >= 2 && (
                  <FormRow
                    label="熨斗に入れるお名前"
                    value={noshi.naire.nameList[1]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      validation(e)
                      noshi.onChangeNaire2nd(e)
                    }}
                    type="text"
                    id="naire2st"
                    required={true}
                    invalid={!!errors.naire2st}
                    errorMessage="熨斗に入れるお名前は入力必須です"
                    placeholder="例）山田太郎"
                    mb="8px"
                  />
                )}
                {noshi.naire.amount === 3 && (
                  <FormRow
                    label="熨斗に入れるお名前"
                    value={noshi.naire.nameList[2]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      validation(e)
                      noshi.onChangeNaire3rd(e)
                    }}
                    type="text"
                    id="naire3rd"
                    required={true}
                    invalid={!!errors.naire3rd}
                    errorMessage="熨斗に入れるお名前は入力必須です"
                    placeholder="例）山田太郎"
                    mb="8px"
                  />
                )}
                <AddNameButton onClick={noshi.onClickAppendNaire} />
                <Box
                  sx={{
                    mt: '0.5rem',
                    fontFamily: "'Noto Sans JP'",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '12px',
                    letterSpacing: '0.03em',
                    color: '#4A4A4A',
                    lineHeight: 'normal',
                  }}
                >
                  {noshi.naireCaution}
                </Box>
              </>
            )}
            {noshi.noshigamiId !== 0 && (
              <Box
                px="3rem"
                py="1rem"
                mt="1rem"
                borderRadius="10px"
                border="1px solid #CFCAC4"
              >
                <img
                  src={`/assets/noshigami/Noshi_${noshi.noshigamiId}.svg`}
                  alt="noshigami"
                />
              </Box>
            )}
          </Card>

          <Card header="贈り主情報" num={3}>
            <FormRow
              label="お名前"
              value={sender.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                validation(e)
                sender.onChangeName(e)
              }}
              type="text"
              id="name"
              required={true}
              invalid={!!errors.name}
              errorMessage="お名前は入力必須です"
              placeholder="例）山田太郎"
            />
            <FormRow
              label="メールアドレス"
              value={sender.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                validation(e)
                sender.onChangeEmail(e)
              }}
              type="email"
              id="email"
              required={true}
              invalid={!!errors.email}
              errorMessage={errors.email}
              placeholder="例）zeft@com"
            />
            <FormRow
              label="電話番号(ハイフンなし)"
              value={sender.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (/^[0-9]+$/.test(e.target.value) || e.target.value.length === 0) {
                  if (e.target.value.length < 12) {
                    validation(e)
                    sender.onChangePhone(e)
                  }
                }
              }}
              type="tel"
              id="phone"
              required={true}
              invalid={!!errors.phone}
              errorMessage={errors.phone}
              placeholder="例）01234567890"
            />
            <Box sx={{ display: 'grid', placeItems: 'center' }}>
              <Checkbox
                label="最新情報やお知らせなどを受け取る"
                checked={sender.isNewsletter}
                onClick={sender.toggleNewsLetter}
              />
            </Box>
          </Card>

          <Box display="grid" sx={{ placeItems: 'center' }}>
            <Box p="2rem">
              <TermsOfService />
            </Box>
          </Box>

          <Box mt="1rem" mb="4rem">
            {/* this button fires form's submit event */}
            <GradientButton type="submit">ギフトリンクを発行する</GradientButton>

            <PreviewModal
              button={
                <PreviewButton
                  color="#FE8B7B"
                  align="center"
                  fontSize={16}
                  fontWeight={700}
                >
                  貰い手の表示を確認する ↗
                </PreviewButton>
              }
              savePreviewData={savePreviewData}
            />
          </Box>
        </form>
        {trunsactionState === 'running' && (
          <LoadingModal message="完了まで少々お待ちください。" />
        )}
        {error && <Alert message={error} handleClose={() => setError('')} />}

        <AuthModal
          open={open}
          setOpen={setOpen}
          sender={{
            email: sender.email || '',
          }}
          requestCode={requestCode}
          onError={onAuthError}
          resend={resend}
          setResend={setResend}
        />

        <AuthErrorModal
          open={erroropen}
          setOpen={setErrorOpen}
          setVerifyModalOpen={setOpen}
          setResend={setResend}
        />
      </Layout>
      <Footer isMinimal={true} />
    </>
  )
}

const PageTitle = () => (
  <Stack direction="column" alignItems="center" py="60px">
    <Typography
      sx={{
        fontFamily: "'Outfit'",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '28px',
        lineHeight: '35px',
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: '0.5rem',
      }}
    >
      ギフトを贈る
    </Typography>
    <Typography
      sx={{
        fontFamily: "'Outfit'",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '0.05em',
        color: '#4A4A4A',
      }}
    >
      Send a Gift
    </Typography>
  </Stack>
)

const AddNameButton = (props: { onClick: () => void }) => {
  return (
    <ButtonBase
      sx={{
        background: '#FE8B7B',
        borderRadius: '10px',
        outline: 'none !important',
        height: '27px',
        px: '10px',
      }}
      onClick={props.onClick}
    >
      <img src="/assets/checkout/plus-icon.svg" alt="plus" />
      <Box
        sx={{
          ml: '7px',
          fontFamily: "'Noto Sans JP'",
          fontWeight: 400,
          fontSize: '12px',
          color: '#FFFFFF',
          lineHeight: '30px',
        }}
      >
        名前を追加する
      </Box>
    </ButtonBase>
  )
}

function useNoshi(itemsInCart: Array<Product>, scenesInCart: Array<GiftScene>) {
  // Remove noshi when all item is noshi NG or specific scene
  const isNoshiNGAtAll =
    itemsInCart.every((item) => item.noshi === false) ||
    scenesInCart.every((scene) => scene === '誕生日' || scene === 'お礼')
  const noshiSceneInitialized = isNoshiNGAtAll
    ? { value: '', options: [], noshiOn: false }
    : calcSceneForNoshi(scenesInCart)
  const [noshiScene, setNoshiScene] = useState(noshiSceneInitialized)
  const [isNoshi, setIsNoshi] = useState(noshiSceneInitialized.noshiOn)
  const noshigamiId = calcNoshigamiId(noshiScene.value)
  const naireCaution =
    noshigamiId === 1 || noshigamiId === 3
      ? '最大3名で4名以上の場合には代表者1名のみを記載し、その左側に「他○○一同」などと入力してください。'
      : ''
  const [naire, setNaire] = useState<{
    amount: number
    nameList: string[]
  }>({
    amount: 1,
    nameList: ['', '', ''],
  })

  const onChangeNoshiScene = (e: SelectChangeEvent<string>) => {
    setNoshiScene({
      ...noshiScene,
      value: e.target.value as '' | GiftScene,
    })
    setNaire({
      amount: 1,
      nameList: ['', '', ''],
    })
  }
  const onChangeNoshiToggle = (value: boolean) => {
    if (value === false) {
      setNoshiScene({
        ...noshiScene,
        value: '',
      })
      setIsNoshi(false)
    } else {
      setIsNoshi(true)
    }
  }

  const onChangeNaire1st = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNameList = [...naire.nameList]
    newNameList[0] = event.target.value
    setNaire({ ...naire, nameList: newNameList })
  }
  const onChangeNaire2nd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNameList = [...naire.nameList]
    newNameList[1] = event.target.value
    setNaire({ ...naire, nameList: newNameList })
  }
  const onChangeNaire3rd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNameList = [...naire.nameList]
    newNameList[2] = event.target.value
    setNaire({ ...naire, nameList: newNameList })
  }
  const onClickAppendNaire = () => {
    if (naire.amount === 3) {
      return undefined
    }
    if (naire.amount === 2) {
      setNaire({
        ...naire,
        amount: naire.amount + 1,
      })
    } else {
      setNaire({ ...naire, amount: naire.amount + 1 })
    }
  }

  return {
    isNoshiNGAtAll,
    isNoshi,
    noshiScene,
    noshigamiId,
    naire,
    naireCaution,
    onChangeNoshiScene,
    onChangeNoshiToggle,
    onChangeNaire1st,
    onChangeNaire2nd,
    onChangeNaire3rd,
    onClickAppendNaire,
  }
}

export function calcSceneForNoshi(scenes: Array<GiftScene>): {
  value: GiftScene | ''
  options: Array<GiftScene>
  noshiOn: boolean
} {
  const SCENES_NOT_SUITABLE_FOR_NOSHI = ['すべてのギフト', 'お礼', '誕生日']
  const init = {
    value: '',
    options: GIFT_SCENE_LIST.filter(
      (scene) => !SCENES_NOT_SUITABLE_FOR_NOSHI.includes(scene)
    ),
    noshiOn: false,
  }

  if (scenes.every((scene) => SCENES_NOT_SUITABLE_FOR_NOSHI.includes(scene))) {
    return init
  }

  if (scenes.some((scene) => SCENES_NOT_SUITABLE_FOR_NOSHI.includes(scene))) {
    const scenesFiltered = scenes.filter(
      (scene) => !SCENES_NOT_SUITABLE_FOR_NOSHI.includes(scene)
    )
    const scenesUnique = Array.from(new Set(scenesFiltered))
    if (scenesUnique.length === 1) {
      return {
        value: scenesUnique[0],
        options: init.options,
        noshiOn: true,
      }
    }
    return {
      value: '',
      options: init.options,
      noshiOn: true,
    }
  }

  const scenesUnique = Array.from(new Set(scenes))
  if (scenesUnique.length === 1) {
    return {
      value: scenesUnique[0],
      options: scenesUnique,
      noshiOn: true,
    }
  }
  return {
    value: '',
    options: scenesUnique,
    noshiOn: true,
  }
}

function calcNoshigamiId(scene: GiftScene): number {
  /* 1,御出産御祝,蝶結び,出産祝い */
  /* 2,内祝,蝶結び,出産内祝い */
  /* 3,御結婚御祝,結び切,結婚祝い */
  /* 4,内祝,結び切,結婚内祝い */
  switch (scene) {
    case '出産祝い': {
      return 1
    }
    case '出産内祝い': {
      return 2
    }
    case '結婚祝い': {
      return 3
    }
    case '結婚内祝い': {
      return 4
    }
    default: {
      return 0
    }
  }
}

function calcMinAndMaxPrice(
  items: Pick<Product, 'productPrice' | 'shippingFee'>[]
): [number, number] {
  const min = Math.min(
    ...items.map((item) => item.productPrice + item.shippingFee.minFee)
  )
  const max = Math.max(
    ...items.map((item) => item.productPrice + item.shippingFee.maxFee)
  )
  return [min, max]
}

// Prevent gift links from being created when a user browses back
const linkCreatedStatus = {
  get: () => sessionStorage.getItem('linkCreatedStatus'),
  set: (status: 'CREATED' | 'AUTH_REQUESTED') =>
    sessionStorage.setItem('linkCreatedStatus', status),
}
