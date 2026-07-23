import { css } from "@linaria/core"

export const imageFieldRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	position: relative;
	min-width: 0;
`

export const imageRow = css`
	display: grid;
	grid-template-columns: var(--puck-field-control-height, 28px) minmax(0, 1fr) var(--puck-field-control-height, 28px);
	align-items: stretch;
	column-gap: var(--puck-space-2, 4px);
	width: 100%;
`

export const imageRowEmpty = css`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	width: 100%;
`

export const thumb = css`
	width: var(--puck-field-control-height, 28px);
	height: var(--puck-field-control-height, 28px);
	min-height: var(--puck-field-control-height, 28px);
	border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	border-radius: var(--puck-field-radius, 3px);
	background-color: var(--puck-field-color-bg, var(--editor-input-bg));
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`

export const uploadButton = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: var(--puck-space-1, 2px);
	width: 100%;
	height: var(--puck-field-control-height, 28px);
	min-height: var(--puck-field-control-height, 28px);
	margin: 0;
	padding: 0 var(--puck-space-2, 6px);
	border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	border-radius: var(--puck-field-radius, 3px);
	background-color: var(--puck-field-color-bg, var(--editor-input-bg));
	color: var(--puck-field-color-text, var(--editor-input-text));
	font-size: var(--puck-font-size-xxs, 11px);
	cursor: pointer;
	box-shadow: var(--puck-field-control-shadow, 0 1px 2px rgba(0, 0, 0, 0.22));

	& svg {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}

	&:hover:not(:disabled) {
		background-color: var(--puck-color-interactive-soft-hover);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`

export const iconButton = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: var(--puck-field-control-height, 28px);
	height: var(--puck-field-control-height, 28px);
	min-height: var(--puck-field-control-height, 28px);
	margin: 0;
	padding: 0;
	border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	border-radius: var(--puck-field-radius, 3px);
	background-color: var(--puck-field-color-bg, var(--editor-input-bg));
	color: var(--puck-field-color-text, var(--editor-input-text));
	cursor: pointer;
	box-shadow: var(--puck-field-control-shadow, 0 1px 2px rgba(0, 0, 0, 0.22));

	& svg {
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

export const fileInput = css`
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
