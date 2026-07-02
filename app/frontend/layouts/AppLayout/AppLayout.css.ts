import { css } from "@linaria/core"

import { vars } from "@/lib"

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

  ${ vars.lightSelector } & [data-accordion][data-variant="separated"] > * {
    background-color: var(--mantine-color-gray-0);
    border: 1px solid var(--mantine-color-gray-3);
  }

  ${ vars.darkSelector } & [data-accordion][data-variant="separated"] > * {
    background-color: var(--mantine-color-dark-7);
    border: 1px solid var(--mantine-color-dark-4);
  }

  ${ vars.lightSelector } & [data-accordion][data-variant="separated"] .mantine-NavLink-root:where(:not([data-active], [aria-current="page"])):where(:hover, :active) {
    background-color: var(--mantine-color-gray-2);
    color: var(--mantine-color-text);
  }

  ${ vars.darkSelector } & [data-accordion][data-variant="separated"] .mantine-NavLink-root:where(:not([data-active], [aria-current="page"])):where(:hover, :active) {
    background-color: var(--mantine-color-dark-5);
    color: var(--mantine-color-text);
  }
`
