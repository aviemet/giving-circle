import { css } from "@linaria/core"

import { theme, vars } from "@/lib"

export const puckRoot = css`
	--puck-font-family: inherit;
	position: relative;
	height: calc(100dvh - ${ theme.other.header.height }px - ${ theme.other.footer.height }px);

	& .Puck {
		input,
		select {
			color: var(--editor-input-text);
			background-color: var(--editor-input-bg);
			border-color: var(--editor-input-border);
		}

		[class*="PuckFields-field"] {
			color: var(--editor-input-text);
			padding: ${ vars.spacing.xs };
		}

		[class*="Sidebar--right"] {
			[class*="PuckFields-field"],
			[class*="Input-label"] {
				color: var(--editor-input-text);
			}

			[class*="Input-label_"] {
				margin-bottom: 0;
				padding-bottom: ${ vars.spacing.xxs };
			}

			input,
			select {
				padding: ${ vars.spacing.xxs } ${ vars.spacing.sm };
				background-color: var(--editor-input-bg);
				border-color: var(--editor-input-border);
				color: var(--editor-input-text);
			}

			.mantine-RichTextEditor-content {
				background-color: var(--editor-input-bg);
				border-color: var(--editor-input-border);
			}
		}

		.mantine-RichTextEditor-root {
			border-color: var(--editor-input-border);
		}

		.mantine-RichTextEditor-content {
			background-color: var(--editor-input-bg);
		}

		.mantine-RichTextEditor-Typography {
			color: var(--editor-input-text);
		}

		input.mantine-ColorInput-input {
			padding-left: 2rem;
		}

		[class*="ComponentList-title"] {
			background-color: var(--puck-color-grey-02);
			border-radius: 4px;
			margin-bottom: 4px;
		}

		[class*="DrawerItem-draggable"] {
			background-color: var(--puck-color-white);
			border: 1px solid var(--puck-color-grey-09);
		}

		[class*="Sidebar--left"] {
			[class*="ComponentList-content"]:has([class*="LayerTree"]) {
				background-color: var(--puck-color-grey-02);
				border-radius: 4px;
				padding: 8px;
				margin-top: 4px;
			}

			[class*="LayerTree"],
			[class*="LayerTree-zoneTitle"],
			[class*="LayerTree-helper"],
			[class*="Layer-name"],
			[class*="Layer-title"] {
				color: var(--puck-color-black);
			}
		}
	}

	& [class*="PuckLayout-inner"] {
		height: calc(100dvh - ${ theme.other.header.height }px - ${ theme.other.footer.height }px);
	}
`
