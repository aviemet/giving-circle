import { css } from "@linaria/core"

export const flowRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	width: 100%;
`

export const wrapSegmented = css`
	width: 100%;

	& .mantine-SegmentedControl-label {
		padding-inline: 0.25rem;
	}

	& .mantine-SegmentedControl-label svg {
		display: block;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}
`
