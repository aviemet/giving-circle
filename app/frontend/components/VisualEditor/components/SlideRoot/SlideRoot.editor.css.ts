import { css } from "@linaria/core"

export const slideRoot = css`
	& > [class*="DropZone--isRootZone"] {
		height: 100%;
		min-height: 100%;
		width: 100%;
		display: flex;
		flex-direction: inherit;
		flex-wrap: inherit;
		justify-content: inherit;
		align-items: inherit;
		align-content: inherit;
		gap: inherit;
	}
`
