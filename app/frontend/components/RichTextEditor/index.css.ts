import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const richTextEditor = css`
	& .tiptap.ProseMirror .mention {
		display: inline;
		padding: 0 0.2em;
		border-radius: ${ vars.radius.xs };
		font-weight: 500;
		white-space: nowrap;
		user-select: none;
		cursor: default;

		${ vars.lightSelector } {
			background-color: ${ vars.colors.blue[0] };
			color: ${ vars.colors.blue[8] };
			box-shadow: inset 0 0 0 1px ${ vars.colors.blue[2] };
		}

		${ vars.darkSelector } {
			background-color: ${ vars.colors.blue[9] };
			color: ${ vars.colors.blue[1] };
			box-shadow: inset 0 0 0 1px ${ vars.colors.blue[7] };
		}
	}
`
