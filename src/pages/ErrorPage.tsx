import React from 'react'
import { Layout } from 'templates/Layout'

type Props = {
  header?: string
  body?: string
}

export const ErrorPage = ({
  header = '404 | Not Found',
  body = 'URLにお間違いがないかご確認ください',
}: Props): JSX.Element => {
  return (
    <Layout>
      <h3 style={{ marginTop: '35vh' }}>{header}</h3>
      <p>{body}</p>
    </Layout>
  )
}
