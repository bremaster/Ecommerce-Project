import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { styled } from '@mui/system'

const Column1 = styled(TableCell)({
  minWidth: '120px',
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  color: '#FE8B7B',
  lineHeight: '19px',
  letterSpacing: '0.03em',
  whiteSpace: 'pre-line',
  background:
    'linear-gradient(102.49deg, #FFF3E9 -18.78%, #FFECDD -12.51%, #FFEAE7 56.55%, #EBE6FF 166.15%)',
  borderBottom: 0,
})

const Column2 = styled(TableCell)({
  fontFamily: 'Noto Sans JP',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '19px',
  letterSpacing: '0.03em',
  color: '#4A4A4A',
  whiteSpace: 'pre-line',
  padding: '1.5rem', // wider space between rows
  borderBottom: 0,
})

export const DescriptionGradientTable = ({
  table = [],
}: {
  table: { column1: string; column2: string }[]
}): JSX.Element => {
  return (
    <TableContainer
      sx={{
        maxWidth: '800px',
        minWidth: '300px',
        borderRadius: '10px',
        border: '1px solid rgba(254, 139, 123, 0.2)',
      }}
    >
      <Table sx={{ borderCollapse: 'initial' }}>
        <TableBody>
          {table.map(({ column1, column2 }, idx) => (
            <TableRow key={column1}>
              <Column1
                component="th"
                scope="row"
                sx={{ borderTop: idx !== 0 ? '1px solid rgba(254, 139, 123, 0.2)' : 0 }}
              >
                {column1}
              </Column1>
              <Column2
                sx={{ borderTop: idx !== 0 ? '1px solid rgba(254, 139, 123, 0.2)' : 0 }}
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
