import { css } from "@linaria/core"

export const host = css`
	width: 100%;
	height: 100%;
	min-height: 0;
`

export const root = css`
	display: flex;
	flex-direction: column;
	gap: clamp(0.5rem, 1vh, 1rem);
	width: 100%;
	height: 100%;
	min-height: 0;
	box-sizing: border-box;
	align-self: stretch;
	flex: 1 1 auto;
`

export const title = css`
	flex: 0 0 auto;
	text-align: center;
	font-size: clamp(1.5rem, 2.5vw, 2.75rem);
	font-weight: 700;
	line-height: 1.1;
`

export const chart = css`
	flex: 1 1 auto;
	min-height: 0;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: auto minmax(0, 1fr);
	grid-template-rows: minmax(0, 2.4fr) minmax(11vh, 1fr);
	column-gap: clamp(0.75rem, 1.5vw, 1.5rem);
	row-gap: 0;
`

export const axis = css`
	grid-column: 1;
	grid-row: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	padding-right: 0.25rem;
	font-size: clamp(1.15rem, 1.85vw, 1.75rem);
	font-weight: 600;
	line-height: 1;
	user-select: none;
`

export const plot = css`
	grid-column: 2;
	grid-row: 1;
	position: relative;
	min-width: 0;
	min-height: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	border-bottom: 2px solid currentColor;
`

export const gridLines = css`
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	pointer-events: none;
`

export const gridLine = css`
	width: 100%;
	border-top: 1px dotted currentColor;
	opacity: 0.45;
`

export const barsRow = css`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: stretch;
	justify-content: space-between;
	gap: clamp(0.35rem, 1vw, 1rem);
	width: 100%;
	height: 100%;
	min-height: 0;
`

export const barColumn = css`
	flex: 1 1 0;
	min-width: 0;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
`

export const barStack = css`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
`

export const award = css`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, -40%);
	width: clamp(3.5rem, 5.5vw, 5.5rem);
	height: clamp(3.5rem, 5.5vw, 5.5rem);
	object-fit: contain;
	z-index: 2;
	pointer-events: none;
`

export const bar = css`
	position: relative;
	width: clamp(3.25rem, 6.5vw, 7.5rem);
	max-width: 82%;
	min-height: 0.35rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: height 0.45s ease, background-color 0.6s ease;
`

export const barValue = css`
	position: relative;
	z-index: 1;
	font-size: clamp(1.15rem, 2.4vw, 2.5rem);
	font-weight: 700;
	text-align: center;
	line-height: 1.05;
	padding: 0.4rem 0.25rem;
	word-break: break-word;
`

export const labels = css`
	grid-column: 2;
	grid-row: 2;
	min-height: 0;
	display: flex;
	align-items: stretch;
	justify-content: space-between;
	gap: clamp(0.35rem, 1vw, 1rem);
	width: 100%;
	padding-top: clamp(0.9rem, 1.8vh, 1.5rem);
	box-sizing: border-box;
`

export const labelColumn = css`
	flex: 1 1 0;
	min-width: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: clamp(0.3rem, 0.8vh, 0.55rem);
	text-align: center;
`

export const orgName = css`
	font-size: clamp(1.05rem, 1.85vw, 1.7rem);
	font-weight: 700;
	line-height: 1.15;
	max-width: 100%;
`

export const needLine = css`
	font-size: clamp(0.95rem, 1.5vw, 1.4rem);
	font-weight: 600;
	line-height: 1.15;
`
