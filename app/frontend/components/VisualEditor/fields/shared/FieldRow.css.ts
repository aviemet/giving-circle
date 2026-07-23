import { css } from "@linaria/core"

export const fieldRow = css`
	display: grid;
	grid-template-columns: 4.5rem minmax(0, 1fr);
	align-items: center;
	column-gap: var(--puck-space-4, 8px);
	min-height: var(--puck-field-control-height, 28px);
	width: 100%;
	min-width: 0;
	position: relative;
`

export const fieldRowLabel = css`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 0;
	padding: 0;
	min-width: 0;
	min-height: var(--puck-field-control-height, 28px);
	font-size: var(--puck-field-prop-label-font-size, 0.6875rem);
	font-weight: var(--puck-field-prop-label-font-weight, 600);
	line-height: 1;
	letter-spacing: 0.01em;
	text-transform: none;
	text-align: start;
	color: var(--puck-field-prop-label-color, #d97706);
`

export const fieldRowLabelTarget = css`
	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	width: auto;
	max-width: 100%;
	line-height: 1;
	cursor: help;
	border-bottom: 1px dotted color-mix(in oklch, currentColor 55%, transparent);
`

export const fieldRowControl = css`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	min-width: 0;
	width: 100%;
	min-height: var(--puck-field-control-height, 28px);
	gap: var(--puck-space-2, 4px);

	& > *:not(input[type="file"]) {
		flex: 1 1 auto;
		width: 100%;
		min-width: 0;
		max-width: 100%;
	}

	& > input[type="file"] {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
		pointer-events: none;
	}
`
