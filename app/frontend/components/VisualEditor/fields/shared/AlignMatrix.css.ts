import { css } from "@linaria/core"

export const alignMatrixRoot = css`
	display: grid;
	grid-template-columns: auto minmax(0, 1fr);
	align-items: center;
	column-gap: var(--puck-space-2, 4px);
	width: 100%;
`

export const alignMatrixGrid = css`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	width: 42px;
	height: 42px;
	padding: 2px;
	border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	border-radius: var(--puck-field-radius, 3px);
	background-color: var(--puck-field-color-bg, var(--editor-input-bg));
	box-shadow: var(--puck-field-control-shadow, 0 1px 2px rgba(0, 0, 0, 0.22));
`

export const alignMatrixCellHost = css`
	display: flex;
	width: 100%;
	height: 100%;
	min-width: 0;
	min-height: 0;
`

export const alignMatrixCell = css`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	border: none;
	border-radius: 2px;
	background: transparent;
	cursor: pointer;
	color: var(--puck-color-text-subtle);

	&::before {
		content: "";
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: currentColor;
	}

	&[data-active="true"] {
		color: #ffffff;
		background-color: var(--puck-field-selected-bg, color-mix(in oklch, var(--mantine-color-blue-6) 42%, transparent));
	}

	&:hover {
		color: var(--puck-color-text);
		background-color: var(--puck-color-interactive-soft-hover);
	}
`

export const alignMatrixSelects = css`
	display: flex;
	flex-direction: column;
	gap: 2px;
	min-width: 0;
`

export const alignMatrixSelectRow = css`
	display: grid;
	grid-template-columns: 1rem minmax(0, 1fr);
	align-items: center;
	column-gap: 4px;
	min-width: 0;

	& .mantine-Select-root,
	& .mantine-Select-wrapper {
		min-width: 0;
	}
`

export const alignMatrixAxisLabel = css`
	font-size: var(--puck-field-prop-label-font-size, 0.625rem);
	font-weight: var(--puck-field-prop-label-font-weight, 600);
	line-height: 1;
	letter-spacing: 0.01em;
	text-transform: none;
	color: var(--puck-field-prop-label-color, #d97706);
`
