import { vars, theme } from '@/lib'
import { css } from '@linaria/core'

export const appLayout = css`
`

export const main = css`
  padding-top: calc(${theme.other.header.height}px);

  &.paddingDisabled {
    --app-shell-padding: 0;
  }
`

export const circleMenuGroup = css`
  width: 100%;
`

export const circleMenuButton = css`
  flex: 1;
  
  span {
    justify-content: start;

    .mantine-Button-label {
      flex: 1;
    }
  }
`

export const navMenu = css`
  .mantine-Accordion-content {
    padding: 0;

    .mantine-NavLink-root .mantine-NavLink-body {
      padding-left: 0.8rem;
    }
  }
`
