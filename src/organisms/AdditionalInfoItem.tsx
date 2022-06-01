import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from 'molecules'
import { Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
  accordionContant: {
    whiteSpace: 'pre-line',
    boxSizing: 'border-box',
  },
})

type Props = {
  column1: string
  column2: string
}

const AdditionalInfoItem: React.FC<Props> = ({ column1, column2 }) => {
  const classes = useStyles()
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h6">{column1}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" className={classes.accordionContant}>
          {column2}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default AdditionalInfoItem
