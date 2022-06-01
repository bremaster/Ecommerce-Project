import React from 'react'
import { RecieverContainer } from '../../container/RecieverContainer'
import { GraphqlProvider } from '../../container/hooks'

// move to container conponent

export const Reciever: React.FC = () => (
  <GraphqlProvider>
    <RecieverContainer />
  </GraphqlProvider>
)
