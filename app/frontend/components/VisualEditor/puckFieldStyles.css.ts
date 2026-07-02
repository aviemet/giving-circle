import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

const puckFieldCaption = css`
	display: block;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	margin: 0;
	padding: 0;
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
	& select {
		padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
		min-height: 34px;
		line-height: var(--puck-field-line-height);
		font-size: var(--puck-field-font-size);
		background-color: var(--editor-input-bg);
		border: 1px solid var(--editor-input-border);
		border-radius: var(--puck-field-radius);
		color: var(--puck-color-black);
	}

	& input:focus,
	& select:focus {
		outline: none;
		border-color: var(--puck-color-azure-05);
		box-shadow: var(--puck-field-focus-ring);
	}

	& [class*="NumberInput-root"],
	& [class*="Input-wrapper"] {
		min-height: unset;
	}

	& [class*="InputWrapper"] {
		margin-bottom: 0;
	}

	& input.mantine-ColorInput-input {
		padding-left: ${ vars.spacing.xl };
	}
`

export const puckFieldControl = css`
	padding: var(--puck-field-padding-block) var(--puck-field-padding-inline);
	min-height: unset;
	font-size: var(--puck-field-font-size);
	line-height: var(--puck-field-line-height);
	background-color: var(--editor-input-bg);
	border: 1px solid var(--editor-input-border);
	border-radius: var(--puck-field-radius);
	color: var(--puck-color-black);

	&:focus {
		outline: none;
		border-color: var(--puck-color-azure-05);
		box-shadow: var(--puck-field-focus-ring);
	}
`

export const puckTagsInput = css`
	&.mantine-RichTextEditor-root {
		font-size: var(--puck-field-font-size);
		line-height: var(--puck-field-line-height);
		background-color: var(--editor-input-bg);
		border: 1px solid var(--editor-input-border);
		border-radius: var(--puck-field-radius);
		color: var(--puck-color-black);
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
		color: var(--puck-color-black);
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
		background-color: ${ vars.colors.blue[1] };
		color: ${ vars.colors.blue[9] };
	}

	& .tiptap.ProseMirror .mention:hover {
		background-color: ${ vars.colors.blue[2] };
		color: ${ vars.colors.blue[8] };
	}
`
