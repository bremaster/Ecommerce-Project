import React, { useState, Fragment } from 'react'

import {
  Box,
  Stack,
  Typography,
  FormControl,
  Modal,
  Menu,
  Fade,
  Button,
} from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { styled } from '@mui/system'

type Props = {
  values: string[]
  options: string[]
  setValues: (value: string[]) => void
  handlePriceLaptopClose: () => void
}

const Laptopstyle = styled(Menu)({
  maxHeight: 500,
  marginTop: '20px',
  '& .MuiPaper-root': {
    borderRadius: '10px',
  },
  '& li': {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiCheckbox-root': {
      paddingLeft: 0,
    },
  },
  '& ul': {
    maxWidth: '320px',
    padding: 0,
    '& span': {
      fontSize: '14px !important',
      overflow: 'hidden',
    },
  },
})

const Laptopbutton = styled(Button)({
  backgroundColor: '#FFF4F2',
  borderRadius: '10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 10px',
  height: '45px',
  '& p': {
    color: '#FE8B7B',
    fontSize: '14px',
    width: '95px',
    lineHeight: '24px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'left',
  },
  '& svg': {
    fontSize: '18px !important',
  },
  '&:hover': {
    backgroundColor: '#FFF4F2',
  },
})

const Mobilebutton = styled(Button)((props) => ({
  backgroundColor: '#FFF4F2',
  borderRadius: '10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 10px',
  height: '45px',
  width: '100%',
  fontWeight: 700,
  '& p': {
    color: '#FE8B7B',
    fontSize: '14px',
    width: '120px',
    lineHeight: '24px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'left',
  },
  '& svg': {
    fontSize: '18px !important',
    color: '#FE8B7B',
  },
  '&:hover': {
    backgroundColor: '#FFF4F2',
  },
  display: 'none',
  [props.theme.breakpoints.down(1000)]: {
    display: 'flex',
  },
}))

const Laptopwrap = styled(FormControl)((props) => ({
  backgroundColor: '#FFF4F2',
  borderRadius: '10px',
  color: '#FE8B7B',
  '& label': {
    color: '#FE8B7B',
  },
  '& div': {
    color: '#FE8B7B',
  },
  '& svg': {
    color: '#FE8B7B',
  },
  '& fieldset': {
    border: 0,
  },
  [props.theme.breakpoints.down(1000)]: {
    display: 'none',
  },
}))

const Title = styled(Stack)({
  marginTop: '8px',
  '& p': {
    fontFamily: 'Noto Sans JP',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '10px',
    letterSpacing: '0.03em',
    color: '#CFCAC4',
  },
})

const Mobilekeyword = styled(Stack)({
  display: 'block',
  maxHeight: '330px',
  overflow: 'auto',
  marginTop: '27px',
  marginBottom: '20px',
  '& div': {
    overflow: 'hidden',
  },
})

const Mobilekeywordfooter = styled(Box)({
  width: '100%',
  borderTop: '1px solid #CFCAC4',
  paddingTop: '12px',
})

const MobileCancel = styled(Box)({
  width: '100%',
  borderTop: '1px solid #CFCAC4',
  paddingTop: '12px',
})

const Worditem = styled(Button)({
  cursor: 'pointer',
  fontFamily: 'Noto Sans JP',
  fontWeight: 400,
  letterSpacing: '0.03em',
  marginRight: '8px',
  marginBottom: '8px',
  height: '29px',
  fontSize: '12px',
  lineHeight: '24px',
  borderRadius: '20px',
  border: '0.5px solid #CFCAC4',
  color: '#4A4A4A',
})

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '90%',
  maxWidth: '320px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 2,
}

// https://mui.com/material-ui/react-select/#checkmarks
export function FilterMultiSelector(props: Props): JSX.Element {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const laptopopen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    props.handlePriceLaptopClose()
    setAnchorEl(event.currentTarget)
  }
  const handleLaptopClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Laptopwrap fullWidth size="small">
        <Laptopbutton
          id="demo-customized-button"
          aria-controls={laptopopen ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={laptopopen ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={laptopopen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        >
          <Typography>
            {props.values.length > 0 ? props.values.join(', ') : 'カテゴリ'}
          </Typography>
        </Laptopbutton>
        <Laptopstyle
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={laptopopen}
          onClose={handleLaptopClose}
          TransitionComponent={Fade}
        >
          <Box p={2}>
            <Box
              component="img"
              src="/assets/cancel.svg"
              onClick={handleLaptopClose}
              position="absolute"
              top={10}
              right={10}
              sx={{
                cursor: 'pointer',
              }}
            />
            <Title>
              <Typography align="center">カテゴリ</Typography>
            </Title>
            <Mobilekeyword>
              {props.options.map((name, index) => (
                <Worditem
                  key={index}
                  sx={
                    props.values.indexOf(name) > -1
                      ? {
                          border: '0.5px solid #CFCAC4',
                          color: '#fff',
                          backgroundColor: '#FE8B7B',
                          '&:hover': {
                            backgroundColor: '#FE8B7B',
                          },
                        }
                      : {}
                  }
                  onClick={() => {
                    const temp = Array.from(props.values)
                    const flag = temp.indexOf(name)

                    if (flag > -1) {
                      temp.splice(flag, 1)
                    } else {
                      temp.push(name)
                    }

                    props.setValues(temp)
                  }}
                >
                  #{name}
                </Worditem>
              ))}
            </Mobilekeyword>
            <Mobilekeywordfooter>
              <MobileCancel
                onClick={() => {
                  props.setValues([])
                }}
              >
                リセットする
              </MobileCancel>
            </Mobilekeywordfooter>
          </Box>
        </Laptopstyle>
      </Laptopwrap>

      <Mobilebutton
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleOpen}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        <Typography>
          {props.values.length > 0 ? props.values.join(', ') : 'カテゴリ'}
        </Typography>
      </Mobilebutton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="img"
            src="/assets/cancel.svg"
            onClick={handleClose}
            position="absolute"
            top={25}
            right={25}
          />
          <Title>
            <Typography align="center">カテゴリ</Typography>
          </Title>
          <Mobilekeyword>
            {props.options.map((name, index) => (
              <Worditem
                key={index}
                sx={
                  props.values.indexOf(name) > -1
                    ? {
                        border: '0.5px solid #CFCAC4',
                        color: '#fff',
                        backgroundColor: '#FE8B7B',
                        '&:hover': {
                          backgroundColor: '#FE8B7B',
                        },
                      }
                    : {}
                }
                onClick={() => {
                  const temp = Array.from(props.values)
                  const flag = temp.indexOf(name)

                  if (flag > -1) {
                    temp.splice(flag, 1)
                  } else {
                    temp.push(name)
                  }

                  props.setValues(temp)
                }}
              >
                #{name}
              </Worditem>
            ))}
          </Mobilekeyword>
          <Mobilekeywordfooter>
            <MobileCancel
              onClick={() => {
                props.setValues([])
              }}
            >
              リセットする
            </MobileCancel>
          </Mobilekeywordfooter>
        </Box>
      </Modal>
    </Fragment>
  )
}
