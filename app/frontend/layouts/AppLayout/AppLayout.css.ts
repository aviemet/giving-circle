import { css } from "@linaria/core"

export const appLayout = css`
`

export const main = css`
  &.paddingDisabled {
    padding-inline-start: 0 !important;
    padding-inline-end: 0 !important;
    padding-top: calc(var(--app-shell-header-offset, 0rem) + var(--app-shell-padding) - 12px);
    padding-bottom: calc(var(--app-shell-footer-offset, 0rem) + var(--app-shell-padding) - 12px);
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

  [data-accordion][data-variant="separated"] > * {
    overflow: hidden;
  }

  html[data-mantine-color-scheme="light"] & [data-accordion][data-variant="separated"] > * {
    background-color: var(--mantine-color-primary-3);
    border-color: transparent;
  }

  html[data-mantine-color-scheme="light"] & [data-accordion][data-variant="separated"] > *[data-active] {
    background-color: var(--mantine-color-primary-3);
    border-color: transparent;
  }

  html[data-mantine-color-scheme="dark"] & [data-accordion][data-variant="separated"] > * {
    background-color: var(--mantine-color-primary-8);
    border-color: transparent;
  }

  html[data-mantine-color-scheme="dark"] & [data-accordion][data-variant="separated"] > *[data-active] {
    background-color: var(--mantine-color-primary-8);
    border-color: transparent;
  }
`
