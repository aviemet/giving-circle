import { css } from "@linaria/core"

import { vars } from "@/lib"

export const newCircleCard = css`
	border-style: dashed;
	cursor: pointer;
	min-height: 9rem;
	transition: background-color 150ms ease;

	${ vars.lightSelector } {
		&:hover {
			background-color: ${ vars.colors.gray[0] };
		}
	}

	${ vars.darkSelector } {
		&:hover {
			background-color: ${ vars.colors.gray[8] };
		}
	}
`
