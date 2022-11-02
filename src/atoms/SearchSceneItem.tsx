import { Button } from '@mui/material'

import { styled } from '@mui/system'

export const SearchSceneItem = styled(Button)((props: { selected: boolean }) => ({
  color: '#4A4A4A',
  flexDirection: 'column',
  fontWeight: props.selected ? 700 : 400,
  minWidth: 75,
  padding: 0,
  gap: 4,
  wordBreak: 'keep-all',
  '& div': {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 40,
    border: `1px solid ${props.selected ? '#4A4A4A' : '#E9E9E9'}`,
  },
  '& img': {
    width: 30,
  },
}))
