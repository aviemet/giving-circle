import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const column = css`
	min-width: 0;
`

export const elementControls = css`
	padding: ${ vars.spacing.xs };
	border: 1px solid ${ vars.colors.gray[3] };
	border-radius: ${ vars.radius.md };
`

export const elementControlPanel = css`
	padding-top: ${ vars.spacing.xs };
	border-top: 1px solid ${ vars.colors.gray[2] };

	&:first-child {
		padding-top: 0;
		border-top: none;
	}
`
