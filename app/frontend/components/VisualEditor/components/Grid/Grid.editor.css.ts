import { css } from "@linaria/core"

import { SLOT_MIN_EMPTY_HEIGHT } from "../../lib/slotEditor"

export const grid = css`
	width: 100%;
	position: relative;
	min-height: ${ SLOT_MIN_EMPTY_HEIGHT }px;
`
