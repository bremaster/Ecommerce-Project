import React, { Fragment } from 'react'

import { Button, Typography } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const YEN_MARK = '\xA5'

type Props = {
  showmodal: (val: boolean) => void
  priceopen: boolean
  minPrice: number | null
  maxPrice: number | null
}

const useStyle = makeStyles(() =>
  createStyles({
    laptopbutton: {
      backgroundColor: '#FFF4F2',
      borderRadius: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 10px',
      height: '40px',
      width: '140px',
      '& p': {
        color: '#FE8B7B',
        fontSize: '14px',
        lineHeight: '24px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      '& svg': {
        fontSize: '18px !important',
        color: '#FE8B7B',
      },
      '&:hover': {
        backgroundColor: '#FFF4F2',
      },
    },
  })
)

// https://mui.com/material-ui/react-select/#checkmarks
export function PriceLaptopFilter(props: Props): JSX.Element {
  const classes = useStyle()

  let text = '価格'

  if (props.minPrice || props.maxPrice) text = ''

  if (props.minPrice) {
    text += YEN_MARK + Number(props.minPrice).toLocaleString()
  }

  if (props.minPrice || props.maxPrice) text += ' ~ '

  if (props.maxPrice) {
    text += YEN_MARK + Number(props.maxPrice).toLocaleString()
  }

  return (
    <Fragment>
      <Button
        id="demo-customized-button"
        aria-controls={props.priceopen ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={props.priceopen ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={() => props.showmodal(!props.priceopen)}
        endIcon={props.priceopen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        className={classes.laptopbutton}
      >
        <Typography>{text}</Typography>
      </Button>
    </Fragment>
  )
}
