import React from 'react'
import { Chip } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles(() =>
  createStyles({
    tagStyle: {
      borderRadius: '10px',
      color: '#FE8B7B',
      height: '20px',
      fontWeight: 900,
      background:
        'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
      border: `1px solid  #FEA680`,
      boxSizing: 'border-box',
      fontSize: '0.625rem',
      '& .MuiChip-labelSmall': {
        letterSpacing: '0rem',
      },
    },
  })
)

export const Tag: React.FC<{ children: React.ReactNode }> = (props) => {
  const classes = useStyles()
  return <Chip size="small" className={classes.tagStyle} label={props.children} />
}
