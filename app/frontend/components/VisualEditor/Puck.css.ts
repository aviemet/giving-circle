import { css } from "@linaria/core"

import { theme, vars } from "@/lib"

export const puckDrawer = css``
export const puckDrawerItem = css``
export const puckDrawerItemIcon = css``
export const puckOutline = css``
export const puckFields = css``
export const presentationSlot = css``

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

		.${ puckFields } {
			padding: 0 6px;
		}

		.${ puckFields } form > div {
			margin-bottom: 6px;
		}

		.${ puckFields } form > div:last-child {
			margin-bottom: 0;
		}

		.${ puckFields } label {
			display: block;
			color: var(--puck-color-black);
			font-size: 0.6875rem;
			font-weight: 600;
			letter-spacing: 0.04em;
			text-transform: uppercase;
			margin: 0 0 2px 0;
			padding: 0;
		}

		.${ puckFields } label,
		.${ puckFields } label * {
			color: var(--puck-color-black);
		}

		.${ puckFields } label > div {
			padding: 0;
		}

		.${ puckFields } input,
		.${ puckFields } select {
			padding: 4px 6px;
			min-height: unset;
			line-height: 1.25;
			font-size: 0.8125rem;
			background-color: var(--editor-input-bg);
			border: 1px solid var(--editor-input-border);
			border-radius: 3px;
			color: var(--puck-color-black);
		}

		.${ puckFields } input:focus,
		.${ puckFields } select:focus {
			outline: none;
			border-color: var(--puck-color-azure-05);
			box-shadow: 0 0 0 2px color-mix(in oklch, var(--puck-color-azure-05) 25%, transparent);
		}

		.${ puckFields } [class*="NumberInput-root"],
		.${ puckFields } [class*="Input-wrapper"] {
			min-height: unset;
		}

		.${ puckFields } [class*="InputWrapper"] {
			margin-bottom: 0;
		}

		.${ puckFields } .mantine-RichTextEditor-content {
			background-color: var(--editor-input-bg);
			border-color: var(--editor-input-border);
			color: var(--puck-color-black);
		}

		.${ puckFields } .mantine-RichTextEditor-Typography {
			color: var(--puck-color-black);
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
			padding-left: ${ vars.spacing.xl };
		}

		.${ puckDrawer } [class*="ComponentList-title"] {
			background-color: var(--puck-color-grey-02);
			border-radius: 4px;
			margin-bottom: 4px;
			padding: 6px 8px 0 8px;
		}

		.${ puckDrawer } [data-puck-drawer="true"] {
			gap: 4px;
		}

		.${ puckDrawerItem } [class*="DrawerItem-draggable"] {
			display: flex;
			align-items: center;
			gap: 6px;
			background-color: var(--puck-color-white);
			border: 1px solid var(--puck-color-grey-09);
			padding: 2px 8px 0px 8px;
		}

		.${ puckDrawerItem } .${ puckDrawerItemIcon } {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 18px;
			height: 18px;
			color: var(--puck-color-grey-10);
		}

		.${ puckOutline } {
			background-color: var(--puck-color-grey-02);
			border-radius: 4px;
			padding: 8px;
			margin-top: 4px;
		}

		.${ puckOutline } * {
			color: var(--puck-color-black);
		}

		[class*="DropZone"]:empty {
			border: 1px dashed var(--puck-color-azure-06);
			border-radius: 6px;
			background-color: color-mix(in oklch, var(--puck-color-azure-10) 55%, transparent);
			box-sizing: border-box;
		}

		.${ presentationSlot }[class*="DropZone"],
		.${ presentationSlot } [class*="DropZone"] {
			width: 100%;
			box-sizing: border-box;
		}

		.${ presentationSlot }[class*="DropZone--hasChildren"],
		.${ presentationSlot } [class*="DropZone--hasChildren"] {
			min-height: 40px;
		}

		[data-puck-dragging] .${ presentationSlot }[class*="DropZone--hasChildren"],
		[data-puck-dragging] .${ presentationSlot } [class*="DropZone--hasChildren"] {
			padding-bottom: 24px;
		}

		[class*="DropZone--isRootZone"]:empty {
			border-style: solid;
			border-color: var(--puck-color-grey-08);
			background-color: color-mix(in oklch, var(--puck-color-grey-10) 40%, transparent);
		}

		[data-puck-dragging] [class*="DropZone--isDestination"]:not([class*="DropZone--isRootZone"]) {
			border-color: var(--puck-color-azure-04);
			background-color: color-mix(in oklch, var(--puck-color-azure-09) 70%, transparent);
		}
	}

	& [class*="PuckLayout-inner"] {
		height: calc(100dvh - ${ theme.other.header.height }px - ${ theme.other.footer.height }px);
	}
`
