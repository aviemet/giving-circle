import { css } from "@linaria/core"

export const sizingFieldRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
`

export const sizingFieldSection = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
`

export const dimensionRow = css`
	display: grid;
	grid-template-columns: 4.25rem minmax(0, 1fr) 3.75rem;
	column-gap: 4px;
	align-items: center;
`

export const dimensionRowLabel = css`
	font-size: var(--puck-font-size-xxs, 0.625rem);
	letter-spacing: 0.04em;
	text-transform: uppercase;
	opacity: 0.7;
	line-height: 1;
`

export const dimensionRowUnitOnly = css`
	display: grid;
	grid-template-columns: 4.25rem 3.75rem;
	column-gap: 4px;
	align-items: center;
`

export const fineTune = css`
	margin: 0;
	border: 1px solid var(--editor-input-border);
	border-radius: var(--puck-field-radius, 3px);
	background-color: color-mix(in oklch, var(--editor-input-bg) 88%, transparent);

	& > summary {
		display: flex;
		align-items: center;
		min-height: var(--puck-field-control-height, 28px);
		padding: 0 6px;
		font-size: var(--puck-field-font-size, 0.8125rem);
		line-height: var(--puck-field-line-height, 1.25);
		color: var(--editor-input-text);
		cursor: pointer;
		list-style: none;
		user-select: none;

		&::-webkit-details-marker {
			display: none;
		}

		&::before {
			content: "▸";
			display: inline-block;
			width: 0.75rem;
			margin-inline-end: 4px;
			font-size: 0.625rem;
			opacity: 0.7;
			transition: transform 120ms ease;
		}
	}

	&[open] > summary::before {
		transform: rotate(90deg);
	}
`

export const fineTunePanel = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	padding: 4px 6px 6px;
	border-top: 1px solid var(--editor-input-border);
`

export const fineTuneRow = css`
	display: grid;
	grid-template-columns: 4.25rem minmax(0, 1fr);
	column-gap: 4px;
	align-items: center;
`
