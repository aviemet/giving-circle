import { css } from "@linaria/core"

export const rootZoneContents = css`
	display: contents;
`

export const slideRoot = css`
	width: 100%;
	min-height: 100%;
	height: 100%;
	overflow: hidden;
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	background-color: var(--puck-slide-root-bg, transparent);
	display: flex;
	flex-direction: column;
	align-items: stretch;
`
