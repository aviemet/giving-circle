import { css } from "@linaria/core"

export const exhaustedRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	width: 100%;
	min-width: 0;
`

export const modeSegmented = css`
	width: 100%;

	& .mantine-SegmentedControl-label {
		padding-inline: 0.35rem;
		font-size: 0.6875rem;
		font-weight: 600;
	}
`
