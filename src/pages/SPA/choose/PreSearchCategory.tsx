import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FormStateWithSetter } from 'constants/searchForm'
import { styled } from '@mui/system'

import { Stack, Button } from '@mui/material'

import { PreSearchHeader, PreSearchFooter } from 'molecules'

const Mobilekeyword = styled(Stack)({
  display: 'block',
  overflow: 'auto',
  marginBottom: '100px',
  '& div': {
    overflow: 'hidden',
  },
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

// onboarding page
export const PreSearchCategory = ({
  form,
  step,
  maxStep,
}: {
  form?: FormStateWithSetter
  step: number
  maxStep: number
}) => {
  const navigate = useNavigate()
  const [tempCategory, setTempCategory] = useState(form?.category)

  const { sceneid } = useParams<{ sceneid: string }>()

  const values = tempCategory?.values ? tempCategory?.values : []

  const setValues = (value: string[] | null) => {
    if (tempCategory && value)
      setTempCategory({
        ...tempCategory,
        values: value,
      })
  }

  const fractionText = `${step}/${maxStep}`

  return (
    <>
      <PreSearchHeader
        title={`カテゴリーを選んでください（${fractionText}）`}
        subtitle="贈りたいカテゴリーの商品を見つけることが出来ます"
      />
      {form && (
        <Stack px={3}>
          <Mobilekeyword>
            {tempCategory?.options.map((name, index) => (
              <Worditem
                key={index}
                sx={
                  values.indexOf(name) > -1
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
      )}
      <PreSearchFooter
        leftFunction={() => navigate(`/product/choose/${sceneid ? sceneid : ''}`)}
        rightFunction={() => {
          form?.category.setValues(values)
          navigate(`/product/choose/${sceneid ? sceneid : ''}`)
        }}
      />
    </>
  )
}
