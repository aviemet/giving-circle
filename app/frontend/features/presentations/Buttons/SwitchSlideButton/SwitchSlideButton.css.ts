import { css } from "@linaria/core"

import { vars, theme } from "@/lib"

export const buttonCard = css`
	cursor: pointer;
	transition: transform 75ms ease-in;

	&.active {
		transform: scale(1.025);
	}
`
