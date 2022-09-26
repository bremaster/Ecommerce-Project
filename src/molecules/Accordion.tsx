import React from 'react'

import { styled } from '@mui/material/styles'
import MuiAccordion, {
  AccordionProps as MuiAccordionProps,
} from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps as MuiAccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'

import { COLOR } from 'theme'

export const Accordion = styled((props: MuiAccordionProps) => (
  <MuiAccordion square disableGutters elevation={0} {...props} />
))({
  borderTop: `1px solid ${COLOR.gray500}`,
  borderBottom: `1px solid ${COLOR.gray500}`,
  '&:not(:last-child)': {
    // only works if multiple Accordions are surrounded by parent component
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  background: 'transparent',
})

export const AccordionSummary = styled((props: MuiAccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<Arrow />} {...props} />
))({
  padding: '0 3px 0 0', // add subtle padding for Arrow Button
  '& .MuiAccordionSummary-content': {
    marginTop: 'calc(18px * 1.5)',
    marginBottom: 'calc(18px * 1.5)',
  },
})

export const AccordionDetails = styled(MuiAccordionDetails)({
  padding: '0 0 16px 0',
})

const Arrow = () => (
  <ArrowForwardIosSharpIcon
    strokeWidth="3px"
    stroke="#4a4a4a"
    sx={{
      fontSize: '16px',
      transform: 'rotate(90deg)',
    }}
  />
)
