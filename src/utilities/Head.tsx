import React, { FC } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export type Props = {
  description?: string
  title?: string
}

export const Head: FC<Props> = ({
  description = 'Zeft. Your Gift Partner',
  title = 'ZEFT',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

export { HelmetProvider as HeadContextProvider }
