import { css } from "@linaria/core"

export const spacingFieldRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
`

export const spacingFieldUnitRow = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	column-gap: 0.375rem;
`

export const spacingFieldUnitLabel = css`
	font-size: var(--puck-font-size-xxs, 0.625rem);
	letter-spacing: 0.04em;
	text-transform: uppercase;
	opacity: 0.7;
	line-height: 1;
`

export const spacingFieldUnitSelect = css`
	width: 4.25rem;
`

export const spacingFieldRow = css`
	display: flex;
	justify-content: center;
`

export const spacingFieldGrid = css`
	display: grid;
	grid-template-columns: auto minmax(0, 1fr) auto;
	align-items: center;
	column-gap: 0.5rem;
`

export const spacingFieldSide = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 0.125rem;
`

export const spacingFieldSideLabel = css`
	font-size: var(--puck-font-size-xxs, 0.625rem);
	letter-spacing: 0.04em;
	text-transform: uppercase;
	opacity: 0.7;
	line-height: 1;
`

export const spacingFieldControl = css`
	width: 5.75rem;
`

export const spacingFieldBox = css`
	width: 100%;
	border-top: 1px dashed var(--puck-color-grey-08, rgba(255, 255, 255, 0.15));
`
