import { css } from "@linaria/core"

import { vars } from "@/lib"

export const spinner = css`
	width: 2rem;
	height: 2rem;
	border: 2px solid ${ vars.colors.gray[3] };
	border-top: 2px solid ${ vars.colors.blue[6] };
	border-radius: 50%;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

export const container = css`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
`

export const text = css`
	margin-left: 0.75rem;
	color: ${ vars.colors.gray[7] };
	font-size: ${ vars.fontSizes.sm };
`
