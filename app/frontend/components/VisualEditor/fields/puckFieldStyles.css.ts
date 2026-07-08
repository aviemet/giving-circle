import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

const puckFieldInputStyles = `
	padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
	min-height: var(--puck-field-control-height);
	line-height: var(--puck-field-line-height);
	font-size: var(--puck-field-font-size);
	background-color: var(--editor-input-bg);
	border: 1px solid var(--editor-input-border);
	border-radius: var(--puck-field-radius);
	color: var(--editor-input-text);
`

const puckFieldFocusStyles = `
	outline: none;
	border-color: var(--puck-color-azure-05);
	box-shadow: var(--puck-field-focus-ring);
`

export const puckFieldStack = css`
	display: flex;
	flex-direction: column;
	row-gap: var(--puck-field-section-gap, 4px);
`

export const puckFieldImagePreview = css`
	width: 100%;
	height: 96px;
	border-radius: var(--puck-field-radius, 3px);
	overflow: hidden;
	background-color: var(--puck-color-grey-10);
	background-size: cover;
	background-position: center;
`

export const puckFieldUploadedImageHost = css`
	margin-top: 0.5rem;
`

export const puckFieldUploadedImage = css`
	display: block;
	max-width: 100%;
	height: auto;
`

export const puckFieldLabel = css`
	display: block;
	margin: 0;
	padding: 0;

	& > div:first-child,
	& [class*="Input-label"] {
		display: flex;
		align-items: center;
		column-gap: 4px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin: 0 0 4px 0;
		padding: 0;
		line-height: 1;
	}
`

export const puckFields = css`
	--puck-field-font-size: 0.8125rem;
	--puck-field-line-height: 1.25;
	--puck-field-padding-block: 3px;
	--puck-field-padding-inline: 6px;
	--puck-field-control-height: 28px;
	--puck-field-radius: 3px;
	--puck-field-section-gap: 4px;
	--puck-field-focus-ring: 0 0 0 2px color-mix(in oklch, var(--puck-color-azure-05) 25%, transparent);

	padding: 0 4px;

	& form > div:last-child {
		margin-bottom: 0;
	}

	& label {
		display: block;
		margin: 0;
		padding: 0;
	}

	& label > div:first-child,
	& label [class*="Input-label"],
	& [class*="Input-label"] {
		display: flex;
		align-items: center;
		column-gap: 4px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin: 0 0 4px 0;
		padding: 0;
		line-height: 1;
	}

	& [class*="Input-labelIcon"] {
		display: inline-flex;
		flex-shrink: 0;
		margin-inline-end: 0;
	}

	& [class*="Input-input"]:not(.mantine-ColorInput-input):not(.mantine-NumberInput-input),
	& input:not(.mantine-ColorInput-input):not(.mantine-NumberInput-input),
	& select,
	& .mantine-TextInput-input,
	& .mantine-Select-input,
	& .mantine-Textarea-input {
		${ puckFieldInputStyles }
	}

	& [class*="Input-input"]:not(.mantine-ColorInput-input):not(.mantine-NumberInput-input):focus,
	& input:not(.mantine-ColorInput-input):not(.mantine-NumberInput-input):focus,
	& select:focus,
	& .mantine-TextInput-input:focus,
	& .mantine-Select-input:focus,
	& .mantine-Textarea-input:focus {
		${ puckFieldFocusStyles }
	}

	& .mantine-ColorInput-root {
		--input-height: var(--puck-field-control-height);
		--input-fz: var(--puck-field-font-size);
		--input-radius: var(--puck-field-radius);
		--input-padding-x: var(--puck-field-padding-inline);
	}

	& .mantine-ColorInput-wrapper {
		--input-height: var(--puck-field-control-height);
		min-height: var(--puck-field-control-height);
	}

	& .mantine-ColorInput-input {
		min-height: var(--puck-field-control-height);
		height: var(--puck-field-control-height);
		padding-block: var(--puck-field-padding-block);
		padding-inline-end: var(--puck-field-padding-inline);
		font-size: var(--puck-field-font-size);
		line-height: var(--puck-field-line-height);
		color: var(--editor-input-text);
		background-color: var(--editor-input-bg);
		border: 1px solid var(--editor-input-border);
		border-radius: var(--puck-field-radius);
	}

	& .mantine-ColorInput-input:focus {
		${ puckFieldFocusStyles }
	}

	& .mantine-ColorInput-colorPreview {
		--cs-size: calc(var(--puck-field-control-height) - 8px);
	}

	& .mantine-NumberInput-root {
		display: flex;
		align-items: stretch;
		min-height: var(--puck-field-control-height);
		background-color: var(--editor-input-bg);
		border: 1px solid var(--editor-input-border);
		border-radius: var(--puck-field-radius);
	}

	& .mantine-NumberInput-root:focus-within {
		${ puckFieldFocusStyles }
	}

	& .mantine-NumberInput-wrapper {
		flex: 1;
		min-width: 0;
		margin: 0;
		padding: 0;
		border: none;
		background: transparent;
		box-shadow: none;
	}

	& .mantine-NumberInput-root .mantine-NumberInput-input,
	& .mantine-NumberInput-root input {
		flex: 1;
		min-width: 0;
		width: 100%;
		min-height: var(--puck-field-control-height);
		padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
		line-height: var(--puck-field-line-height);
		font-size: var(--puck-field-font-size);
		color: var(--editor-input-text);
		background-color: transparent;
		border: none;
		border-radius: 0;
		box-shadow: none;
	}

	& .mantine-NumberInput-root .mantine-NumberInput-input:focus,
	& .mantine-NumberInput-root input:focus {
		outline: none;
		box-shadow: none;
		border: none;
	}

	& .mantine-NumberInput-control {
		width: 1.25rem;
		border: none;
		color: var(--editor-input-text);
		background-color: transparent;
		border-inline-start: 1px solid var(--editor-input-border);
	}

	& .mantine-NumberInput-control:hover {
		background-color: color-mix(in oklch, var(--editor-input-bg) 75%, var(--puck-color-grey-09));
	}

	& .mantine-SegmentedControl-root {
		--sc-font-size: var(--puck-field-font-size);
		width: 100%;
		min-height: var(--puck-field-control-height);
		padding: 2px;
		background-color: var(--editor-input-bg);
		border: 1px solid var(--editor-input-border);
		border-radius: var(--puck-field-radius);
	}

	& .mantine-SegmentedControl-control {
		min-width: 0;
	}

	& .mantine-SegmentedControl-label {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(var(--puck-field-control-height) - 4px);
		padding-inline: 0.375rem;
		font-size: var(--puck-field-font-size);
		line-height: var(--puck-field-line-height);
		color: color-mix(in oklch, var(--editor-input-text) 60%, transparent);
	}

	& .mantine-SegmentedControl-label[data-active] {
		color: var(--editor-input-text);
	}

	& .mantine-SegmentedControl-indicator {
		background-color: var(--puck-color-white);
		border: 1px solid var(--editor-input-border);
		border-radius: calc(var(--puck-field-radius) - 1px);
		box-shadow: none;
	}

	& .mantine-Textarea-root {
		margin: 0;
	}

	& .mantine-Textarea-input {
		min-height: calc(var(--puck-field-control-height) * 2);
		padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
	}

	& [class*="NumberInput-root"],
	& [class*="Input-wrapper"] {
		min-height: unset;
	}

	& [class*="InputWrapper"] {
		margin-bottom: 0;
	}

	& [class*="ObjectField"]:not([class*="fieldset"]) {
		background-color: transparent;
		border: none;
		border-radius: 0;
	}

	& [class*="ObjectField-fieldset"] {
		border: none;
		margin: 0;
		min-width: 0;
		padding: 0;
	}
`

export const puckFieldControl = css`
	${ puckFieldInputStyles }

	&:focus {
		${ puckFieldFocusStyles }
	}
`

export const puckTagsInput = css`
	&.mantine-RichTextEditor-root {
		font-size: var(--puck-field-font-size);
		line-height: var(--puck-field-line-height);
		background-color: var(--editor-input-bg);
		border: 1px solid var(--editor-input-border);
		border-radius: var(--puck-field-radius);
		color: var(--editor-input-text);
	}

	&.mantine-RichTextEditor-root:focus-within {
		outline: none;
		border-color: var(--puck-color-azure-05);
		box-shadow: var(--puck-field-focus-ring);
	}

	& .mantine-RichTextEditor-content {
		border: none;
		background-color: transparent;
	}

	& .tiptap.ProseMirror {
		padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
		min-height: var(--puck-field-control-height);
		font-size: var(--puck-field-font-size);
		line-height: var(--puck-field-line-height);
		color: var(--editor-input-text);
	}

	& .tiptap.ProseMirror p {
		margin: 0;
	}

	& .tiptap.ProseMirror .mention {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 4px;
		height: auto;
		min-height: unset;
		font-size: inherit;
		font-weight: 500;
		line-height: var(--puck-field-line-height);
		text-decoration: none;
		border: 1px solid transparent;
		border-radius: ${ vars.radius.xs };
		cursor: default;
		user-select: none;
		white-space: nowrap;

		${ vars.lightSelector } {
			background-color: ${ vars.colors.blue[1] };
			color: ${ vars.colors.blue[9] };
		}

		${ vars.darkSelector } {
			background-color: ${ vars.colors.blue[9] };
			color: ${ vars.colors.blue[1] };
		}
	}

	& .tiptap.ProseMirror .mention:hover {
		${ vars.lightSelector } {
			background-color: ${ vars.colors.blue[2] };
			color: ${ vars.colors.blue[8] };
		}

		${ vars.darkSelector } {
			background-color: ${ vars.colors.blue[8] };
			color: ${ vars.colors.blue[0] };
		}
	}
`
