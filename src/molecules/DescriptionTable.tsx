import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

import { styled } from '@mui/system'

const Column1 = styled(TableCell)({
  minWidth: '120px',
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  color: '#4A4A4A',
  lineHeight: '19px',
  letterSpacing: '0.03em',
  whiteSpace: 'pre-line',
})

const Column2 = styled(TableCell)({
  fontFamily: "'Noto Sans JP'",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '19px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  whiteSpace: 'pre-line',
  padding: '1.5rem', // wider space between rows
})

export const DescriptionTable = ({
  table = [],
}: {
  table: { column1: string; column2: string }[]
}): JSX.Element => {
  return (
    <TableContainer sx={{ maxWidth: '800px', minWidth: '300px' }}>
      <Table sx={{ borderCollapse: 'initial' }}>
        <TableBody>
          {table.map(({ column1, column2 }, idx) => (
            <TableRow key={column1}>
              <Column1
                component="th"
                scope="row"
                sx={{ borderTop: idx === 0 ? '1px solid rgba(224, 224, 224, 1)' : 0 }}
              >
                {column1}
              </Column1>
              <Column2
                sx={{ borderTop: idx === 0 ? '1px solid rgba(224, 224, 224, 1)' : 0 }}
              >
                {column2}
              </Column2>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
