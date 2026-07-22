import { css } from "@linaria/core"

import { theme } from "@/lib/theme"

export const presentationLayout = css`
`

export const main = css`
  padding-top: calc(${ theme.other.header.height }px);

  &.paddingDisabled {
    --app-shell-padding: 0;
  }
`
