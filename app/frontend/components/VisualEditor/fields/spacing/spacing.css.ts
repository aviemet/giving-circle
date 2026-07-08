import { css } from "@linaria/core"

export const spacingFieldRoot = css`
	--spacing-field-input-width: 5.5rem;

	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
`

export const spacingFieldUnitRow = css`
	display: flex;
	align-items: center;
	column-gap: 4px;
`

export const spacingFieldUnitSelect = css`
	width: var(--spacing-field-input-width);
	flex: 0 0 auto;
`

export const spacingFieldLabel = css`
	font-size: 0.75rem;
	line-height: var(--puck-field-line-height, 1.25);
`

export const spacingFieldSides = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 4px;
`

export const spacingFieldMiddleRow = css`
	display: flex;
	align-items: center;
	column-gap: 8px;
`

export const spacingFieldSide = css`
	display: flex;
	align-items: center;
	column-gap: 4px;
`

export const spacingFieldInput = css`
	width: var(--spacing-field-input-width);
	flex: 0 0 auto;

	& .mantine-NumberInput-root {
		width: 100%;
		min-width: 0;
	}
`
