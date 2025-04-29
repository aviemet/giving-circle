import { vars } from '@/lib'
import { css } from '@linaria/core'

export const cardContainer = css`
flex-wrap: wrap;
justify-content: 'center';

	&[data-child-flex] > * {
		flex: var(--child-flex)
	}	
`
