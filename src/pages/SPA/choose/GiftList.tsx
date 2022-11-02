import React, { useState, useEffect } from 'react'

import { Box, Stack, Grid, Typography, Button, Modal, useMediaQuery } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { GradientButton } from 'atoms'
import { ItemCard, MenuAppBar, Footer } from 'organisms'
import {
  FilterMultiSelector,
  TestSelector,
  PriceFilter,
  PageIndicator,
  PriceLaptopFilter,
  MobileSearchHeader,
  MobileSearchItemLayout,
  MobileSceneItem,
  MobileKeywordItem,
  MobilePriceItem,
  ModalFooter,
} from 'molecules'
import Header from 'molecules/choose/Header'
import { ProductWithHandlerAndStatus, SCENE_CONFIG_LIST } from 'constants/index'
import { FormStateWithSetter } from 'constants/searchForm'
import { Head } from 'utilities/Head'
import { useScrollDirection } from 'utilities/useScrollDirection'

import { styled } from '@mui/system'

const YEN_MARK = '\xA5'

type GiftListProps = {
  items: Array<ProductWithHandlerAndStatus & { onTap: () => void }>
  handleNextButtonClick: () => void
  howManyInCart?: number
  form?: FormStateWithSetter
  totalItems?: number
}

const SidebarTitle = styled(Stack)({
  '& h3': {
    fontFamily: 'Outfit',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '30px',
    letterSpacing: '0.05em',
    color: '#4A4A4A',
  },
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '10px',
    letterSpacing: '0.03em',
    color: '#CFCAC4',
  },
})

const LaptopScene = styled(Stack)({
  '& img': {
    width: '25px',
  },
  '& button': {
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'start',
    gap: '10px',
    height: '45px',
    borderRadius: '10px',
    fontSize: '15px',
    padding: '20px',
    '&:focus': {
      outline: 0,
    },
  },
})

const Selected = styled(Button)({
  color: '#FE8B7B',
  fontWeight: 700,
  background:
    'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
})

const MobileFilter = styled(Box)((props: { scrollflag: boolean }) => ({
  padding: '16px 18.75px',
  position: 'sticky',
  backgroundColor: 'white',
  top: props.scrollflag ? 63 : 0,
  zIndex: 30,
}))

const MobileFilterButton = styled(Button)({
  height: 54,
  borderRadius: 27,
  boxShadow: '0px 0px 10px rgb(0 0 0 / 15%)',
  border: '1px solid #EEEEEE',
  width: '100%',
  gap: 10,
  justifyContent: 'space-between',
  padding: '0 20px',
})

const MobileSceneName = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '0.03em',
  priceTextAlign: 'left',
  color: '#4A4A4A',
})

const MobileFilterData = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: '0.03em',
  textAlign: 'left',
  color: '#70757A',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '100%',
})

const MobileSearchModal = styled(Stack)({
  width: '100%',
  height: '100%',
  backgroundColor: '#F7F7F7',
  justifyContent: 'space-between',
})

const GiftListWrap = styled(Stack)((props) => ({
  maxWidth: '1100px',
  width: '90%',
  margin: '60px auto',
  [props.theme.breakpoints.down('md')]: {
    marginTop: 0,
  },
}))

const GiftListTitle = styled(Typography)((props) => ({
  marginTop: '40px',
  fontFamily: 'Outfit',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '30px',
  letterSpacing: '0.05em',
  priceTextAlign: 'left',
  color: '#4A4A4A',
  [props.theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const GiftListTitleMobile = styled(Typography)((props) => ({
  marginTop: '24px',
  fontFamily: 'Noto Sans JP',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: 0.03,
  priceTextAlign: 'left',
  color: '#9D9D9D',
  display: 'none',
  [props.theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

const SubmitLaptopButton = styled(Button)((props) => ({
  position: 'fixed',
  top: 'calc(50% - 86px)',
  width: '172px',
  height: '130px',
  right: '40px',
  background:
    'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
  borderRadius: '10px',
  color: 'white',
  fontFamily: 'Noto Sans JP',
  fontSize: '15px',
  fontWeight: 700,
  lineHeight: '30px',
  letterSpacing: '0.03em',
  priceTextAlign: 'center',
  '& img': {
    width: '45px',
  },
  [props.theme.breakpoints.down(1600)]: {
    right: '20px',
  },
  [props.theme.breakpoints.down(1500)]: {
    display: 'none',
  },
}))

const SubmitMobileButton = styled(Box)((props) => ({
  position: 'fixed',
  bottom: '0',
  display: 'none',
  width: '100%',
  backgroundColor: 'white',
  borderTop: '1px solid #DDDDDD',
  textAlign: 'center',
  '& button': {
    margin: '16px 0',
  },
  [props.theme.breakpoints.down(1500)]: {
    display: 'block',
  },
  zIndex: 10,
}))

const PriceModal = styled(Stack)({
  '& h3': {
    fontFamily: 'Noto Sans JP',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.03em',
    textAlign: 'left',
    marginBottom: '4px',
  },
  '& h5': {
    fontFamily: 'Outfit',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '23px',
    letterSpacing: '0.05em',
    textAlign: 'left',
    marginBottom: '10px',
  },
  '& label': {
    color: '#4A4A4A',
  },
  '& div': {
    color: '#4A4A4A',
  },
  '& svg': {
    color: '#4A4A4A',
  },
  '& fieldset': {
    // border: 0,
    borderRadius: '10px',
  },
})

const PriceStyle = styled(Box)((props) => ({
  position: 'absolute' as 'absolute',
  top: '47%',
  left: '53%',
  width: '90%',
  maxWidth: '350px',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '24px',
  boxShadow:
    '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);',
  [props.theme.breakpoints.down('md')]: {
    top: '50%',
    left: '50%',
    maxWidth: '500px',
  },
}))

const PriceLaptopStyle = styled(Box)((props) => ({
  position: 'absolute',
  maxWidth: '350px',
  zIndex: 1,
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '24px',
  marginTop: '20px',
  boxShadow:
    '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);',
  [props.theme.breakpoints.down('md')]: {
    top: '50%',
    left: '50%',
    maxWidth: '500px',
  },
}))

const PriceTitle = styled(Stack)({
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '10px',
    letterSpacing: '0.03em',
    color: '#CFCAC4',
  },
})

export const GiftList = ({
  items,
  handleNextButtonClick,
  howManyInCart = 0,
  form,
  totalItems,
}: GiftListProps) => {
  const { sceneid } = useParams<{ sceneid: string }>()
  const config = SCENE_CONFIG_LIST.find((item) => item.id === sceneid)
  const giftScene = !!config ? config.title : 'すべてのギフト'
  const metaTag = !!config ? config.metaTag : SCENE_CONFIG_LIST[0].metaTag
  const navigate = useNavigate()
  const [mobileStep, setMobileStep] = useState(1)
  const [sceneopen, setSceneOpen] = useState(false)
  const [priceopen, setPriceOpen] = useState(false)
  const [pricelaptopopen, setPriceLaptopOpen] = useState(false)

  const handleSceneOpen = () => setSceneOpen(true)
  const handleSceneClose = () => setSceneOpen(false)

  const handlePriceOpen = () => setPriceOpen(true)
  const handlePriceClose = () => setPriceOpen(false)

  const handlePriceLaptopClose = () => setPriceLaptopOpen(false)

  const [tempPrice, setTempPrice] = useState([form?.minPrice.value, form?.maxPrice.value])

  const isMdSize = useMediaQuery('(min-width: 900px)')

  const checkSidebar = (item: string) => {
    if (!!form) {
      return item === giftScene
    }
  }

  const initSearch = () => {
    if (form) {
      setTempPrice([form.minPrice.value, form.maxPrice.value])
    }
  }

  const clearTempSearch = () => {
    navigate(`/product/choose/${SCENE_CONFIG_LIST[0].id}`)
    setTempPrice([0, 0])
    form?.clear()
  }

  const search = () => {
    if (form) {
      form.minPrice.setValue(tempPrice[0] ? tempPrice[0] : 0)
      form.maxPrice.setValue(tempPrice[1] ? tempPrice[1] : 40000)
    }
  }

  const getPriceText = (
    min: number | undefined | null,
    max: number | undefined | null
  ) => {
    let priceText = ''

    if (!min && !max) {
      priceText = '価格を設定'
    } else {
      if (min) {
        priceText += YEN_MARK + Number(min).toLocaleString()
      } else {
        priceText += '下限なし'
      }

      if (min || max) priceText += ' - '

      if (max && max < (defaultMax ? defaultMax : 40000)) {
        priceText += YEN_MARK + Number(max).toLocaleString()
      } else {
        priceText += '上限なし'
      }
    }

    if (priceText === '下限なし - 上限なし') priceText = '価格を設定'

    return priceText
  }

  const defaultMax = form?.defaultPriceOptions.slice(-1).pop()

  const tempPriceText = getPriceText(tempPrice[0], tempPrice[1])
  const priceText = getPriceText(form?.minPrice.value, form?.maxPrice.value)

  useEffect(() => {
    if (items.length !== 0) {
      window.scrollTo(0, 0)
    }
  }, [items.map((item) => item.sys.id).toString()])

  useEffect(() => {
    if (tempPrice[1] && defaultMax)
      if (tempPrice[1] > defaultMax) {
        setTempPrice([tempPrice[0], defaultMax])
      }
  }, [tempPrice[1], defaultMax])

  const scrollflag = useScrollDirection()

  return (
    <Box>
      <Head title={metaTag.title} description={metaTag.description} />

      <MenuAppBar giftBoxButton={true} />

      {!!form && isMdSize && <Header scene={giftScene} />}

      {!!form && (
        <MobileFilter display={{ md: 'none' }} scrollflag={scrollflag}>
          <MobileFilterButton
            onClick={() => {
              handleSceneOpen()
              setMobileStep(1)
              initSearch()
            }}
          >
            <SearchIcon sx={{ color: '#000 !important' }} />
            <Stack sx={{ width: 'calc(100% - 70px)' }} gap={'4px'} alignItems="start">
              {giftScene === 'すべてのギフト' &&
              priceText === '価格を設定' &&
              form.category.values.length == 0 ? (
                <>
                  <MobileSceneName>シーンは？</MobileSceneName>
                  <MobileFilterData>選択なし・価格ALL・カテゴリーALL</MobileFilterData>
                </>
              ) : (
                <>
                  <MobileSceneName>
                    {giftScene === 'すべてのギフト' ? '選択なし' : giftScene}
                  </MobileSceneName>
                  <MobileFilterData>
                    {priceText !== '価格を設定' ? priceText : '価格ALL'}・
                    {form.category.values.length > 0
                      ? form.category.values.join(', ')
                      : 'カテゴリーALL'}
                  </MobileFilterData>
                </>
              )}
            </Stack>
            <KeyboardArrowDownIcon sx={{ color: '#4A4A4A !important', fontSize: 16 }} />
          </MobileFilterButton>
        </MobileFilter>
      )}

      {!!form && (
        <GiftListWrap>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <SidebarTitle display={{ md: 'flex', xs: 'none' }}>
                <Typography variant="h3">Find by Scene</Typography>
                <Typography>シーン別に探す</Typography>
              </SidebarTitle>
              <LaptopScene mt={5} display={{ md: 'flex', xs: 'none' }}>
                {SCENE_CONFIG_LIST.map((scene, index) =>
                  checkSidebar(scene.title) ? (
                    <Selected key={index}>
                      <img src={scene.iconColored} />
                      {scene.title}
                    </Selected>
                  ) : (
                    <Button
                      sx={{ color: '#4A4A4A' }}
                      key={index}
                      onClick={() => navigate(`/product/choose/${scene.id}`)}
                    >
                      <img src={scene.iconBlackWhite} />
                      {scene.title}
                    </Button>
                  )
                )}
              </LaptopScene>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack
                display={{ md: 'flex', xs: 'none' }}
                direction="column"
                justifyContent="space-between"
              >
                <Stack direction="row" gap={2}>
                  <Box width={{ md: '140px', xs: '50%' }}>
                    <FilterMultiSelector
                      values={form.category.values}
                      options={form.category.options}
                      setValues={form.category.setValues}
                      handlePriceLaptopClose={handlePriceLaptopClose}
                    />
                  </Box>
                  <Box width="50%" display={{ md: 'none', xs: 'block' }}>
                    <PriceFilter
                      priceopen={priceopen}
                      showmodal={handlePriceOpen}
                      minPrice={form.minPrice.value}
                      maxPrice={form.maxPrice.value}
                    />
                  </Box>
                  <Box
                    width="140px"
                    display={{ md: 'block', xs: 'none' }}
                    position="relative"
                  >
                    <PriceLaptopFilter
                      priceopen={pricelaptopopen}
                      showmodal={setPriceLaptopOpen}
                      minPrice={form.minPrice.value}
                      maxPrice={form.maxPrice.value}
                    />
                    {pricelaptopopen && (
                      <PriceLaptopStyle display={{ md: 'block', xs: 'none' }}>
                        <Box
                          component="img"
                          src="/assets/cancel.svg"
                          onClick={() => setPriceLaptopOpen(false)}
                          position="absolute"
                          top={10}
                          right={10}
                          sx={{ cursor: 'pointer' }}
                        />
                        <PriceTitle>
                          <Typography align="center" fontSize={13}>
                            価格
                          </Typography>
                        </PriceTitle>
                        <PriceModal
                          direction="row"
                          mt={2}
                          gap={1}
                          alignItems="end"
                          justifyContent="center"
                        >
                          <Stack width="140px">
                            <Typography variant="h3">最小価格</Typography>
                            <TestSelector
                              value={
                                form.minPrice.value === null ? '' : form.minPrice.value
                              }
                              options={form.minPrice.options}
                              onChange={(e) => {
                                const price = e.target.value
                                if (price === '') {
                                  form.minPrice.setValue(null)
                                } else if (typeof price === 'string') {
                                  form.minPrice.setValue(parseInt(price, 10))
                                } else {
                                  form.minPrice.setValue(price)
                                }
                              }}
                              placeholder="下限なし"
                            />
                          </Stack>
                          <Typography variant="h5">~</Typography>
                          <Stack width="140px">
                            <Typography variant="h3">最大価格</Typography>
                            <TestSelector
                              value={
                                form.maxPrice.value === null ? '' : form.maxPrice.value
                              }
                              options={form.maxPrice.options}
                              onChange={(e) => {
                                const price = e.target.value
                                if (price === '') {
                                  form.maxPrice.setValue(null)
                                } else if (typeof price === 'string') {
                                  form.maxPrice.setValue(parseInt(price, 10))
                                } else {
                                  form.maxPrice.setValue(price)
                                }
                              }}
                              placeholder="上限なし"
                            />
                          </Stack>
                        </PriceModal>
                      </PriceLaptopStyle>
                    )}
                  </Box>
                </Stack>
              </Stack>
              <GiftListTitle>
                {giftScene === 'すべてのギフト' ? '人気' : '「' + giftScene + '」'}
                ギフト一覧
              </GiftListTitle>
              <GiftListTitleMobile>ギフト数（{totalItems}）</GiftListTitleMobile>
              <Box mt={{ sm: 2, xs: -4 }}>
                <Grid container spacing={2}>
                  {items.map((item) => (
                    <Grid
                      key={item.title}
                      item
                      xs={6}
                      lg={4}
                      sx={{
                        paddingTop: {
                          sm: '20px !important',
                          xs: '58px !important',
                        },
                      }}
                    >
                      <ItemCard item={item} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box mt={9}>
                {form.page.max > 1 && items.length !== 0 && (
                  <PageIndicator
                    current={form.page.current}
                    max={form.page.max}
                    onClickNumber={(page) => form.page.setValue(page)}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </GiftListWrap>
      )}

      <Box
        // Add padding to avoid overrapped by button
        pb={{ xl: '0px', xs: howManyInCart > 0 ? '80px' : '0px' }}
        sx={{
          background: '#F6F6F6',
        }}
      >
        <Footer />
      </Box>

      {howManyInCart >= 1 && (
        <SubmitLaptopButton onClick={handleNextButtonClick}>
          <Stack alignItems="center">
            <img src="/gift.svg" />
            <Typography
              align="center"
              color="white"
              fontSize="15px"
              fontWeight={700}
              lineHeight="30px"
            >
              ギフトを確認する
            </Typography>
            <Typography
              align="center"
              color="white"
              fontSize="15px"
              lineHeight="30px"
              fontWeight={700}
            >{`(${howManyInCart}/3)`}</Typography>
          </Stack>
        </SubmitLaptopButton>
      )}
      {howManyInCart >= 1 && (
        <SubmitMobileButton>
          <GradientButton onClick={handleNextButtonClick} width="90%">
            <Stack direction="row" justifyContent="center">
              <img src="/gift.svg" />
              <Typography
                align="center"
                color="white"
                fontSize="15px"
                fontWeight={700}
                lineHeight="30px"
              >
                ギフトを確認する {`${howManyInCart}/3`}
              </Typography>
            </Stack>
          </GradientButton>
        </SubmitMobileButton>
      )}

      {!!form && (
        <Modal
          open={sceneopen}
          onClose={handleSceneClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MobileSearchModal>
            <Stack
              alignItems="start"
              sx={{
                height: 80,
                padding: '25px',
              }}
            >
              <Box
                component="img"
                src="/assets/cancel-black.svg"
                onClick={handleSceneClose}
                position="absolute"
                top={25}
                left={25}
                sx={{ width: 32 }}
              />
            </Stack>

            <Stack
              px={1.5}
              pb={1}
              gap={1.5}
              sx={{
                height: 'calc(100vh - 160px)',
                overflow: 'auto',
              }}
            >
              {mobileStep == 1 ? (
                <MobileSearchItemLayout title="シーンは？">
                  <MobileSceneItem giftScene={config} setMobileStep={setMobileStep} />
                </MobileSearchItemLayout>
              ) : (
                <MobileSearchHeader
                  setMobileStep={() => setMobileStep(1)}
                  title="シーン"
                  subTitle={
                    config?.title === 'すべてのギフト' || !config?.title
                      ? 'シーンは？'
                      : config?.title
                  }
                  selected={config?.title !== 'すべてのギフト'}
                />
              )}
              {mobileStep == 2 ? (
                <MobilePriceItem
                  defaultMinPrice={form.minPrice.value}
                  defaultMaxPrice={form.maxPrice.value}
                  max={defaultMax}
                  tempPrice={tempPrice}
                  setMobileStep={setMobileStep}
                  setTempPrice={setTempPrice}
                />
              ) : (
                <MobileSearchHeader
                  setMobileStep={() => setMobileStep(2)}
                  title={'価格'}
                  subTitle={tempPriceText}
                  selected={tempPriceText !== '価格を設定'}
                />
              )}
              {mobileStep == 3 ? (
                <MobileSearchItemLayout title="どんなギフトをお探しですか？">
                  <MobileKeywordItem
                    values={form?.category.values}
                    options={form?.category.options}
                    setValues={form?.category.setValues}
                  />
                </MobileSearchItemLayout>
              ) : (
                <MobileSearchHeader
                  setMobileStep={() => setMobileStep(3)}
                  title="商品カテゴリー"
                  subTitle={
                    form?.category.values.length > 0
                      ? form?.category.values.join(', ')
                      : '商品カテゴリーを設定'
                  }
                  selected={form?.category.values.length > 0}
                />
              )}
            </Stack>
            <ModalFooter
              leftFunction={clearTempSearch}
              rightFunction={() => {
                search()
                handleSceneClose()
              }}
            />
          </MobileSearchModal>
        </Modal>
      )}

      {!!form && (
        <Modal
          open={priceopen}
          onClose={handlePriceClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <PriceStyle>
            <Box
              component="img"
              src="/assets/cancel.svg"
              onClick={handlePriceClose}
              position="absolute"
              top={10}
              right={10}
            />
            <PriceTitle>
              <Typography align="center" fontSize={13}>
                価格
              </Typography>
            </PriceTitle>
            <PriceModal
              direction="row"
              mt={2}
              gap={1}
              alignItems="end"
              justifyContent="center"
            >
              <Stack width="140px">
                <Typography variant="h3">最小価格</Typography>
                <TestSelector
                  label=""
                  value={form.minPrice.value === null ? '' : form.minPrice.value}
                  options={form.minPrice.options}
                  onChange={(e) => {
                    const price = e.target.value
                    if (price === '') {
                      form.minPrice.setValue(null)
                    } else if (typeof price === 'string') {
                      form.minPrice.setValue(parseInt(price, 10))
                    } else {
                      form.minPrice.setValue(price)
                    }
                  }}
                  placeholder="下限なし"
                />
              </Stack>
              <Typography variant="h5">~</Typography>
              <Stack width="140px">
                <Typography variant="h3">最大価格</Typography>
                <TestSelector
                  label=""
                  value={form.maxPrice.value === null ? '' : form.maxPrice.value}
                  options={form.maxPrice.options}
                  onChange={(e) => {
                    const price = e.target.value
                    if (price === '') {
                      form.maxPrice.setValue(null)
                    } else if (typeof price === 'string') {
                      form.maxPrice.setValue(parseInt(price, 10))
                    } else {
                      form.maxPrice.setValue(price)
                    }
                  }}
                  placeholder="上限なし"
                />
              </Stack>
            </PriceModal>
          </PriceStyle>
        </Modal>
      )}
    </Box>
  )
}
