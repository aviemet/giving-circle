import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const card = css`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 4.5rem;
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
	border: 1px solid ${ vars.colors.white };
	border-radius: ${ vars.radius.sm };
	background-color: ${ vars.colors.dark[6] };
	color: ${ vars.colors.white };
	cursor: pointer;
	text-align: center;

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: 2px solid ${ vars.colors.white };
		outline-offset: 2px;
	}
`

export const selected = css`
	background-color: ${ vars.colors.dark[4] };
	box-shadow: inset 0 0 0 2px ${ vars.colors.green[5] };
`

export const funded = css`
	background-color: ${ vars.colors.green[8] };
`

export const star = css`
	position: absolute;
	top: ${ vars.spacing.xs };
	right: ${ vars.spacing.xs };
	font-size: 1.1rem;
	line-height: 1;
`

export const name = css`
	font-size: ${ vars.fontSizes.sm };
	font-weight: 700;
	letter-spacing: 0.04em;
	text-transform: uppercase;
`
