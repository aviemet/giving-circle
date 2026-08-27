import { css } from "@linaria/core"

export const opened = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--mantine-color-text);

	& .mantine-Burger-burger {
		display: none;
	}
`
