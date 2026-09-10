import { css } from "@linaria/core"

export const memberRoot = css`
	display: flex;
	flex-direction: column;
	overflow: visible !important;
	height: auto !important;
	min-height: 100%;
`

export const editorHint = css`
	flex-shrink: 0;
	color: var(--mantine-color-dimmed);
	font-size: var(--mantine-font-size-sm);
`

export const runtimeTitle = css`
	flex-shrink: 0;
`
