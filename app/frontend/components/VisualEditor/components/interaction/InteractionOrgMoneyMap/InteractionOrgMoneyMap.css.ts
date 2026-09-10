import { css } from "@linaria/core"

export const root = css`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

export const label = css`
	font-weight: 600;
`

export const summary = css`
	color: var(--mantine-color-dimmed);
`

export const placeholder = css`
	border: 1px dashed var(--mantine-color-gray-4);
	border-radius: var(--mantine-radius-sm);
	padding: 1rem;
	color: var(--mantine-color-dimmed);
`
