import { css } from "@linaria/core"

export const slideRoot = css`
	& [class*="DropZone--isRootZone"] {
		height: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: inherit;
		align-items: stretch;
	}
`
