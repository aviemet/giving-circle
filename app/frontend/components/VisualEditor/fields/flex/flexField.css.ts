import { css } from "@linaria/core"

export const flexFieldRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
`

export const flexDirectionGroup = css`
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	column-gap: var(--puck-space-4, 10px);
	width: 100%;
	min-width: 0;
`

export const flexWrapToggle = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: var(--puck-field-control-height, 28px);
	height: var(--puck-field-control-height, 28px);
	min-height: var(--puck-field-control-height, 28px);
	max-height: var(--puck-field-control-height, 28px);
	margin: 0;
	padding: 0;
	border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	border-radius: var(--puck-field-radius, 3px);
	background-color: var(--puck-field-color-bg, var(--editor-input-bg));
	color: var(--puck-color-text-muted);
	cursor: pointer;
	box-shadow: var(--puck-field-control-shadow, 0 1px 2px rgba(0, 0, 0, 0.22));

	& svg {
		display: block;
		width: 1rem;
		height: 1rem;
		transform: translateY(1px);
	}

	&[data-active="true"] {
		color: #ffffff;
		background-color: var(--puck-field-selected-bg, color-mix(in oklch, var(--mantine-color-blue-6) 42%, transparent));
		border-color: var(--puck-field-selected-border, color-mix(in oklch, var(--mantine-color-blue-5) 55%, transparent));
	}

	&:hover {
		color: var(--puck-field-color-text, var(--editor-input-text));
	}
`
