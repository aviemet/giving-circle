import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const root = css`
	display: flex;
	flex-direction: column;
	min-height: 100dvh;
	background-color: ${ vars.colors.dark[8] };
	color: ${ vars.colors.white };
`

export const header = css`
	padding: ${ vars.spacing.md } ${ vars.spacing.md } ${ vars.spacing.sm };
	text-align: center;
`

export const title = css`
	margin: 0;
	font-size: 1.5rem;
	font-weight: 700;
	line-height: 1.2;
`

export const grid = css`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${ vars.spacing.md };
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
	padding-bottom: 11rem;

	@media (min-width: 640px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		max-width: 40rem;
		margin-inline: auto;
		width: 100%;
	}
`

export const footer = css`
	position: sticky;
	bottom: 0;
	z-index: 2;
	display: flex;
	flex-direction: column;
	gap: ${ vars.spacing.sm };
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
