import { css } from "@linaria/core"

import * as layoutChrome from "./layoutChrome.editor.css"
import {
	DRAG_HITBOX_HEIGHT_PX,
	DRAG_SLOT_EDGE_PX,
	DRAG_SLOT_GAP_PX,
	DRAG_SLOT_GUTTER_PX,
} from "./slotEditor"

import { theme } from "@/lib/theme"

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

export const puckRoot = css`
	--puck-font-family: inherit;
	--puck-space-1: 2px;
	--puck-space-2: 4px;
	--puck-space-3: 6px;
	--puck-space-4: 8px;
	--puck-space-5: 12px;
	--puck-space-chrome-gutter: 0px;
	--puck-drawer-item-space: 4px;
	--puck-radius-m: 3px;
	--puck-field-radius: 3px;
	--puck-field-font-size: 0.8125rem;
	--puck-field-space-y: 4px;
	--puck-field-space-x: 6px;
	--puck-field-label-space-y: 2px;
	--puck-field-label-font-size: 0.8125rem;
	--puck-field-space-surface-y: 6px;
	--puck-field-space-surface-x: 6px;
	--puck-field-control-height: 28px;
	--puck-field-section-gap: 4px;
	--puck-field-label-font-size: 0.8125rem;
	--puck-field-label-font-weight: 700;
	--puck-field-prop-label-font-size: 0.6875rem;
	--puck-field-prop-label-font-weight: 600;
	--puck-field-prop-label-color: #d97706;
	--puck-field-selected-bg: color-mix(in oklch, var(--mantine-color-blue-6) 42%, var(--puck-field-color-bg, var(--editor-input-bg)));
	--puck-field-selected-border: color-mix(in oklch, var(--mantine-color-blue-5) 55%, var(--puck-field-color-border, var(--editor-input-border)));
	--puck-field-control-shadow: 0 1px 2px rgba(0, 0, 0, 0.22);
	--puck-slot-min-empty-height: 48px;
	position: relative;
	height: calc(100dvh - ${ theme.other.header.height }px - ${ theme.other.footer.height }px);
	max-height: calc(100dvh - ${ theme.other.header.height }px - ${ theme.other.footer.height }px);
	min-height: 0;
	overflow: hidden;

	& .Puck {
		height: 100%;
		min-height: 0;
		overflow: hidden;

		input,
		select {
			color: var(--puck-field-color-text, var(--editor-input-text));
			background-color: var(--puck-field-color-bg, var(--editor-input-bg));
			border-color: var(--puck-field-color-border, var(--editor-input-border));
		}

		.${ puckDrawer } [class*="ComponentList-title"] {
			background-color: var(--puck-color-interactive-subtle);
			border-radius: 4px;
			margin-bottom: 2px;
			padding: 4px 6px 0 6px;
		}

		.${ puckDrawer } [data-puck-drawer="true"] {
			gap: 2px;
		}

		.${ puckDrawerItem } [class*="DrawerItem-draggable"] {
			display: flex;
			align-items: center;
			gap: 4px;
			background-color: var(--puck-color-surface);
			border: 1px solid var(--puck-color-border);
			padding: 1px 6px;
		}

		.${ puckDrawerItem } .${ puckDrawerItemIcon } {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 16px;
			height: 16px;
			color: var(--puck-color-text-subtle);
		}

		.${ puckOutline } {
			background-color: var(--puck-color-surface-subtle);
			border-radius: 4px;
			padding: 4px;
			margin-top: 2px;
		}

		.${ puckOutline } * {
			color: var(--puck-color-text);
		}

		[class*="DropZone--isRootZone"]:not([class*="DropZone--hasChildren"]) {
			border: 1px solid var(--puck-color-border);
			border-radius: 6px;
			background-color: color-mix(in oklch, var(--puck-color-border-muted) 40%, transparent);
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
			color: var(--puck-color-text-muted);
			font-size: 0.8125rem;
		}

		[data-puck-dragging] [class*="DropZone--isDestination"]:not([class*="DropZone--isRootZone"]) {
			border-color: var(--puck-color-selection-border);
			background-color: var(--puck-color-selection-bg);
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

	& [class*="PuckHeader-inner"] {
		padding: 4px 8px;
	}

	& [class*="SidebarSection-content"] {
		padding: 6px;
	}

	& [class*="PuckLayout"] {
		height: 100% !important;
		max-height: 100%;
		min-height: 0;
		overflow: hidden;
	}

	& [class*="PuckLayout-inner"] {
		height: 100%;
		min-height: 0;
		overflow: hidden;
	}

	& [class*="PuckCanvas"] {
		overflow: auto;
	}

	& [class*="ActionBar"] {
		--puck-actionbar-color-text: #ffffff;
		--puck-actionbar-color-action-disabled: #ffffff;
		--puck-actionbar-color-action-active: #ffffff;
		--puck-actionbar-color-separator: rgba(255, 255, 255, 0.4);
		color: #ffffff;
	}

	& [class*="ActionBar"] svg {
		color: inherit;
	}

	& [data-puck-preview],
	& [data-puck-entry],
	& [class*="PuckPreview-frame"] {
		height: 100%;
		min-height: 100%;
	}
`
