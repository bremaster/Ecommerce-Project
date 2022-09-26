import React from 'react'

import { Stack } from '@mui/material'

export const HeroCover: React.FC<{ isMobile: boolean }> = ({ isMobile = true }) => {
  const videoSrc = isMobile
    ? 'https://res.cloudinary.com/zeft/video/upload/v1659428113/zeft_landing/movie-480-480_c6qjkd.mp4'
    : 'https://res.cloudinary.com/zeft/video/upload/v1659428113/zeft_landing/movie-1920-1080_mc0kbr.mp4'

  return (
    <Stack alignItems="center" sx={{ overflow: 'hidden', width: '100%' }}>
      {/* Add key prop to rerender video */}
      <video
        loop
        muted
        autoPlay
        controls={false}
        playsInline={true}
        key={videoSrc}
        style={{ width: '100%' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </Stack>
  )
}
