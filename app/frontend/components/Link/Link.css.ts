import { css } from "@linaria/core"

export const external = css`
	display: inline-block;

	.react-icon.external {
		display: inline-block;
		vertical-align: text-top;
	}
	
	&[disabled], &[data-disabled] {
		pointer-events: none;
	}
`

export const link = css`
	cursor: pointer;
`

export const navLinkInactiveHover = css`
	&&&:where(:not([data-active], [aria-current='page'])):where(:hover, :active) {
		background-color: var(--mantine-primary-color-light);
		color: var(--mantine-primary-color-light-color);
	}
`
