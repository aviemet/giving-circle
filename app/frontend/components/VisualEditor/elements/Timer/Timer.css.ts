import { css } from "@linaria/core"

export const host = css`
	width: 100%;
	height: 100%;
	min-height: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const digital = css`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	font-weight: 700;
	line-height: 1;
	letter-spacing: -0.02em;
	text-align: center;
`

export const circleWrap = css`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: min(70vmin, 100%);
	aspect-ratio: 1;
`

export const circleSvg = css`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	transform: rotate(-90deg);
`

export const circleLabel = css`
	position: relative;
	z-index: 1;
	font-weight: 700;
	line-height: 1;
	letter-spacing: -0.02em;
	text-align: center;
`

export const flipWrap = css`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`

export const sevenSegmentWrap = css`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.12em;
	width: 100%;
	height: 100%;
	line-height: 1;
`
