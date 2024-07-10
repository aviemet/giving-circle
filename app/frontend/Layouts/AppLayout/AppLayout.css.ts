import { vars, theme, rem } from '@/lib'
import { css } from '@linaria/core'

export const appLayout = css`
`

export const main = css`
  padding-top: calc(${rem(theme.other.header.height)} + ${vars.spacing.md});
`
