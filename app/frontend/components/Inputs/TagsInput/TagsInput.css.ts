import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const puckMentionBadge = css`
	.tiptap.ProseMirror {
		.mention {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: ${ vars.spacing.xxs } ${ vars.spacing.xs };
			height: auto;
			min-height: ${ vars.spacing.md };
			font-size: ${ vars.fontSizes.xs };
			font-weight: 500;
			line-height: 1;
			text-decoration: none;
			text-transform: none;
			border: 1px solid transparent;
			border-radius: ${ vars.radius.xs };
			cursor: default;
			user-select: none;
			white-space: nowrap;
			background-color: ${ vars.colors.blue[1] };
			color: ${ vars.colors.blue[9] };
			transition: all 0.1s ease;

			&:hover {
				background-color: ${ vars.colors.blue[2] };
				color: ${ vars.colors.blue[8] };
			}
		}
	}
`
