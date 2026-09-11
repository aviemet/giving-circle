import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const slides = css`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
	gap: ${ vars.spacing.md };
	padding: ${ vars.spacing.xs };
	overflow: visible;
`
