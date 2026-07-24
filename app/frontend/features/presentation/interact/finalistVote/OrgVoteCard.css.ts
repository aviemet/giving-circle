import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const card = css`
	display: flex;
	flex-direction: column;
	gap: ${ vars.spacing.sm };
	padding: ${ vars.spacing.md };
	border-radius: ${ vars.radius.md };
	border: 1px solid rgba(255, 255, 255, 0.85);
	background-color: var(--mantine-primary-color-filled, #2f9e44);
	color: ${ vars.colors.white };
	min-height: 9.5rem;
`

export const header = css`
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	gap: ${ vars.spacing.xs };
`

export const iconButton = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2.75rem;
	height: 2.75rem;
	padding: 0;
	border: 0;
	border-radius: ${ vars.radius.sm };
	background: transparent;
	color: inherit;
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${ vars.colors.white };
		outline-offset: 2px;
	}
`

export const amount = css`
	font-size: 1.75rem;
	font-weight: 700;
	line-height: 1.1;
	text-align: center;
`

export const orgName = css`
	margin-top: auto;
	font-size: ${ vars.fontSizes.sm };
	font-weight: 600;
	text-align: center;
	line-height: 1.3;
`

export const slider = css`
	padding-inline: ${ vars.spacing.xxs };

	:global(.mantine-Slider-track) {
		background-color: rgba(255, 255, 255, 0.35);
	}

	:global(.mantine-Slider-bar) {
		background-color: ${ vars.colors.white };
	}

	:global(.mantine-Slider-thumb) {
		border-color: ${ vars.colors.white };
		background-color: ${ vars.colors.white };
		width: 1.25rem;
		height: 1.25rem;
	}
`

export const numberInput = css`
	:global(.mantine-NumberInput-input) {
		background-color: rgba(0, 0, 0, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
		color: ${ vars.colors.white };
		text-align: center;
		font-size: 1.25rem;
		font-weight: 700;
		min-height: 2.75rem;
	}
`
