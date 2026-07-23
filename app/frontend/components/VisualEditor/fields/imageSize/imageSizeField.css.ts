import { css } from "@linaria/core"

export const imageSizeRoot = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
	width: 100%;
	min-width: 0;
`

export const dimensionControl = css`
	display: grid;
	grid-template-columns: minmax(0, 1fr) 3.75rem;
	column-gap: 4px;
	align-items: center;
	width: 100%;
	min-width: 0;
`

export const dimensionControlUnitOnly = css`
	display: grid;
	grid-template-columns: 3.75rem;
	justify-content: end;
	width: 100%;
	min-width: 0;
`
