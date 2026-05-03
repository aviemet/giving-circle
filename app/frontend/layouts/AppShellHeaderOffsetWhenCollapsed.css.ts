import { css } from "@linaria/core"

import { theme } from "@/lib"

export const shellRootKeepsHeaderScrollSlot = css`
  --app-shell-header-offset: ${theme.other.header.height}px !important;
`
