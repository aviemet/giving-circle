import { css } from "@linaria/core"

import { vars } from "@/lib"

export const tagInline = css`
	background-color: ${ vars.colors.blue[1] };
	color: ${ vars.colors.blue[9] };
	padding: 2px 6px;
	border-radius: 4px;
	font-size: 0.875rem;
	font-weight: 500;
	margin: 0 2px;
	display: inline-block;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: ${ vars.colors.blue[2] };
		color: ${ vars.colors.blue[8] };
	}
`

export const selected = css`
	background-color: ${ vars.colors.blue[1] };
	color: ${ vars.colors.blue[9] };
`

export const tagAutocomplete = css`
	position: absolute;
	z-index: 1000;
	background: ${ vars.colors.white };
	border: 1px solid ${ vars.colors.gray[3] };
	border-radius: ${ vars.radius.md };
	box-shadow: ${ vars.shadows.md };
	max-height: 200px;
	overflow-y: auto;
	min-width: 200px;
`

export const tagOption = css`
	padding: 8px 12px;
	cursor: pointer;
	border-bottom: 1px solid ${ vars.colors.gray[2] };
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${ vars.colors.gray[1] };
	}

	&:last-child {
		border-bottom: none;
	}

	&.selected {
		background-color: ${ vars.colors.blue[1] };
		color: ${ vars.colors.blue[9] };
	}
`
