import { vars } from '@/lib/theme'
import { css } from '@linaria/core'

export const breadcrumbs = css`
	ol li {
		display: inline-block;
	}
`

export const separator = css`
	display: inline-block;
	margin-left: ${vars.spacing.sm};
	margin-right: ${vars.spacing.sm};
`
