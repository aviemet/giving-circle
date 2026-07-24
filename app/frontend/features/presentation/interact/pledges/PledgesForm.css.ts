import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const root = css`
	display: flex;
	flex-direction: column;
	min-height: 100dvh;
	background-color: ${ vars.colors.dark[9] };
	color: ${ vars.colors.white };
`

export const header = css`
	padding: ${ vars.spacing.lg } ${ vars.spacing.md } ${ vars.spacing.md };
	text-align: center;
`

export const title = css`
	margin: 0 0 ${ vars.spacing.sm };
	font-size: 1.75rem;
	font-weight: 700;
	line-height: 1.2;
`

export const subtitle = css`
	margin: 0 auto ${ vars.spacing.md };
	max-width: 28rem;
	font-size: ${ vars.fontSizes.sm };
	line-height: 1.45;
	color: ${ vars.colors.gray[3] };
`

export const toolbar = css`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${ vars.spacing.md };
	flex-wrap: wrap;
`

export const clear = css`
	padding: ${ vars.spacing.xs } ${ vars.spacing.sm };
	border: 1px solid ${ vars.colors.green[6] };
	border-radius: ${ vars.radius.sm };
	background: ${ vars.colors.green[7] };
	color: ${ vars.colors.white };
	font-size: ${ vars.fontSizes.xs };
	font-weight: 700;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`

export const section = css`
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
`

export const sectionTitle = css`
	margin: 0 0 ${ vars.spacing.sm };
	font-size: ${ vars.fontSizes.sm };
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	text-align: center;
`

export const grid = css`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${ vars.spacing.sm };
	max-width: 36rem;
	margin-inline: auto;

	& > *:nth-child(odd):last-child {
		grid-column: 1 / -1;
		justify-self: center;
		width: min(100%, calc(50% - ${ vars.spacing.sm } / 2));
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
	background-color: ${ vars.colors.dark[9] };
	border-top: 1px solid ${ vars.colors.dark[4] };
`

export const amountInput = css`
	max-width: 36rem;
	width: 100%;
	margin-inline: auto;

	:global(.mantine-NumberInput-input) {
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
	margin: 0;
	text-align: center;
	font-size: ${ vars.fontSizes.xs };
	color: ${ vars.colors.dark[2] };
`

export const thanks = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: ${ vars.spacing.md };
	min-height: 100dvh;
	padding: ${ vars.spacing.xl };
	text-align: center;
`
