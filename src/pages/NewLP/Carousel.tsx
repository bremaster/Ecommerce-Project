import React from 'react'

import { Box, Stack } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      marginBottom: '200px',
      [theme.breakpoints.down(1000)]: {
        marginTop: '200px',
      },
    },
    carouselItem: {
      width: '246px !important',
      height: '178px',
      padding: '0 12px',
      overflow: 'hidden',
      '& div': {
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        display: 'flex !important',
        alignItems: 'center',
        overflow: 'hidden',
      },
      '& img': {
        width: '100%',
        height: 'fit-content'
      },
      [theme.breakpoints.down(1000)]: {
        width: '166px !important',
        height: '118px',
      }
    }
  })
)

export const Carousel = () => {
  const classes = useStyles()

  const settings = {
    className: "slider variable-width",
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    variableWidth: true,
    autoplaySpeed: 2000,
    speedplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box className={classes.wrapper}>
      <Slider {...settings}>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_0.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_1.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_2.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_3.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_4.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_5.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_6.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_7.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_8.jpg"
            />
          </Stack>
        </Box>
        <Box className={classes.carouselItem}>
          <Stack direction="row">
            <Box
              component="img"
              src="/landing/item_list/img_9.jpg"
            />
          </Stack>
        </Box>
      </Slider>
    </Box>
  )
}
