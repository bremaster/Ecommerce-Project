import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from 'molecules'
import { Typography } from '@mui/material'

import { styled } from '@mui/system'

const AccordionContant = styled(Typography)({
  whiteSpace: 'pre-line',
  boxSizing: 'border-box',
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '180%',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
})

const Header = styled(Typography)({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '100%',
  color: '#4A4A4A',
})

const HeaderBody = styled(AccordionSummary)({
  '& .MuiAccordionSummary-content': {
    marginTop: 20,
    marginBottom: 20,
  },
  '& svg': {
    width: 13,
  },
})

type Props = {
  column1: string
  column2: string
  defaultExpanded?: boolean
}

const AdditionalInfoItem: React.FC<Props> = ({
  column1,
  column2,
  defaultExpanded = false,
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <HeaderBody>
        <Header>{column1}</Header>
      </HeaderBody>
      <AccordionDetails>
        <AccordionContant>{column2}</AccordionContant>
      </AccordionDetails>
    </Accordion>
  )
}

export default AdditionalInfoItem
