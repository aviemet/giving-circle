import { css } from "@linaria/core"

import { SLOT_MIN_EMPTY_HEIGHT } from "../../lib/slotEditor"

export const iterateSlot = css`
	flex: 1 1 auto;
	width: 100%;
	min-width: 0;
	min-height: ${ SLOT_MIN_EMPTY_HEIGHT }px;
`

export const hint = css`
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 7;
	font-size: 0.75rem;
	opacity: 0.7;
	pointer-events: none;
`
