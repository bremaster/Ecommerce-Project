import React from 'react'

export const Logo: React.FC = () => (
  <img
    src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
    height="28px"
    width="80px"
    alt="zeft"
  />
)
