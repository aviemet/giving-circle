import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const root = css`
	min-height: 100dvh;
	background-color: ${ vars.colors.dark[9] };
	color: ${ vars.colors.white };
`

export const titleSection = css`
	padding: ${ vars.spacing.lg } ${ vars.spacing.md } ${ vars.spacing.md };
	text-align: center;
`

export const title = css`
	margin: 0;
	font-size: 1.75rem;
	font-weight: 700;
	line-height: 1.2;
`

export const subtitle = css`
	margin-inline: auto;
	max-width: 28rem;
	font-size: ${ vars.fontSizes.sm };
	line-height: 1.45;
	color: ${ vars.colors.gray[3] };
`

export const toolbar = css`
	flex-wrap: wrap;
`

export const clear = css`
	border: 1px solid ${ vars.colors.green[6] };
	background: ${ vars.colors.green[7] };
	color: ${ vars.colors.white };
	font-size: ${ vars.fontSizes.xs };
	font-weight: 700;
	letter-spacing: 0.06em;
	text-transform: uppercase;

	&:disabled {
		opacity: 0.5;
	}
`

export const section = css`
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
`

export const sectionTitle = css`
	margin: 0;
	font-size: ${ vars.fontSizes.sm };
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	text-align: center;
`

export const orgs = css`
	max-width: 36rem;
	margin-inline: auto;
	width: 100%;

	& > *:nth-child(odd):last-child {
		grid-column: 1 / -1;
		justify-self: center;
		width: min(100%, calc(50% - ${ vars.spacing.sm } / 2));
	}
`

export const actions = css`
	position: sticky;
	bottom: 0;
	z-index: 2;
	padding: ${ vars.spacing.md };
	padding-bottom: calc(${ vars.spacing.md } + env(safe-area-inset-bottom, 0px));
	background-color: ${ vars.colors.dark[9] };
	border-top: 1px solid ${ vars.colors.dark[4] };
`

export const amountInput = css`
	max-width: 36rem;
	width: 100%;
	margin-inline: auto;

	& .mantine-NumberInput-input {
		background-color: ${ vars.colors.white };
		color: ${ vars.colors.dark[9] };
		min-height: 3rem;
		font-size: 1.1rem;
	}
`

export const submit = css`
	max-width: 36rem;
	width: 100%;
	margin-inline: auto;
	min-height: 3.25rem;
	font-weight: 700;
	letter-spacing: 0.04em;
	text-transform: uppercase;
`

export const interactionName = css`
	text-align: center;
	font-size: ${ vars.fontSizes.xs };
	color: ${ vars.colors.dark[2] };
`

export const thanks = css`
	align-items: center;
	justify-content: center;
	min-height: 100dvh;
	padding: ${ vars.spacing.xl };
	text-align: center;
`
