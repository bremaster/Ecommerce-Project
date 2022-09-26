import React from 'react'
import { Box } from '@mui/material'
import { Tag } from 'atoms/Tag'

interface Props {
  /** tag list. ex.['aaa' ,'bb', 'asdf'] */
  tags: string[]
}

const defaultProps: Props = {
  tags: ['菓子', 'しじみ', 'ゴリラゴリラ'],
}

const TagList: React.FC<Props> = (props) => {
  const { tags } = props

  return (
    <Box display="flex" flexDirection="row" alignItems="left" flexWrap="wrap" pt={1.5}>
      {tags.map((t) => (
        <Box py={0.5} key={t}>
          <Tag>{t}</Tag>
        </Box>
      ))}
    </Box>
  )
}

TagList.defaultProps = defaultProps

export { TagList }
