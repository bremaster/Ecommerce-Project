import React, { useState } from 'react'
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

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { ItemCard, MenuAppBar } from 'organisms'

import {
  FilterMultiSelector,
  TestSelector,
  PriceFilter,
  PageIndicator,
  PriceLaptopFilter,
} from 'molecules'

import Header from 'molecules/choose/Header'

import { ProductWithHandlerAndStatus } from 'constants/index'
import { FormStateWithSetter } from 'constants/searchForm'

const YEN_MARK = '\xA5'

type GiftListProps = {
  items: Array<ProductWithHandlerAndStatus & { onTap: () => void }>
  handleNextButtonClick: () => void
  howManyInCart?: number
  form?: FormStateWithSetter
}

const useGiftListStyle = makeStyles((theme) =>
  createStyles({
    sidebarTitle: {
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
    },
    laptopscene: {
      '& img': {
        width: '20px',
      },
      '& button': {
        display: 'flex',
        justifyContent: 'start',
        gap: '10px',
        height: '48px',
        borderRadius: '10px',
        fontSize: '15px',
        padding: '20px',
        '&:focus': {
          outline: 0,
        },
      },
    },
    selected: {
      color: '#FE8B7B',
      background:
        'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
    },
    btn: {
      color: '#4A4A4A',
    },
    mobilescene: {
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
      '& div': {
        color: '#B0B0B0',
      },
      '& svg': {
        color: '#FE8B7B',
        fontSize: '18px',
      },
      '& fieldset': {
        border: 0,
      },
    },
    giftListWrap: {
      maxWidth: '1100px',
      width: '90%',
      margin: '60px auto',
      [theme.breakpoints.down(1000)]: {
        marginTop: '40px',
      },
    },
    giftListTitle: {
      marginTop: '40px',
      fontFamily: 'Outfit',
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '30px',
      letterSpacing: '0.05em',
      textAlign: 'left',
      color: '#4A4A4A',
    },
    submitLaptopButton: {
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
      [theme.breakpoints.down(1600)]: {
        right: '20px',
      },
      [theme.breakpoints.down(1500)]: {
        display: 'none',
      },
    },
    submitMobileButton: {
      position: 'fixed',
      bottom: '0',
      display: 'none',
      width: '100%',
      backgroundColor: 'white',
      borderTop: '1px solid #DDDDDD',
      '& button': {
        width: '90%',
        left: '5%',
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
        margin: '16px 0',
      },
      [theme.breakpoints.down(1500)]: {
        display: 'block',
      },
    },
    pricemodal: {
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
    },
    pricestyle: {
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
      [theme.breakpoints.down(1000)]: {
        top: '50%',
        left: '50%',
        maxWidth: '500px',
      },
    },
    pricelaptopstyle: {
      position: 'absolute',
      maxWidth: '350px',
      zIndex: 1,
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '24px',
      marginTop: '20px',
      boxShadow:
        '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);',
      [theme.breakpoints.down(1000)]: {
        top: '50%',
        left: '50%',
        maxWidth: '500px',
      },
    },
    priceTitle: {
      '& p': {
        fontFamily: 'Noto Sans JP',
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '10px',
        letterSpacing: '0.03em',
        color: '#CFCAC4',
      },
    },
  })
)

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

const scenelist = ['全てのギフト', '結婚祝い', '出産祝い', '結婚内祝い', '出産内祝い']

export const GiftList = ({
  items,
  handleNextButtonClick,
  howManyInCart = 0,
  form,
}: GiftListProps) => {
  const classes = useGiftListStyle()
  const [sceneopen, setSceneOpen] = useState(false)
  const [priceopen, setPriceOpen] = useState(false)
  const [pricelaptopopen, setPriceLaptopOpen] = useState(false)

  const handleSceneOpen = () => setSceneOpen(true)
  const handleSceneClose = () => setSceneOpen(false)

  const handlePriceOpen = () => setPriceOpen(true)
  const handlePriceClose = () => setPriceOpen(false)

  const handlePriceLaptopClose = () => setPriceLaptopOpen(false)

  const setScene = (item: string) => {
    if (!!form) {
      if (item === '全てのギフト') {
        form.scene.setValue('すべてのギフト')
      } else {
        form.scene.setValue(item)
      }
    }
  }

  const checkSidebar = (item: string) => {
    if (!!form) {
      if (item === '全てのギフト') {
        return (
          'すべてのギフト' === form.scene.value || '全てのギフト' === form.scene.value
        )
      } else {
        return item === form.scene.value
      }
    }
  }

  return (
    <Box>
      <MenuAppBar />
      {!!form && <Header scene={form.scene.value} />}

      {!!form && (
        <Box className={classes.giftListWrap}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Stack
                display={{ md: 'flex', xs: 'none' }}
                className={classes.sidebarTitle}
              >
                <Typography variant="h3">Find by Scene</Typography>
                <Typography>シーン別に探す</Typography>
              </Stack>
              <Stack
                mt={5}
                display={{ md: 'flex', xs: 'none' }}
                className={classes.laptopscene}
              >
                {scenelist.map((item, index) =>
                  checkSidebar(item) ? (
                    <Button className={classes.selected} key={index}>
                      {index == 1 ? (
                        <img src={`/gift_icon/sicon2.png`} />
                      ) : (
                        <img src={`/gift_icon/sicon${index + 1}.svg`} />
                      )}
                      {item}
                    </Button>
                  ) : (
                    <Button
                      className={classes.btn}
                      key={index}
                      onClick={() => setScene(item)}
                    >
                      {index == 1 ? (
                        <img src={`/gift_icon/icon2.png`} />
                      ) : (
                        <img src={`/gift_icon/icon${index + 1}.svg`} />
                      )}
                      {item}
                    </Button>
                  )
                )}
              </Stack>
              <Stack display={{ md: 'none', xs: 'flex' }} className={classes.mobilescene}>
                <FormControl fullWidth size="small">
                  <Select
                    displayEmpty
                    value={form.scene.value}
                    onOpen={handleSceneOpen}
                    MenuProps={MenuProps}
                    open={sceneopen}
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    {scenelist.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
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
                      <Box
                        className={classes.pricelaptopstyle}
                        display={{ md: 'block', xs: 'none' }}
                      >
                        <Box
                          component="img"
                          src="/assets/cancel.svg"
                          onClick={() => setPriceLaptopOpen(false)}
                          position="absolute"
                          top={10}
                          right={10}
                          sx={{ cursor: 'pointer' }}
                        />
                        <Stack className={classes.priceTitle}>
                          <Typography align="center" fontSize={13}>
                            価格
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          mt={2}
                          gap={1}
                          className={classes.pricemodal}
                          alignItems="end"
                          justifyContent="center"
                        >
                          <Stack width="140px">
                            <Typography variant="h3">最小価格</Typography>
                            <TestSelector
                              label=""
                              value={
                                form.minPrice.value === null ? '' : form.minPrice.value
                              }
                              options={form.minPrice.options}
                              onChange={(e) => {
                                const price = e.target.value
                                if (typeof price === 'string') {
                                  form.minPrice.setValue(parseInt(price, 10))
                                } else {
                                  form.minPrice.setValue(price)
                                }
                              }}
                            />
                          </Stack>
                          <Typography variant="h5">~</Typography>
                          <Stack width="140px">
                            <Typography variant="h3">最大価格</Typography>
                            <TestSelector
                              label=""
                              value={
                                form.maxPrice.value === null ? '' : form.maxPrice.value
                              }
                              options={form.maxPrice.options}
                              onChange={(e) => {
                                const price = e.target.value
                                if (typeof price === 'string') {
                                  form.maxPrice.setValue(parseInt(price, 10))
                                } else {
                                  form.maxPrice.setValue(price)
                                }
                              }}
                            />
                          </Stack>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </Stack>
                <Stack></Stack>
              </Stack>
              <Typography className={classes.giftListTitle}>人気ギフト一覧</Typography>
              <Box mt={2}>
                <Grid container spacing={2}>
                  {items.map((item) => (
                    <Grid key={item.title} item xs={6} lg={4}>
                      <ItemCard
                        img={item.productImageCloudinary[0].secure_url}
                        priceText={
                          !!item.productPrice
                            ? `${YEN_MARK}${item.productPrice.toLocaleString('en-US')}`
                            : 'price not set'
                        }
                        handleClick={item.onTap}
                        tags={item.tagsCollection ? item.tagsCollection.items : []}
                        brand={item.brand.brandName}
                        selectableStatus={item.selectableStatus}
                        outOfStock={item.stockOk === false}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box mt={2}>
                {form.page.max > 1 && (
                  <PageIndicator
                    current={form.page.current}
                    max={form.page.max}
                    onClickNumber={(page) => form.page.setValue(page)}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box padding="2rem" />
      {howManyInCart >= 1 && (
        <Button onClick={handleNextButtonClick} className={classes.submitLaptopButton}>
          <Stack alignItems="center">
            <img src="/gift.svg" />
            <Typography align="center" color="white" fontSize="15px" lineHeight="30px">
              ギフトを確認する
            </Typography>
            <Typography
              align="center"
              color="white"
              fontSize="15px"
              lineHeight="30px"
            >{`(${howManyInCart}/3)`}</Typography>
          </Stack>
        </Button>
      )}
      {howManyInCart >= 1 && (
        <Box className={classes.submitMobileButton}>
          <Button onClick={handleNextButtonClick}>
            <Stack direction="row" justifyContent="center">
              <img src="/gift.svg" />
              <Typography align="center" color="white" fontSize="15px" lineHeight="30px">
                ギフトを確認する {`${howManyInCart}/3`}
              </Typography>
            </Stack>
          </Button>
        </Box>
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
            <Stack className={classes.sidebarTitle}>
              <Typography variant="h3" align="center">
                Find by Scene
              </Typography>
              <Typography align="center" mt={1}>
                シーン別に探す
              </Typography>
            </Stack>
            <Stack mt={3} className={classes.laptopscene}>
              {scenelist.map((item, index) =>
                checkSidebar(item) ? (
                  <Button className={classes.selected} key={index}>
                    {index == 1 ? (
                      <img src={`/gift_icon/sicon2.png`} />
                    ) : (
                      <img src={`/gift_icon/sicon${index + 1}.svg`} />
                    )}
                    {item}
                  </Button>
                ) : (
                  <Button
                    className={classes.btn}
                    key={index}
                    onClick={() => form.scene.setValue(item)}
                  >
                    {index == 1 ? (
                      <img src={`/gift_icon/icon2.png`} />
                    ) : (
                      <img src={`/gift_icon/icon${index + 1}.svg`} />
                    )}
                    {item}
                  </Button>
                )
              )}
            </Stack>
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
          <Box className={classes.pricestyle}>
            <Box
              component="img"
              src="/assets/cancel.svg"
              onClick={handlePriceClose}
              position="absolute"
              top={10}
              right={10}
            />
            <Stack className={classes.priceTitle}>
              <Typography align="center" fontSize={13}>
                価格
              </Typography>
            </Stack>
            <Stack
              direction="row"
              mt={2}
              gap={1}
              className={classes.pricemodal}
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
                    if (typeof price === 'string') {
                      form.minPrice.setValue(parseInt(price, 10))
                    } else {
                      form.minPrice.setValue(price)
                    }
                  }}
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
                    if (typeof price === 'string') {
                      form.maxPrice.setValue(parseInt(price, 10))
                    } else {
                      form.maxPrice.setValue(price)
                    }
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Modal>
      )}
    </Box>
  )
}
