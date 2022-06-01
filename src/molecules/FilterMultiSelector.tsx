import React, { useState, Fragment } from 'react'

import {
  Box,
  Stack,
  Typography,
  OutlinedInput,
  MenuItem,
  FormControl,
  ListItemText,
  Checkbox,
  Modal,
  Menu,
  Fade,
  Button,
  InputLabel,
} from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import Select from '@mui/material/Select'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const MenuMobileProps = {
  PaperProps: {
    sx: {
      display: 'none',
    },
  },
}

type Props = {
  label: string
  values: string[]
  options: string[]
  setValues: (value: string[]) => void
  handlePriceLaptopClose: () => void
}

const useStyle = makeStyles((theme) =>
  createStyles({
    laptopstyle: {
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
        display: 'grid',
        gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
        paddingBottom: '70px',
        paddingTop: '20px',
        maxWidth: '390px',
        margin: '0 10px',
        '& span': {
          fontSize: '14px !important',
          overflow: 'hidden',
        },
      },
    },
    laptopbutton: {
      backgroundColor: '#FFF4F2',
      borderRadius: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 10px',
      height: '40px',
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
    },
    mobilebutton: {
      backgroundColor: '#FFF4F2',
      borderRadius: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 10px',
      height: '40px',
      width: '100%',
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
      [theme.breakpoints.down(1000)]: {
        display: 'flex',
      },
    },
    laptopwrap: {
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
      [theme.breakpoints.down(1000)]: {
        display: 'none',
      },
    },
    mobilewrap: {
      backgroundColor: '#FFF4F2',
      borderRadius: '10px',
      color: '#FE8B7B',
      display: 'none',
      '& .MuiSelect-select': {
        fontSize: '14px',
      },
      '& label': {
        color: '#FE8B7B',
      },
      '& div': {
        color: '#FE8B7B',
      },
      '& svg': {
        color: '#FE8B7B',
        fontSize: '18px',
      },
      '& fieldset': {
        border: 0,
      },
    },
    checkbox: {
      '& svg': {
        color: '#FE8B7B',
      },
    },
    title: {
      '& p': {
        fontFamily: 'Noto Sans JP',
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '10px',
        letterSpacing: '0.03em',
        color: '#CFCAC4',
      },
    },
    mobilekeyword: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      maxHeight: '330px',
      overflow: 'auto',
      marginTop: '20px',
      '& li': {
        paddingLeft: 0,
      },
      '& .MuiCheckbox-root': {
        paddingLeft: 0,
      },
      '& div': {
        overflow: 'hidden',
      },
    },
    mobilekeywordfooter: {
      width: '100%',
      borderTop: '1px solid #CFCAC4',
      paddingTop: '20px',
    },
    mobilecancel: {
      color: '#FE8B7B',
      fontFamily: 'Noto Sans JP',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '28px',
      letterSpacing: '0.03em',
      textAlign: 'center',
    },
    laptopkeywordfooter: {
      width: '90%',
      borderTop: '1px solid #CFCAC4',
      padding: '20px 0',
      bottom: 0,
    },
  })
)

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '90%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

// https://mui.com/material-ui/react-select/#checkmarks
export function FilterMultiSelector(props: Props): JSX.Element {
  const labelId = `${props.label}-label`

  const classes = useStyle()

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
      <FormControl fullWidth size="small" className={classes.laptopwrap}>
        <Button
          id="demo-customized-button"
          aria-controls={laptopopen ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={laptopopen ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={laptopopen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          className={classes.laptopbutton}
        >
          <Typography>
            {props.values.length > 0 ? props.values.join(', ') : 'キーワード'}
          </Typography>
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={laptopopen}
          onClose={handleLaptopClose}
          TransitionComponent={Fade}
          className={classes.laptopstyle}
        >
          {props.options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              onClick={() => {
                // TODO: Non-destructive method is better
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
              <Checkbox
                className={classes.checkbox}
                checked={props.values.indexOf(name) > -1}
              />
              {props.values.indexOf(name) > -1 ? (
                <ListItemText
                  primary={name.length > 5 ? name.slice(0, 5) : name}
                  sx={{ '& span': { color: '#FE8B7B' } }}
                />
              ) : (
                <ListItemText primary={name.length > 5 ? name.slice(0, 5) : name} />
              )}
            </MenuItem>
          ))}
          <Stack
            position="absolute"
            sx={{ width: '100%', bottom: 0 }}
            mt={2}
            alignItems="center"
          >
            <Box className={classes.laptopkeywordfooter}>
              <Typography
                className={classes.mobilecancel}
                onClick={() => {
                  props.setValues([])
                }}
              >
                リセットする
              </Typography>
            </Box>
          </Stack>
        </Menu>
      </FormControl>

      <FormControl fullWidth size="small" className={classes.mobilewrap}>
        {props.values.length === 0 && <InputLabel>キーワード</InputLabel>}
        <Select
          multiple
          labelId={labelId}
          id={'id-' + props.label}
          value={props.values}
          input={<OutlinedInput label="キーワード" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuMobileProps}
          onOpen={handleOpen}
          open={open}
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value="キーワード">
            <ListItemText primary="キーワード" />
          </MenuItem>
        </Select>
      </FormControl>

      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleOpen}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        className={classes.mobilebutton}
      >
        <Typography>
          {props.values.length > 0 ? props.values.join(', ') : 'キーワード'}
        </Typography>
      </Button>

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
            top={10}
            right={10}
          />
          <Stack className={classes.title}>
            <Typography align="center" mt={1}>
              キーワード
            </Typography>
          </Stack>
          <Stack className={classes.mobilekeyword}>
            {props.options.map((name) => (
              <MenuItem
                key={name}
                value={name}
                onClick={() => {
                  // TODO: Non-destructive method is better
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
                <Checkbox
                  className={classes.checkbox}
                  checked={props.values.indexOf(name) > -1}
                />
                {props.values.indexOf(name) > -1 ? (
                  <ListItemText
                    primary={name.length > 5 ? name.slice(0, 5) : name}
                    sx={{ '& span': { color: '#FE8B7B' } }}
                  />
                ) : (
                  <ListItemText primary={name.length > 5 ? name.slice(0, 5) : name} />
                )}
              </MenuItem>
            ))}
          </Stack>
          <Box className={classes.mobilekeywordfooter}>
            <Typography
              className={classes.mobilecancel}
              onClick={() => {
                props.setValues([])
              }}
            >
              リセットする
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  )
}
