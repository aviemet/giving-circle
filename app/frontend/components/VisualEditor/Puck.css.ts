import { css } from "@linaria/core"


import { theme } from "@/lib"

export { puckFields } from "./fields/puckFieldStyles.css"

export const puckDrawer = css``
export const puckDrawerItem = css``
export const puckDrawerItemIcon = css``
export const puckOutline = css``
export const presentationSlot = css``

export const puckPreviewContainer = css`
	width: 100%;
	height: 100%;
	min-height: 100%;
`

export const puckSlideRoot = css`
	width: 100%;
	min-height: 100%;
	height: 100%;
	overflow: hidden;
	padding: 0;
	margin: 0;
	background-color: var(--puck-slide-root-bg, #000000);
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

		[class*="DropZone"]:empty::after {
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

	& [data-puck-preview],
	& [data-puck-entry],
	& [class*="PuckPreview-frame"] {
		height: 100%;
		min-height: 100%;
	}

	& .${ puckSlideRoot } [class*="DropZone--isRootZone"] {
		height: 100%;
		min-height: 100%;
	}
`
