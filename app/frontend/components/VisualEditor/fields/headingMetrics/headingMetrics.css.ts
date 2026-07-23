import { css } from "@linaria/core"

export const metricsRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	width: 100%;
`

export const levelSegmented = css`
	width: 100%;

	& .mantine-SegmentedControl-label {
		padding-inline: 0.2rem;
		font-size: 0.6875rem;
		font-weight: 600;
	}
`
