import { Box } from '@mui/material'
import { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/system'

export const VariationText = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})((props: BoxProps & { isActive?: boolean; width?: string }) => ({
  borderRadius: '10px',
  boxShadow: props.isActive ? '0 0 0 2px #FE8B7B' : '0 0 0 1px #E5E5E5',
  color: '#4A4A4A',
  fontFamily: 'Noto Sans JP',
  fontSize: '12px',
  fontWeight: 400,
  padding: '24px 32px 24px 10px',
  lineHeight: 'normal',
  letterSpacing: '0.03rem',
  width: !!props.width ? props.width : 'fit-content',
}))
