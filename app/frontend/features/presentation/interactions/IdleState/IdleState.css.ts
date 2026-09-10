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
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	max-width: 40rem;
	margin-inline: auto;
	padding-block: clamp(1.25rem, 3vw, 2.75rem);
	padding-inline: clamp(1rem, 4vw, 3rem);
	gap: ${ vars.spacing.sm };
`
