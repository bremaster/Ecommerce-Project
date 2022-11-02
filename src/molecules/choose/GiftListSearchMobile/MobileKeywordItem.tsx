import React from 'react'

import { Stack, Button } from '@mui/material'

import { styled } from '@mui/system'

const Mobilekeyword = styled(Stack)({
  display: 'block',
  maxHeight: '330px',
  overflow: 'auto',
  marginTop: '27px',
  marginBottom: '20px',
})

const Worditem = styled(Button)({
  fontFamily: 'Noto Sans JP',
  fontWeight: 700,
  letterSpacing: '0.03em',
  marginRight: '8px',
  marginBottom: '14px',
  padding: '6px 16px',
  height: '48px',
  fontSize: '15px',
  lineHeight: '18px',
  borderRadius: '30px',
  color: '#4A4A4A',
  border: '1px solid #F2F2F2',
})

export const MobileKeywordItem = ({
  values,
  options,
  setValues,
}: {
  values: string[]
  options: string[]
  setValues: (value: string[]) => void
}) => {
  return (
    <Stack direction="row" gap={2} overflow={'auto'}>
      <Mobilekeyword>
        {options.map((name, index) => (
          <Worditem
            key={index}
            sx={
              values?.indexOf(name) > -1
                ? {
                    background:
                      'linear-gradient(102.32deg, #FEAA69 -13.04%, #FF8B7B 51.48%, #927DED 153.9%)',
                    color: 'white',
                  }
                : {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                  }
            }
            onClick={() => {
              if (values) {
                const temp = Array.from(values)
                const flag = temp.indexOf(name)

                if (flag > -1) {
                  temp.splice(flag, 1)
                } else {
                  temp.push(name)
                }

                setValues(temp)
              }
            }}
          >
            {name}
          </Worditem>
        ))}
      </Mobilekeyword>
    </Stack>
  )
}
