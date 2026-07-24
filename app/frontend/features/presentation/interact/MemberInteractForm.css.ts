import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const root = css`
	max-width: 40rem;
	margin-inline: auto;
	padding: ${ vars.spacing.xl };
`
