import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const table = css`
	td.active {
		background-color: ${ vars.colors.orange[5] };
	}
`
