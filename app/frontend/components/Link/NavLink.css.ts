import { css } from "@linaria/core"

export const root = css`
  &&&:where(:not([data-active], [aria-current='page'])):where(:hover, :active) {
    background-color: var(--mantine-primary-color-light);
    color: var(--mantine-primary-color-light-color);
  }
`

