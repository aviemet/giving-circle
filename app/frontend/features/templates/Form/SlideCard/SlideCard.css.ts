import { css } from "@linaria/core"

import { vars } from "@/lib"

export const slideCard = css`
	width: 12rem;
`

export const imageSection = css`
	img {
		transition: filter 0.5s ease-in-out;
	}

	.remove-input-button {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 100;
		opacity: 0;
		transition: opacity 0.25s ease-in-out;
	}

	&:hover {
		img {
			filter: saturate(25%);
		}

		.remove-input-button {
			opacity: 1;
		}
	}

`
