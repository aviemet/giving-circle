import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

const depth0 = "color-mix(in oklch, #38bdf8 88%, transparent)"
const depth1 = "color-mix(in oklch, #fbbf24 90%, transparent)"
const depth2 = "color-mix(in oklch, #f472b6 90%, transparent)"
const depth3 = "color-mix(in oklch, #34d399 90%, transparent)"

const label0 = "#38bdf8"
const label1 = "#fbbf24"
const label2 = "#f472b6"
const label3 = "#34d399"

export const frame = css`
	position: relative;
	isolation: isolate;

	&::before {
		position: absolute;
		top: 3px;
		left: 3px;
		z-index: 6;
		pointer-events: none;
		font-family: ${ vars.fontFamily };
		font-size: 0.625rem;
		font-weight: 700;
		line-height: 1;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		padding: 3px 6px;
		border-radius: 3px;
		background-color: ${ label0 };
		color: #0b1220;
		box-shadow: 0 1px 2px color-mix(in oklch, black 35%, transparent);
		opacity: 0.95;
	}

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		z-index: 5;
		pointer-events: none;
		border: 1.5px dashed ${ depth0 };
		border-radius: 4px;
		box-shadow: inset 0 0 0 1px color-mix(in oklch, ${ depth0 } 35%, transparent);
	}

	& &::before {
		top: 3px;
		left: auto;
		right: 3px;
		background-color: ${ label1 };
	}

	& &::after {
		border-color: ${ depth1 };
		box-shadow: inset 0 0 0 1px color-mix(in oklch, ${ depth1 } 35%, transparent);
	}

	& & &::before {
		top: auto;
		bottom: 3px;
		left: 3px;
		right: auto;
		background-color: ${ label2 };
	}

	& & &::after {
		border-color: ${ depth2 };
		box-shadow: inset 0 0 0 1px color-mix(in oklch, ${ depth2 } 35%, transparent);
	}

	& & & &::before {
		top: auto;
		bottom: 3px;
		left: auto;
		right: 3px;
		background-color: ${ label3 };
	}

	& & & &::after {
		border-color: ${ depth3 };
		box-shadow: inset 0 0 0 1px color-mix(in oklch, ${ depth3 } 35%, transparent);
	}

	&[class*="DropZone"]:not([class*="DropZone--hasChildren"]),
	&:not([class*="DropZone--hasChildren"]) {
		background-image: repeating-linear-gradient(
			-45deg,
			transparent,
			transparent 8px,
			color-mix(in oklch, ${ depth0 } 14%, transparent) 8px,
			color-mix(in oklch, ${ depth0 } 14%, transparent) 16px
		);
	}

	&[class*="DropZone--isDestination"]::after,
	&[class*="DropZone--isEnabled"]::after {
		border-style: solid;
		border-width: 2px;
		border-color: color-mix(in oklch, #38bdf8 95%, white);
	}

	&[class*="DropZone--isAreaSelected"]::after {
		border-style: solid;
		border-width: 2px;
	}
`

export const labelContainer = css`
	&::before {
		content: "Container";
	}
`

export const labelGrid = css`
	&::before {
		content: "Grid";
	}
`
