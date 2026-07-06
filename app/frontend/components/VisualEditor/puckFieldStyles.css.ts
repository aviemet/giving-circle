import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

const puckFieldInputStyles = `
	padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
	min-height: 34px;
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

const puckFieldCaption = css`
	display: block;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	margin: 0;
	padding: 0;
`

export const puckFieldStack = css`
	display: flex;
	flex-direction: column;
	row-gap: 0.75rem;
`

export const puckFieldImagePreview = css`
	width: 100%;
	height: 120px;
	border-radius: 4px;
	overflow: hidden;
	background-color: var(--puck-color-grey-10);
	background-size: cover;
	background-position: center;
`

export const puckFieldUploadedImageHost = css`
	margin-top: 1rem;
`

export const puckFieldUploadedImage = css`
	display: block;
	max-width: 100%;
	height: auto;
`

export const puckFieldLabel = css`
	display: block;
	margin: 0 0 2px 0;
	padding: 0;

	& > div:first-child,
	& [class*="Input-label"] {
		${ puckFieldCaption }
	}
`

export const puckFields = css`
	--puck-field-font-size: 0.8125rem;
	--puck-field-line-height: 1.25;
	--puck-field-padding-block: 4px;
	--puck-field-padding-inline: 6px;
	--puck-field-radius: 3px;
	--puck-field-focus-ring: 0 0 0 2px color-mix(in oklch, var(--puck-color-azure-05) 25%, transparent);

	padding: 0 6px;

	& form > div {
		margin-bottom: 6px;
	}

	& form > div:last-child {
		margin-bottom: 0;
	}

	& label {
		display: block;
		margin: 0 0 2px 0;
		padding: 0;
	}

	& label > div:first-child,
	& label [class*="Input-label"] {
		${ puckFieldCaption }
	}

	& input,
	& select,
	& .mantine-TextInput-input,
	& .mantine-Select-input {
		${ puckFieldInputStyles }
	}

	& input:focus,
	& select:focus,
	& .mantine-TextInput-input:focus,
	& .mantine-Select-input:focus {
		${ puckFieldFocusStyles }
	}

	& .mantine-NumberInput-root {
		display: flex;
		align-items: stretch;
		min-height: 34px;
		background-color: var(--editor-input-bg);
		border: 1px solid var(--editor-input-border);
		border-radius: var(--puck-field-radius);
	}

	& .mantine-NumberInput-root:focus-within {
		${ puckFieldFocusStyles }
	}

	& .mantine-NumberInput-input {
		flex: 1;
		min-width: 0;
		min-height: 34px;
		padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
		line-height: var(--puck-field-line-height);
		font-size: var(--puck-field-font-size);
		color: var(--editor-input-text);
		background-color: transparent;
		border: none;
		box-shadow: none;
	}

	& .mantine-NumberInput-input:focus {
		outline: none;
		box-shadow: none;
	}

	& .mantine-NumberInput-control {
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
		min-height: 34px;
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
		min-height: calc(34px - 4px);
		padding-inline: 0.5rem;
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

	& input.mantine-ColorInput-input {
		padding-left: ${ vars.spacing.xl };
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
		min-height: 34px;
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
