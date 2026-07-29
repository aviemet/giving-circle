import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const root = css`
	min-height: 100dvh;
	background-color: ${ vars.colors.dark[8] };
	color: ${ vars.colors.white };
`

export const rootStack = css`
	min-height: 100dvh;
`

export const titleSection = css`
	padding: ${ vars.spacing.md } ${ vars.spacing.md } ${ vars.spacing.sm };
	text-align: center;
`

export const title = css`
	margin: 0;
	font-size: 1.5rem;
	font-weight: 700;
	line-height: 1.2;
`

export const orgs = css`
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
	padding-bottom: 11rem;
	max-width: 40rem;
	margin-inline: auto;
	width: 100%;
`

export const actions = css`
	position: sticky;
	bottom: 0;
	z-index: 2;
	padding: ${ vars.spacing.md };
	padding-bottom: calc(${ vars.spacing.md } + env(safe-area-inset-bottom, 0px));
	background-color: ${ vars.colors.dark[8] };
	border-top: 1px solid ${ vars.colors.dark[4] };
`

export const fundsLeft = css`
	margin: 0;
	text-align: center;
	font-size: ${ vars.fontSizes.sm };
	font-weight: 700;
	letter-spacing: 0.04em;
	text-transform: uppercase;
`

export const checkbox = css`
	justify-content: center;

	:global(.mantine-Checkbox-label) {
		color: ${ vars.colors.gray[2] };
		font-size: ${ vars.fontSizes.sm };
	}

	:global(.mantine-Checkbox-input) {
		min-width: 1.25rem;
		min-height: 1.25rem;
	}
`

export const submit = css`
	min-height: 3rem;
	font-weight: 700;
	letter-spacing: 0.03em;
	text-transform: uppercase;
`
