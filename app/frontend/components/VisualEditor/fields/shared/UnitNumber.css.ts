import { css } from "@linaria/core"

export const unitNumber = css`
	display: flex;
	align-items: stretch;
	box-sizing: border-box;
	min-width: 0;
	width: 100%;
	height: var(--puck-field-control-height, 28px);
	min-height: var(--puck-field-control-height, 28px);
	max-height: var(--puck-field-control-height, 28px);
	overflow: hidden;
	background-color: var(--puck-field-color-bg, var(--editor-input-bg));
	border: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	border-radius: var(--puck-field-radius, 3px);

	&:focus-within {
		outline: none;
		border-color: var(--puck-field-color-border-focus, var(--puck-color-focus-ring));
		box-shadow: var(--puck-field-focus-ring, 0 0 0 2px color-mix(in oklch, var(--puck-color-focus-ring) 25%, transparent));
	}

	& .mantine-NumberInput-root {
		flex: 1;
		min-width: 0;
		height: 100%;
		min-height: 0;
		max-height: 100%;
		border: none;
		background: transparent;
		box-shadow: none;
	}

	& .mantine-NumberInput-wrapper {
		height: 100%;
		border: none;
		background: transparent;
		box-shadow: none;
	}

	& .mantine-NumberInput-input,
	& .mantine-NumberInput-root input {
		height: 100%;
		min-height: 0;
		max-height: 100%;
		padding-block: 0;
		border: none;
		background: transparent;
		box-shadow: none;
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
		background-color: transparent;
	}

	& .mantine-NumberInput-control + .mantine-NumberInput-control {
		border-block-start: 1px solid var(--puck-field-color-border, var(--editor-input-border));
	}

	& .mantine-NumberInput-control svg {
		display: block;
		width: 0.625rem;
		height: 0.625rem;
	}
`

export const unitNumberSuffix = css`
	display: flex;
	align-items: center;
	flex-shrink: 0;
	padding-inline: 6px;
	font-size: var(--puck-field-font-size, 0.8125rem);
	line-height: 1;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: var(--puck-color-text-muted);
	border-inline-start: 1px solid var(--puck-field-color-border, var(--editor-input-border));
`
