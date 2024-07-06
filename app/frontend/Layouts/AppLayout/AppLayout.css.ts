import { vars, theme } from '@/lib'
import { css } from '@linaria/core'
import { rem } from '@mantine/core'

export const appLayout = css`
`

export const main = css`
  padding-top: calc(${rem(theme.other.header.height)} + ${vars.spacing.md});
`
