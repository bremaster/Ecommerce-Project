import React, { Fragment } from 'react'

import { MenuItem, FormControl } from '@mui/material'

import Select from '@mui/material/Select'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const YEN_MARK = '\xA5'

const MenuProps = {
  PaperProps: {
    style: {
      display: 'none',
    },
  },
}

type Props = {
  showmodal: () => void
  priceopen: boolean
  minPrice: number | null
  maxPrice: number | null
}

const useStyle = makeStyles((theme) =>
  createStyles({
    mobilewrap: {
      backgroundColor: '#FFF4F2',
      borderRadius: '10px',
      color: '#FE8B7B',
      height: '40px',
      '& label': {
        color: '#FE8B7B',
      },
      '& div': {
        color: '#FE8B7B',
        fontSize: '14px',
      },
      '& svg': {
        color: '#FE8B7B',
        fontSize: '18px',
      },
      '& fieldset': {
        border: 0,
      },
      [theme.breakpoints.down(1000)]: {
        display: 'flex',
      },
    },
    checkbox: {
      '& svg': {
        color: '#FE8B7B',
      },
    },
  })
)

// https://mui.com/material-ui/react-select/#checkmarks
export function PriceFilter(props: Props): JSX.Element {
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
      <FormControl fullWidth size="small" className={classes.mobilewrap}>
        <Select
          displayEmpty
          value="1"
          onOpen={props.showmodal}
          open={props.priceopen}
          MenuProps={MenuProps}
          IconComponent={props.priceopen ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
        >
          <MenuItem value="1">{text}</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  )
}
