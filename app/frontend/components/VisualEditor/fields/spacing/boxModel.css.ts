import { css } from "@linaria/core"

export const boxModelRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	min-width: 0;
`

export const boxModelUnitRow = css`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	column-gap: 4px;
`

export const boxModelUnitLabel = css`
	font-size: var(--puck-field-prop-label-font-size, 0.6875rem);
	font-weight: var(--puck-field-prop-label-font-weight, 600);
	letter-spacing: 0.01em;
	text-transform: none;
	color: var(--puck-field-prop-label-color, #d97706);
`

export const boxModelUnitSelect = css`
	width: 4.5rem;
`

export const boxModelMargin = css`
	--box-model-margin-fill: color-mix(in oklch, #f59e0b 18%, transparent);
	--box-model-margin-edge: color-mix(in oklch, #f59e0b 45%, transparent);
	--box-model-padding-fill: color-mix(in oklch, #34d399 16%, transparent);
	--box-model-padding-edge: color-mix(in oklch, #34d399 42%, transparent);
	--box-model-content-fill: color-mix(in oklch, #60a5fa 14%, transparent);
	--box-model-content-edge: color-mix(in oklch, #60a5fa 38%, transparent);

	position: relative;
	display: grid;
	grid-template-columns: 2.5rem minmax(0, 1fr) 2.5rem;
	grid-template-rows: 1.5rem minmax(4.75rem, auto) 1.5rem;
	align-items: center;
	justify-items: center;
	gap: 0;
	min-width: 0;
	padding: 0 0.25rem 0.35rem;
	box-sizing: border-box;
	border: 1px solid var(--box-model-margin-edge);
	border-radius: 2px;
	background-color: var(--box-model-margin-fill);
`

export const boxModelPadding = css`
	grid-column: 2;
	grid-row: 2;
	position: relative;
	display: grid;
	grid-template-columns: 2.25rem minmax(0, 1fr) 2.25rem;
	grid-template-rows: 1.375rem minmax(1.75rem, auto) 1.375rem;
	align-items: center;
	justify-items: center;
	gap: 0;
	width: 100%;
	min-width: 0;
	padding: 0 0.2rem 0.25rem;
	box-sizing: border-box;
	border: 1px solid var(--box-model-padding-edge);
	border-radius: 2px;
	background-color: var(--box-model-padding-fill);
`

export const boxModelCore = css`
	grid-column: 2;
	grid-row: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 1.75rem;
	padding: 0.35rem 0.25rem;
	box-sizing: border-box;
	border: 1px solid var(--box-model-content-edge);
	border-radius: 2px;
	background-color: var(--box-model-content-fill);
	font-size: 0.625rem;
	font-weight: 600;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: var(--puck-color-text-subtle);
	user-select: none;
`

export const boxModelRegionLabel = css`
	position: absolute;
	top: 2px;
	left: 4px;
	z-index: 1;
	margin: 0;
	font-size: 0.5625rem;
	font-weight: 700;
	line-height: 1;
	letter-spacing: 0.02em;
	text-transform: lowercase;
	color: var(--puck-color-text-muted);
	pointer-events: none;
	user-select: none;
`

export const boxModelSideInput = css`
	width: 100%;
	min-width: 0;
	max-width: 2.75rem;

	& .mantine-NumberInput-root,
	& .mantine-NumberInput-wrapper {
		width: 100%;
		min-width: 0;
		border: none;
		background: transparent;
		box-shadow: none;
	}

	& .mantine-NumberInput-input,
	& .mantine-NumberInput-root input {
		height: 1.25rem;
		min-height: 1.25rem;
		padding: 0 2px;
		text-align: center;
		font-size: 0.6875rem;
		line-height: 1;
		border: 1px solid transparent;
		border-radius: 2px;
		background-color: transparent;
		box-shadow: none;
		color: var(--puck-color-text);
	}

	& .mantine-NumberInput-input:hover,
	& .mantine-NumberInput-root input:hover {
		background-color: color-mix(in oklch, var(--puck-field-color-bg, var(--editor-input-bg)) 55%, transparent);
		border-color: color-mix(in oklch, var(--puck-field-color-border, var(--editor-input-border)) 70%, transparent);
	}

	& .mantine-NumberInput-input:focus,
	& .mantine-NumberInput-root input:focus {
		outline: none;
		background-color: var(--puck-field-color-bg, var(--editor-input-bg));
		border-color: var(--puck-field-color-border-focus, var(--puck-color-focus-ring));
		box-shadow: var(--puck-field-focus-ring, 0 0 0 2px color-mix(in oklch, var(--puck-color-focus-ring) 25%, transparent));
	}
`

export const boxModelTop = css`
	grid-column: 2;
	grid-row: 1;
`

export const boxModelLeft = css`
	grid-column: 1;
	grid-row: 2;
`

export const boxModelRight = css`
	grid-column: 3;
	grid-row: 2;
`

export const boxModelBottom = css`
	grid-column: 2;
	grid-row: 3;
`
