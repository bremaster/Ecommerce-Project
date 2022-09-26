import React from 'react'

const Section = ({ head = 'ギフト', children = <p>test test test</p>, ...rest }) => {
  return (
    <div {...rest}>
      <h2
        css={{
          fontSize: '1rem',
          fontWeight: 900,
          paddingBottom: '0.3rem',
          borderBottom: '1px solid grey',
        }}
      >
        {head}
      </h2>
      {children}
    </div>
  )
}

export default Section
