import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const buttonCard = css`
	cursor: pointer;
	width: 100%;
	min-width: 0;
	position: relative;
	z-index: 0;
	transform: scale(1);
	box-shadow: ${ vars.shadows.xs };
	transition:
		transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
		box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);

	&:hover {
		z-index: 1;
		transform: scale(1.01);
		box-shadow: ${ vars.shadows.sm };
	}

	&.active,
	&.active:hover {
		z-index: 2;
		transform: translateY(-0.125rem) scale(1.07);
		box-shadow: ${ vars.shadows.lg };
	}
`
