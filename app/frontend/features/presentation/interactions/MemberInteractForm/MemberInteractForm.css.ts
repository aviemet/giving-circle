import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const page = css`
	box-sizing: border-box;
	min-height: 100dvh;
	width: 100%;
	display: flex;
	flex-direction: column;
`

export const shell = css`
	box-sizing: border-box;
	width: 100%;
	margin-inline: auto;
	margin-block: auto;
	padding-block: clamp(1.5rem, 4vw, 3rem);
	padding-inline: clamp(1.25rem, 5vw, 4rem);
	display: flex;
	flex-direction: column;
	gap: ${ vars.spacing.xl };
`

export const canvas = css`
	flex: 1;
	width: 100%;
	min-width: 0;
	display: flex;
	flex-direction: column;

	& > * {
		flex: 1;
		width: 100%;
		min-height: 100%;
	}
`

export const actions = css`
	box-sizing: border-box;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	gap: ${ vars.spacing.sm };
	padding-block: ${ vars.spacing.md };
	padding-inline: clamp(1.25rem, 5vw, 4rem);
	background-color: inherit;

	& > * {
		flex: 1 1 100%;
	}

	@media (min-width: 48em) {
		justify-content: flex-end;

		& > * {
			flex: 0 0 auto;
			min-width: 12rem;
		}
	}
`
