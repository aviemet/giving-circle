import { css } from "@linaria/core"

import { SLOT_MIN_EMPTY_HEIGHT } from "../../lib/slotEditor"

export const container = css`
	min-height: ${ SLOT_MIN_EMPTY_HEIGHT }px;

	&[class*="DropZone"] {
		display: flex;
		flex-direction: inherit;
		align-items: stretch;
		min-height: inherit;
	}
`
