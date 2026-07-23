import { css } from "@linaria/core"

export const fontFieldRow = css`
	display: grid;
	grid-template-columns: minmax(0, 1fr) var(--puck-field-control-height, 28px);
	align-items: stretch;
	column-gap: var(--puck-space-3, 6px);
	width: 100%;
	min-width: 0;
	position: relative;
`

export const fontUploadButton = css`
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
	color: var(--puck-field-color-text, var(--editor-input-text));
	cursor: pointer;

	& svg {
		display: block;
		width: 1rem;
		height: 1rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--puck-color-interactive-soft-hover);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`

export const fontFileInput = css`
	position: absolute;
	width: 1px !important;
	max-width: 1px;
	height: 1px !important;
	max-height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
	pointer-events: none;
`
