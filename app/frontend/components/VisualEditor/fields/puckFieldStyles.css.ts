import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

const puckFieldInputStyles = `
	box-sizing: border-box;
	height: var(--puck-field-control-height, 28px);
	min-height: var(--puck-field-control-height, 28px);
	max-height: var(--puck-field-control-height, 28px);
	padding: 0 var(--puck-field-padding-inline, 6px);
	line-height: var(--puck-field-control-height, 28px);
	font-size: var(--puck-field-font-size, 0.8125rem);
	background-color: var(--puck-field-color-bg, var(--puck-field-color-bg, var(--editor-input-bg)));
	border: 1px solid var(--puck-field-color-border, var(--puck-field-color-border, var(--editor-input-border)));
	border-radius: var(--puck-field-radius, 3px);
	color: var(--puck-field-color-text, var(--puck-field-color-text, var(--editor-input-text)));
`

const puckFieldFocusStyles = `
	outline: none;
	border-color: var(--puck-field-color-border-focus, var(--puck-color-focus-ring));
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
	background-color: var(--puck-color-border-muted);
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
		margin: 0 0 6px 0;
		padding: 0;
		font-size: var(--puck-field-label-font-size, 0.8125rem);
		font-weight: var(--puck-field-label-font-weight, 700);
		line-height: 1.2;
		letter-spacing: 0;
		text-transform: none;
		color: var(--puck-color-text, var(--puck-field-color-text, var(--editor-input-text)));
	}
`

export const puckFields = css`
	--puck-field-font-size: 0.8125rem;
	--puck-field-line-height: 1;
	--puck-field-padding-block: 0px;
	--puck-field-padding-inline: 6px;
	--puck-field-control-height: 28px;
	--puck-field-radius: 3px;
	--puck-field-section-gap: 4px;
	--puck-field-focus-ring: 0 0 0 2px color-mix(in oklch, var(--puck-color-focus-ring) 25%, transparent);
	--puck-field-label-font-size: 0.8125rem;
	--puck-field-label-font-weight: 700;
	--puck-field-prop-label-font-size: 0.6875rem;
	--puck-field-prop-label-font-weight: 600;
	--puck-field-prop-label-color: #d97706;
	--puck-field-selected-bg: color-mix(in oklch, var(--mantine-color-blue-6) 42%, var(--puck-field-color-bg, var(--editor-input-bg)));
	--puck-field-selected-border: color-mix(in oklch, var(--mantine-color-blue-5) 55%, var(--puck-field-color-border, var(--editor-input-border)));
	--puck-field-control-shadow: 0 1px 2px rgba(0, 0, 0, 0.22);

	min-width: 0;
	max-width: 100%;
	overflow-x: hidden;
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
		margin: 0 0 6px 0;
		padding: 0;
		font-size: var(--puck-field-label-font-size, 0.8125rem);
		font-weight: var(--puck-field-label-font-weight, 700);
		line-height: 1.2;
		letter-spacing: 0;
		text-transform: none;
		color: var(--puck-color-text, var(--puck-field-color-text, var(--editor-input-text)));
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

	& .mantine-Select-root,
	& .mantine-TextInput-root,
	& .mantine-NumberInput-root {
		--input-height: var(--puck-field-control-height);
		--input-size: var(--puck-field-control-height);
		--input-fz: var(--puck-field-font-size);
		--input-radius: var(--puck-field-radius);
		--input-padding-y: 0px;
		--input-padding-x: var(--puck-field-padding-inline);
		width: 100%;
		min-width: 0;
	}

	& .mantine-Select-wrapper,
	& .mantine-TextInput-wrapper,
	& .mantine-NumberInput-wrapper {
		--input-height: var(--puck-field-control-height);
		min-height: var(--puck-field-control-height);
		height: var(--puck-field-control-height);
		width: 100%;
	}

	& .mantine-ColorInput-root {
		--input-height: var(--puck-field-control-height);
		--input-fz: var(--puck-field-font-size);
		--input-radius: var(--puck-field-radius);
		--input-padding-x: var(--puck-field-padding-inline);
		--input-padding-y: 0px;
		width: 100%;
		min-width: 0;
	}

	& .mantine-ColorInput-wrapper {
		--input-height: var(--puck-field-control-height);
		min-height: var(--puck-field-control-height);
		height: var(--puck-field-control-height);
	}

	& .mantine-ColorInput-input {
		box-sizing: border-box;
		min-height: var(--puck-field-control-height);
		height: var(--puck-field-control-height);
		max-height: var(--puck-field-control-height);
		padding-block: 0;
		padding-inline-end: var(--puck-field-padding-inline);
		font-size: var(--puck-field-font-size);
		line-height: var(--puck-field-control-height);
		color: var(--puck-field-color-text, var(--editor-input-text));
		background-color: var(--puck-field-color-bg, var(--editor-input-bg));
		border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
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
		box-sizing: border-box;
		height: var(--puck-field-control-height);
		min-height: var(--puck-field-control-height);
		max-height: var(--puck-field-control-height);
		overflow: hidden;
		background-color: var(--puck-field-color-bg, var(--editor-input-bg));
		border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
		border-radius: var(--puck-field-radius);
		box-shadow: var(--puck-field-control-shadow, 0 1px 2px rgba(0, 0, 0, 0.22));
	}

	& .mantine-NumberInput-root:focus-within {
		${ puckFieldFocusStyles }
	}

	& .mantine-NumberInput-wrapper {
		flex: 1;
		min-width: 0;
		margin: 0;
		padding: 0;
		height: 100%;
		border: none;
		background: transparent;
		box-shadow: none;
	}

	& .mantine-NumberInput-root .mantine-NumberInput-input,
	& .mantine-NumberInput-root input {
		flex: 1;
		min-width: 0;
		width: 100%;
		box-sizing: border-box;
		height: 100%;
		min-height: 0;
		max-height: 100%;
		padding: 0 var(--puck-field-padding-inline);
		line-height: var(--puck-field-control-height);
		font-size: var(--puck-field-font-size);
		color: var(--puck-field-color-text, var(--editor-input-text));
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

	& .mantine-NumberInput-controls {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 1.125rem;
		height: 100%;
		max-height: 100%;
		overflow: hidden;
		border-inline-start: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	}

	& .mantine-NumberInput-control {
		box-sizing: border-box;
		display: flex;
		flex: 1 1 0;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 0;
		max-height: 50%;
		padding: 0;
		border: none;
		border-radius: 0;
		color: var(--puck-field-color-text, var(--editor-input-text));
		background-color: transparent;
	}

	& .mantine-NumberInput-control + .mantine-NumberInput-control {
		border-block-start: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	}

	& .mantine-NumberInput-control:hover {
		background-color: color-mix(in oklch, var(--puck-field-color-bg, var(--editor-input-bg)) 75%, var(--puck-color-border));
	}

	& .mantine-NumberInput-control svg {
		display: block;
		width: 0.625rem;
		height: 0.625rem;
	}

	& .mantine-SegmentedControl-root {
		--sc-font-size: var(--puck-field-font-size);
		--sc-padding: 2px;
		--sc-radius: 4px;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		height: var(--puck-field-control-height);
		min-height: var(--puck-field-control-height);
		max-height: var(--puck-field-control-height);
		padding: var(--sc-padding);
		background-color: var(--puck-field-color-bg, var(--editor-input-bg));
		border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
		border-radius: var(--sc-radius);
		box-shadow: var(--puck-field-control-shadow, 0 1px 2px rgba(0, 0, 0, 0.22));
	}

	& .mantine-SegmentedControl-control {
		flex: 1 1 0;
		min-width: 0;
		display: flex;
		align-items: stretch;
		border: none !important;
	}

	& .mantine-SegmentedControl-control::before {
		display: none !important;
	}

	& .mantine-SegmentedControl-label {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		min-height: calc(var(--puck-field-control-height) - 4px);
		padding-block: 0;
		padding-inline: 0.375rem;
		font-size: var(--puck-field-font-size);
		line-height: 1;
		border-radius: calc(var(--sc-radius) - 1px);
		color: color-mix(in oklch, var(--puck-field-color-text, var(--editor-input-text)) 72%, transparent);
	}

	& .mantine-SegmentedControl-innerLabel {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		line-height: 1;
	}

	& .mantine-SegmentedControl-label[data-active] {
		color: #ffffff;
		font-weight: 600;
	}

	& .mantine-SegmentedControl-indicator {
		background-color: var(--puck-field-selected-bg, color-mix(in oklch, var(--mantine-color-blue-6) 48%, var(--puck-field-color-bg, var(--editor-input-bg))));
		border: none;
		border-radius: calc(var(--sc-radius) - 1px);
		box-shadow: none;
	}

	& .mantine-Textarea-root {
		margin: 0;
	}

	& .mantine-Textarea-input {
		min-height: calc(var(--puck-field-control-height) * 2);
		padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
	}

	& .mantine-Input-section {
		width: auto;
		padding-inline: 4px;
	}

	& .mantine-Select-section,
	& .mantine-TextInput-section {
		height: var(--puck-field-control-height);
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
		box-sizing: border-box;
		min-height: var(--puck-field-control-height);
		font-size: var(--puck-field-font-size);
		line-height: 1.35;
		background-color: var(--puck-field-color-bg, var(--editor-input-bg));
		border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
		border-radius: var(--puck-field-radius);
		color: var(--puck-field-color-text, var(--editor-input-text));
		overflow: hidden;
	}

	&.mantine-RichTextEditor-root:focus-within {
		outline: none;
		border-color: var(--puck-color-focus-ring);
		box-shadow: var(--puck-field-focus-ring);
	}

	& .mantine-RichTextEditor-content {
		border: none;
		background-color: transparent;
		min-height: var(--puck-field-control-height);
	}

	& .tiptap.ProseMirror {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		min-height: var(--puck-field-control-height);
		padding: 5px var(--puck-field-padding-inline, 6px);
		font-size: var(--puck-field-font-size);
		line-height: 1.35;
		color: var(--puck-field-color-text, var(--editor-input-text));
	}

	& .tiptap.ProseMirror p {
		margin: 0;
		line-height: 1.35;
	}

	& .tiptap.ProseMirror .mention {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		padding: 1px 5px;
		height: auto;
		min-height: unset;
		font-size: inherit;
		font-weight: 500;
		line-height: 1.35;
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
