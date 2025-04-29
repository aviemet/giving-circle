import { css } from "@linaria/core"

import { vars } from "@/lib"

export const cardContainer = css`
flex-wrap: wrap;
justify-content: 'center';

	&[data-child-flex] > * {
		flex: var(--child-flex)
	}	
`
