import React, { Fragment } from 'react'

import { MenuItem, FormControl } from '@mui/material'

import Select from '@mui/material/Select'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { styled } from '@mui/system'

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

const MobileWrap = styled(FormControl)((props) => ({
  backgroundColor: '#FFF4F2',
  borderRadius: '10px',
  color: '#FE8B7B',
  '& label': {
    color: '#FE8B7B',
  },
  '& div': {
    color: '#FE8B7B',
    fontSize: '14px',
    lineHeight: 2,
  },
  '& svg': {
    color: '#FE8B7B',
    fontSize: '18px',
  },
  '& fieldset': {
    border: 0,
  },
  [props.theme.breakpoints.down(1000)]: {
    display: 'flex',
  },
}))

// https://mui.com/material-ui/react-select/#checkmarks
export function PriceFilter(props: Props): JSX.Element {
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
      <MobileWrap fullWidth size="small">
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
      </MobileWrap>
    </Fragment>
  )
}
