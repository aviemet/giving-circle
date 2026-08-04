import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const tagsInput = css`
	&.mantine-RichTextEditor-root {
		background-color: light-dark(${ vars.colors.white }, ${ vars.colors.dark[6] });
		border: 1px solid light-dark(${ vars.colors.gray[4] }, ${ vars.colors.dark[4] });
		border-radius: ${ vars.radius.sm };
		overflow: hidden;
	}

	&.mantine-RichTextEditor-root:focus-within {
		border-color: ${ vars.colors.primaryColors.filled };
	}

	& .mantine-RichTextEditor-content {
		border: none;
		background-color: transparent;
	}

	& .tiptap.ProseMirror {
		min-height: 2.25rem;
		padding: 0.5rem 0.75rem;
		line-height: 1.45;
	}

	& .tiptap.ProseMirror p,
	& .tiptap.ProseMirror > span {
		margin: 0;
		line-height: 1.45;
	}

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

export const mentionComboboxDropdown = css`
	min-width: 16rem;
	width: max-content;
	max-width: 24rem;

	& .mantine-Combobox-option {
		white-space: nowrap;
	}
`
