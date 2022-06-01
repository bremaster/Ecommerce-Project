import React from 'react'
import { ProductContainer } from '../../container/ProductContainer'
import { GraphqlProvider } from '../../container/hooks'

// move to container conponent

export const Product: React.FC = () => (
  <GraphqlProvider>
    <ProductContainer />
  </GraphqlProvider>
)
