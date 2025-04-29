import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const breadcrumbs = css`
	ol li {
		display: inline-block;
	}
`

export const separator = css`
	display: inline-block;
	margin-left: ${ vars.spacing.sm };
	margin-right: ${ vars.spacing.sm };
`
