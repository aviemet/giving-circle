import { css } from "@linaria/core"

export const grid = css`
	width: 100%;
	align-self: stretch;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(var(--grid-cols, 3), minmax(0, 1fr));
	gap: var(--grid-gap, 16px);
	align-items: var(--grid-align-items, stretch);

	& > * {
		min-width: 0;
	}

	&[data-center-last-row="true"] {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		grid-template-columns: none;

		& > *:not([data-iterate-hint]) {
			box-sizing: border-box;
			flex: 0 1 auto;
			width: var(--grid-item-basis);
			max-width: var(--grid-item-basis);
			min-width: 0;
		}
	}
`

export const iterateCell = css`
	display: flex;
	flex-direction: column;
	min-width: 0;
	min-height: 0;
`
