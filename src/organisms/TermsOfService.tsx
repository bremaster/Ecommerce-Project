/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'

export const TermsOfService: React.FC = () => (
  <div
    css={{
      fontFamily: "'Noto Sans JP'",
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '19px',
      letterSpacing: '0.05em',
      '& > a': {
        textDecoration: 'underline',
        color: '#FE8B7B',
      },
    }}
  >
    <a href="/term" target="_blank">
      利用規約
    </a>
    および
    <a href="/privacy" target="_blank">
      プライバシーポリシー
    </a>
    をご確認・ご同意の上でお進みください。
  </div>
)
