import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Box,
  TextField,
  InputLabel,
  Typography,
  Stack,
  SelectChangeEvent,
  ButtonBase,
  Divider,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'

import { Checkbox, SquareButton, Switch } from 'atoms'

import {
  Alert,
  LoadingModal,
  AuthModal,
  AuthErrorModal,
  Card,
  ShareLink,
  CheckoutSummary,
  TermsOfService,
} from 'organisms'
import { FormRow, PullDownFormRow } from 'molecules'
import { Layout } from 'templates/Layout'

import { COLOR } from 'theme'

import { webAuth } from 'utilities/webAuth'
import { GiftScene, GIFT_SCENE_LIST } from 'constants/searchForm'
import { Product } from 'constants/index'

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

const useStyles = makeStyles({
  formRoot: {
    width: '100%',
  },
  radioForm: {
    '& label': {
      margin: 0,
    },
    '& span': {
      fontSize: '12px',
    },
    '& span.MuiButtonBase-root': {
      padding: '5px',
    },
    '& .Mui-checked': {
      color: COLOR.primaryNavy,
    },
  },
  messageCount: {
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
  },
  messageInvalid: {
    color: COLOR.alertRed,
  },
  section: {
    fontSize: '16px',
    fontWeight: 700,
  },
  caution: {
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: 0,
    marginTop: '10px',
  },
  instruction: {
    backgroundColor: COLOR.primaryNavy,
    borderRadius: '5px',
    padding: '1rem 1rem 0 1rem',
    color: COLOR.textWhite,
    fontSize: '14px',
    marginBottom: '3rem',
    '& > p': {
      color: COLOR.textWhite,
      padding: '0 1rem 1rem 0',
      lineHeight: 'normal',
    },
  },
  checkboxForm: {
    '& svg': {
      color: '#FE8B7B',
    },
    '& .MuiFormControlLabel-label': {
      fontFamily: "'Noto Sans JP'",
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '270%',
      letterSpacing: '0.03em',
      color: '#4A4A4A',
    },
    '& .Mui-checked': {
      color: '#FE8B7B',
    },
    '& .MuiIconButton-colorSecondary:hover': {
      // change opacity
      backgroundColor: `#FE8B7B11`,
    },
  },
  price: {
    fontFamily: "'Noto Sans JP'",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '150%',
    letterSpacing: '0.03em',
    color: '#4A4A4A',
    marginBottom: '5px',
  },
  priceValue: {
    fontFamily: "'Outfit'",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '25px',
    letterSpacing: '0.05em',
    color: '#4A4A4A',
    marginBottom: '10px',
  },
  priceMemo: {
    fontFamily: "'Noto Sans JP'",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '17px',
    color: '#4A4A4A',
  },
  priceLink: {
    fontFamily: "'Noto Sans JP'",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '17px',
    textDecorationLine: 'underline',
    color: '#FE8B7B',
    cursor: 'pointer',
  },
})

const MessageField = withStyles({
  root: {
    '& .MuiFilledInput-root': {
      backgroundColor: '#F7F7F7',
      padding: '12px 10px',
      borderRadius: '10px',
    },
    '& label.Mui-focused': {
      color: '#F7F7F7',
    },
    '& .MuiFilledInput-multiline': {
      padding: '10px',
    },
    '& .MuiInputBase-inputMultiline': {
      fontSize: '16px',
    },
    '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottom: 'none',
    },
  },
})(TextField)

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
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const history = useHistory()

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

  // check access_token on mount
  useEffect(() => {
    if (window.location.hash.indexOf('access_token') > -1) {
      if (!!tempPrevSender) {
        const prevSender: SenderType = JSON.parse(tempPrevSender)
        onSubmit(prevSender)
      }
    }
  }, [])

  const [trunsactionState, setTransactionState] = useState<undefined | 'running'>(
    undefined
  )
  const [error, setError] = useState<string>('')

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
    })
    const successCallback = (json: { Expires: string; Token: string }) => {
      setExpire(json.Expires)
      history.push(`/product/success?token=${json.Token}`)
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

  const handleOpen = () => {
    sessionStorage.removeItem('sender')

    if (SKIP_AUTH) {
      skipLogin()
      return
    }
    requestCode()
    setOpen(true)
  }

  const requestCode = () => {
    webAuth.passwordlessStart(
      {
        connection: 'email',
        send: 'code',
        email: sender.email,
      },
      function (err: unknown) {
        if (err) {
          onError()
        }

        saveSender()
      }
    )
  }

  const onError = () => {
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

  const skipLogin = () => {
    alert('Auth process is skipped. More detail is written in README')
    saveSender()
    location.href = '/product/checkout#access_token=testtoken'
    location.reload()
  }

  const classes = useStyles()

  // カーソルが真ん中あたりに来ることがあるので
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout maxWidth="md">
      <PageTitle />

      <Box mb="56px">
        <ShareLink />
      </Box>

      <form onSubmit={handleSubmit(handleOpen)} className={classes.formRoot}>
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
              <Typography className={classes.price}>お支払い予定金額(税込)</Typography>
              <Typography className={classes.priceValue}>
                {minPriceInAll === maxPriceInAll
                  ? YEN_MARK + minPriceInAll.toLocaleString('en-US')
                  : `${YEN_MARK + minPriceInAll.toLocaleString('en-US')} ～ ${
                      YEN_MARK + maxPriceInAll.toLocaleString('en-US')
                    }`}
              </Typography>
              <Typography className={classes.priceMemo}>
                ※北海道・沖縄・離島・一部地域の送料に関しては
                <span
                  className={classes.priceLink}
                  onClick={() =>
                    alert(
                      JSON.stringify(
                        itemsInCart.map((item) => ({
                          ID: item.title.slice(0, 15),
                          沖縄: item.shippingFee.okinawaFee + ' YEN',
                          北海道: item.shippingFee.hokkaidoFee + ' YEN',
                          '配送不可地域（複数値）': item.shippingFee.undeliverable,
                        })),
                        null,
                        4
                      )
                    )
                  }
                >
                  こちら
                </span>
              </Typography>
            </Box>
          </Card>
        )}

        <Card header="メッセージを入力する" num={2} mb="70px">
          <FormRow
            label="宛名"
            value={sender.recipientName}
            onChange={sender.onChangeRecipientName}
            type="text"
            id="recipientName"
            register={() => ({
              required: true,
            })}
            invalid={!!errors.recipientName}
            errorMessage="宛名に誤りがあります。"
            placeholder="例）山田太郎"
          />
          <Box textAlign="start">
            <InputLabel
              shrink
              htmlFor="message"
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
              メッセージ
            </InputLabel>
            <MessageField
              id="message"
              placeholder="お相手へのメッセージを入力してください"
              multiline
              rows={4}
              fullWidth
              defaultValue={sender.message}
              variant="filled"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                sender.setMessage(e.target.value)
              }
            />
          </Box>
          <Box mb="24px" className={classes.messageCount}>
            <p>300文字以内</p>
            <Box>
              <p>{sender.message.length} / 300</p>
              {isMessageInvalid ? (
                <p className={classes.messageInvalid}>300文字を超えています</p>
              ) : undefined}
            </Box>
          </Box>
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
                onChange={noshi.onChangeNoshiScene}
                register={null}
                placeholder="熨斗を選択してください"
                invalid={false}
                errorMessage="熨斗の種類が適切ではありません"
              />
            )}
          </Box>
          {noshi.noshigamiId !== 0 && (
            <>
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
                熨斗に入れるお名前
              </InputLabel>
              {/* show up to 3 input forms */}
              <FormRow
                label=""
                value={noshi.naire.nameList[0]}
                onChange={noshi.onChangeNaire1st}
                type="text"
                id="naire1st"
                register={() => ({
                  required: false,
                })}
                invalid={false}
                errorMessage="お名前に誤りがあります。"
                placeholder="例）山田太郎"
                mb="8px"
              />
              {noshi.naire.amount >= 2 && (
                <FormRow
                  label=""
                  value={noshi.naire.nameList[1]}
                  onChange={noshi.onChangeNaire2nd}
                  type="text"
                  id="naire2nd"
                  register={() => ({
                    required: false,
                  })}
                  invalid={false}
                  errorMessage="お名前に誤りがあります。"
                  placeholder="例）山田太郎"
                  mb="8px"
                />
              )}
              {noshi.naire.amount === 3 && (
                <FormRow
                  label=""
                  value={noshi.naire.nameList[2]}
                  onChange={noshi.onChangeNaire3rd}
                  type="text"
                  id="naire3rd"
                  register={() => ({
                    required: false,
                  })}
                  invalid={false}
                  errorMessage="お名前に誤りがあります。"
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
            onChange={sender.onChangeName}
            type="text"
            id="senderName"
            register={() => ({
              required: true,
            })}
            invalid={!!errors.senderName}
            errorMessage="お名前に誤りがあります。"
            placeholder="例）山田太郎"
          />
          <FormRow
            label="メールアドレス"
            value={sender.email}
            onChange={sender.onChangeEmail}
            type="email"
            id="senderEmail"
            register={register({
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            })}
            invalid={!!errors.senderEmail}
            errorMessage="メールアドレスに誤りがあります。"
            placeholder="例）zeft@com"
          />
          <FormRow
            label="電話番号(ハイフンなし)"
            value={sender.phone}
            onChange={sender.onChangePhone}
            type="tel"
            id="senderPhone"
            register={register({
              required: true,
              pattern: /^[0-9]{10,11}$/,
            })}
            invalid={!!errors.senderPhone}
            errorMessage="電話番号に誤りがあります。"
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
          <SquareButton buttonType="primary" type="submit" fullWidth>
            ギフトリンクを発行する
          </SquareButton>
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
        onError={onError}
      />

      <AuthErrorModal
        open={erroropen}
        setOpen={setErrorOpen}
        setVerifyModalOpen={setOpen}
      />
    </Layout>
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
  const isNoshiNGAtAll = itemsInCart.every((item) => item.noshi === false)
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

export function calcSceneForNoshi(
  scenes: Array<GiftScene>
): {
  value: GiftScene | ''
  options: Array<GiftScene>
  noshiOn: boolean
} {
  const ALL_FLAG = 'すべてのギフト'
  const init = {
    value: '',
    options: GIFT_SCENE_LIST.filter((scene) => scene !== ALL_FLAG),
    noshiOn: false,
  }

  if (scenes.every((scene) => scene === ALL_FLAG)) {
    return init
  }

  if (scenes.some((scene) => scene === ALL_FLAG)) {
    const scenesFiltered = scenes.filter((scene) => scene !== ALL_FLAG)
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
