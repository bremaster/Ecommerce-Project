import React, { useState, useEffect } from 'react'

import {
  Box,
  Stack,
  Grid,
  Typography,
  Button,
  Modal,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

import { GradientButton } from 'atoms'
import { ItemCard, MenuAppBar, Footer } from 'organisms'
import {
  FilterMultiSelector,
  TestSelector,
  PriceFilter,
  PageIndicator,
  PriceLaptopFilter,
} from 'molecules'
import Header from 'molecules/choose/Header'
import { ProductWithHandlerAndStatus, SCENE_CONFIG_LIST } from 'constants/index'
import { FormStateWithSetter } from 'constants/searchForm'
import { Head } from 'utilities/Head'

import { styled } from '@mui/system'

const YEN_MARK = '\xA5'

type GiftListProps = {
  items: Array<ProductWithHandlerAndStatus & { onTap: () => void }>
  handleNextButtonClick: () => void
  howManyInCart?: number
  form?: FormStateWithSetter
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

const MobileScene = styled(Stack)({
  '& button': {
    width: '100%',
    borderRadius: '10px',
    filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15))',
  },
  '& .MuiFormControl-root': {
    boxShadow: '0px 0px 10px rgb(0 0 0 / 15%)',
    borderRadius: '10px',
    color: '#FE8B7B',
  },
  '& label': {
    color: '#B0B0B0',
  },
  '& .MuiSelect-select': {
    color: '#4A4A4A',
    fontWeight: 700,
    fontFamily: 'Noto Sans JP',
    fontSize: 14,
    paddingLeft: 48,
    lineHeight: 2,
  },
  '& svg': {
    left: 13,
    color: 'black',
    transform: 'rotate(0)',
  },
  '& fieldset': {
    border: 0,
  },
})

const GiftListWrap = styled(Stack)((props) => ({
  maxWidth: '1100px',
  width: '90%',
  margin: '60px auto',
  [props.theme.breakpoints.down(1000)]: {
    marginTop: '40px',
  },
}))

const GiftListTitle = styled(Typography)({
  marginTop: '40px',
  fontFamily: 'Outfit',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '30px',
  letterSpacing: '0.05em',
  textAlign: 'left',
  color: '#4A4A4A',
})

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
  textAlign: 'center',
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
  [props.theme.breakpoints.down(1000)]: {
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
  [props.theme.breakpoints.down(1000)]: {
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

const MenuProps = {
  PaperProps: {
    style: {
      display: 'none',
    },
  },
}

export const GiftList = ({
  items,
  handleNextButtonClick,
  howManyInCart = 0,
  form,
}: GiftListProps) => {
  const { sceneid } = useParams<{ sceneid: string }>()
  const config = SCENE_CONFIG_LIST.find((item) => item.id === sceneid)
  const giftScene = !!config ? config.title : 'すべてのギフト'
  const metaTag = !!config ? config.metaTag : SCENE_CONFIG_LIST[0].metaTag
  const navigate = useNavigate()
  const [sceneopen, setSceneOpen] = useState(false)
  const [priceopen, setPriceOpen] = useState(false)
  const [pricelaptopopen, setPriceLaptopOpen] = useState(false)

  const handleSceneOpen = () => setSceneOpen(true)
  const handleSceneClose = () => setSceneOpen(false)

  const handlePriceOpen = () => setPriceOpen(true)
  const handlePriceClose = () => setPriceOpen(false)

  const handlePriceLaptopClose = () => setPriceLaptopOpen(false)

  const checkSidebar = (item: string) => {
    if (!!form) {
      return item === giftScene
    }
  }

  useEffect(() => {
    if (items.length !== 0) {
      window.scrollTo(0, 0)
    }
  }, [items.map((item) => item.sys.id).toString()])

  return (
    <Box>
      <Head title={metaTag.title} description={metaTag.description} />

      <MenuAppBar giftBoxButton={true} />

      {!!form && <Header scene={giftScene} />}

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
              <MobileScene display={{ md: 'none', xs: 'flex' }}>
                <FormControl fullWidth size="small">
                  <Select
                    displayEmpty
                    value={giftScene}
                    onOpen={handleSceneOpen}
                    MenuProps={MenuProps}
                    open={sceneopen}
                    IconComponent={SearchIcon}
                  >
                    {SCENE_CONFIG_LIST.map((item, index) => (
                      <MenuItem key={index} value={item.title}>
                        {item.title === 'すべてのギフト' && 'シーンは何ですか？'}
                        {item.title !== 'すべてのギフト' && `${item.title}（選択中）`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MobileScene>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack
                direction={{ md: 'row', xs: 'column' }}
                justifyContent="space-between"
              >
                <Stack direction="row" gap={2}>
                  <Box width={{ md: '140px', xs: '50%' }}>
                    <FilterMultiSelector
                      label="キーワード"
                      values={form.keywords.values}
                      options={form.keywords.options}
                      setValues={form.keywords.setValues}
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
              <Box mt={2}>
                <Grid container spacing={2}>
                  {items.map((item) => (
                    <Grid
                      key={item.title}
                      item
                      xs={6}
                      lg={4}
                      sx={{ paddingTop: '20px !important' }}
                    >
                      <ItemCard
                        img={item.productImageCloudinary[0].secure_url}
                        priceText={
                          !!item.productPrice
                            ? `${YEN_MARK}${item.productPrice.toLocaleString('en-US')}`
                            : 'price not set'
                        }
                        handleClick={item.onTap}
                        tags={item.tagsCollection ? item.tagsCollection.items : []}
                        keyMessage={item.keyMessage}
                        selectableStatus={item.selectableStatus}
                        outOfStock={item.stockOk === false} // when undefined (calulating stock is in progress), do not show out of stock ui
                      />
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
          <Box sx={style}>
            <Box
              component="img"
              src="/assets/cancel.svg"
              onClick={handleSceneClose}
              position="absolute"
              top={10}
              right={10}
            />
            <SidebarTitle>
              <Typography variant="h3" align="center">
                Find by Scene
              </Typography>
              <Typography align="center" mt={1}>
                シーン別に探す
              </Typography>
            </SidebarTitle>
            <LaptopScene mt={3}>
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
                    onClick={() => {
                      navigate(`/product/choose/${scene.id}`)
                      handleSceneClose()
                    }}
                  >
                    <img src={scene.iconBlackWhite} />
                    {scene.title}
                  </Button>
                )
              )}
            </LaptopScene>
          </Box>
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
