import { css } from "@linaria/core"

export const typographyStack = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	width: 100%;
`

export const typographyIcons = css`
	width: 100%;

	& .mantine-SegmentedControl-label svg {
		width: 0.95rem;
		height: 0.95rem;
	}
`

