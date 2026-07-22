import { css } from "@linaria/core"

import { theme } from "@/lib/theme"

export const shellRootKeepsHeaderScrollSlot = css`
  --app-shell-header-offset: ${ theme.other.header.height }px !important;
`

export const shellNavbar = css`
  box-shadow: ${ theme.shadows.xs };

  html[data-mantine-color-scheme="light"] & {
    background-color: var(--mantine-color-gray-1);
  }

  html[data-mantine-color-scheme="dark"] & {
    background-color: var(--mantine-color-dark-6);
  }
`
