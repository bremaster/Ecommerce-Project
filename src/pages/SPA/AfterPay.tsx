import React from 'react'

import { GraphqlProvider } from '../../container/hooks'
import { AfterPayContainer } from '../../container/AfterPayContainer'

export const AfterPay: React.FC = () => {
  return (
    <GraphqlProvider>
      <AfterPayContainer />
    </GraphqlProvider>
  )
}
