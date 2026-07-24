import { css } from "@linaria/core"

export const root = css`
	width: fit-content;
`

export const row = css`
	width: fit-content;

	:global(.mantine-Switch-body) {
		width: fit-content;
	}

	:global(.mantine-Switch-labelWrapper) {
		width: auto;
		flex: 0 1 auto;
	}
`
