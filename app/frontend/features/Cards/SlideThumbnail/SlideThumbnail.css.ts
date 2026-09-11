import { css } from "@linaria/core"

export const thumbnail = css`
	display: block;
	width: 100%;
	aspect-ratio: 4/3;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`
