import { css } from "@linaria/core"

export const container = css`
	&[class*="DropZone"],
	& [class*="DropZone"] {
		flex: 1 1 auto;
		height: 100%;
		display: flex;
		flex-direction: inherit;
		align-items: stretch;
	}
`
