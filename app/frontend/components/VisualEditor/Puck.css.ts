import { css } from "@linaria/core"


import { theme } from "@/lib/theme"

import * as layoutChrome from "./layoutChrome.editor.css"
import {
	DRAG_HITBOX_HEIGHT_PX,
	DRAG_SLOT_EDGE_PX,
	DRAG_SLOT_GAP_PX,
	DRAG_SLOT_GUTTER_PX,
} from "./slotEditor"

export { puckFields } from "./fields/puckFieldStyles.css"

export const puckDrawer = css``
export const puckDrawerItem = css``
export const puckDrawerItemIcon = css``
export const puckOutline = css``

export const presentationSlot = css`
	&[class*="DropZone"],
	& [class*="DropZone"] {
		width: 100%;
		box-sizing: border-box;
	}

	&[class*="DropZone--hasChildren"],
	& [class*="DropZone--hasChildren"] {
		min-height: 40px;
	}
`

export const puckPreviewContainer = css`
	width: 100%;
	height: 100%;
	min-height: 100%;
`

const PUCK_SPACE_PX = "2px"

export const puckRoot = css`
	--puck-font-family: inherit;
	position: relative;
	height: calc(100dvh - ${ theme.other.header.height }px - ${ theme.other.footer.height }px);

	& .Puck {
		--puck-space-px: ${ PUCK_SPACE_PX };

		input,
		select {
			color: var(--editor-input-text);
			background-color: var(--editor-input-bg);
			border-color: var(--editor-input-border);
		}

		.${ puckDrawer } [class*="ComponentList-title"] {
			background-color: var(--puck-color-grey-03);
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

		[class*="DropZone--isRootZone"]:not([class*="DropZone--hasChildren"]) {
			border: 1px solid var(--puck-color-grey-08);
			border-radius: 6px;
			background-color: color-mix(in oklch, var(--puck-color-grey-10) 40%, transparent);
			box-sizing: border-box;
		}

		[class*="DropZone--isRootZone"]:not([class*="DropZone--hasChildren"])::after {
			content: "Drop blocks here";
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			pointer-events: none;
			color: var(--puck-color-grey-06);
			font-size: 0.8125rem;
		}

		[data-puck-dragging] [class*="DropZone--isDestination"]:not([class*="DropZone--isRootZone"]) {
			border-color: var(--puck-color-azure-04);
			background-color: color-mix(in oklch, var(--puck-color-azure-09) 70%, transparent);
		}

		[data-puck-dragging] .${ layoutChrome.frame } {
			box-sizing: border-box;
			padding-block: ${ DRAG_SLOT_GUTTER_PX }px !important;
			padding-inline: ${ DRAG_SLOT_EDGE_PX }px !important;
			gap: ${ DRAG_SLOT_GAP_PX }px !important;
			min-height: ${ DRAG_SLOT_GUTTER_PX * 2 + 48 }px;
			background-color: color-mix(in oklch, #38bdf8 8%, transparent);
		}

		[data-puck-dragging] .${ layoutChrome.frame }[class*="DropZone--isEnabled"],
		[data-puck-dragging] .${ layoutChrome.frame }[class*="DropZone--isDestination"] {
			background-color: color-mix(in oklch, #38bdf8 18%, transparent);
		}

		[data-puck-dragging] [class*="DropZone--isRootZone"] {
			box-sizing: border-box;
			padding-block: ${ DRAG_SLOT_GUTTER_PX }px;
			padding-inline: ${ DRAG_SLOT_EDGE_PX }px;
			gap: ${ DRAG_SLOT_GAP_PX }px;
		}

		[data-puck-dragging] [class*="DropZone-hitbox"] {
			bottom: -${ Math.round(DRAG_HITBOX_HEIGHT_PX / 2) }px;
			height: ${ DRAG_HITBOX_HEIGHT_PX }px;
			z-index: 4;
		}
	}

	& [class*="PuckLayout-inner"] {
		height: calc(100dvh - ${ theme.other.header.height }px - ${ theme.other.footer.height }px);
	}

	& [data-puck-preview],
	& [data-puck-entry],
	& [class*="PuckPreview-frame"] {
		height: 100%;
		min-height: 100%;
	}
`
