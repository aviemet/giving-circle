import { css } from "@linaria/core"

export const host = css`
	width: 100%;
	min-height: 0;
`

export const root = css`
	position: relative;
	display: flex;
	align-items: stretch;
	width: 100%;
	height: 100%;
	min-height: 0;
	overflow: hidden;
`

export const track = css`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
`

export const remaining = css`
	position: absolute;
	inset: 0 auto 0 0;
	height: 100%;
`

export const label = css`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	font-weight: 700;
	line-height: 1;
	pointer-events: none;
`
