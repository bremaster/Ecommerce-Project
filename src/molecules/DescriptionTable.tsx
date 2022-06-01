import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

const useStyles = makeStyles({
  table: {
    // minWidth: 300,
    maxWidth: 600,
    '& tbody': {
      borderTop: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  column1: {
    fontSize: '12px',
    fontWeight: 700,
    whiteSpace: 'pre-line',
  },
  column2: {
    fontSize: '12px',
    fontWeight: 400,
    whiteSpace: 'pre-line',
    lineHeight: 'normal',
  },
})

export const DescriptionTable = ({
  table = [],
}: {
  table: { column1: string; column2: string }[]
}): JSX.Element => {
  const classes = useStyles()

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableBody>
          {table.map(({ column1, column2 }) => (
            <TableRow key={column1}>
              <TableCell component="th" scope="row" className={classes.column1}>
                {column1}
              </TableCell>
              <TableCell className={classes.column2}>{column2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
