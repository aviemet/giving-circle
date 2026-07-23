import { css } from "@linaria/core"

export const displayRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	width: 100%;
	min-width: 0;
`

export const displaySegmented = css`
	width: 100%;

	& .mantine-SegmentedControl-label {
		padding-inline: 0.2rem;
		font-size: 0.625rem;
		font-weight: 600;
	}
`
