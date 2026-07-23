import { css } from "@linaria/core"

export const iconSegmented = css`
	width: 100%;
	height: var(--puck-field-control-height, 28px);

	& .mantine-SegmentedControl-control {
		flex: 1 1 0;
	}

	& .mantine-SegmentedControl-label {
		width: 100%;
		padding-inline: 0.25rem;
		padding-block: 0;
		line-height: 1;
	}

	& .mantine-SegmentedControl-innerLabel {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	& .mantine-SegmentedControl-label svg {
		display: block;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}
`
