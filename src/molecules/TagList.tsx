import React from 'react'
import { Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Tag } from 'atoms/Tag'

const useStyles = makeStyles(() =>
  createStyles({
    taglist: {
      paddingTop: '12px',
    },
    tag: {
      paddingRight: '4px',
      paddingBottom: '4px',
    },
  })
)

interface Props {
  /** tag list. ex.['aaa' ,'bb', 'asdf'] */
  tags: string[]
}

const defaultProps: Props = {
  tags: ['菓子', 'しじみ', 'ゴリラゴリラ'],
}

const TagList: React.FC<Props> = (props) => {
  const { tags } = props
  const classes = useStyles()

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="left"
      flexWrap="wrap"
      className={classes.taglist}
    >
      {tags.map((t) => (
        <Box className={classes.tag} key={t}>
          <Tag>{t}</Tag>
        </Box>
      ))}
    </Box>
  )
}

TagList.defaultProps = defaultProps

export { TagList }
