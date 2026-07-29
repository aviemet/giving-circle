import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

const railSize = "1.75rem"
const lanePad = "2.75rem"

export const lane = css`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: ${ vars.spacing.xl };
	padding-left: ${ lanePad };
`

export const spine = css`
	position: absolute;
	top: 0.9rem;
	bottom: 0.9rem;
	left: calc(${ railSize } / 2 - 1px);
	width: 2px;
	background: linear-gradient(
		180deg,
		color-mix(in oklch, var(--mantine-color-blue-filled) 55%, transparent),
		color-mix(in oklch, var(--mantine-color-blue-filled) 18%, transparent)
	);
	border-radius: 1px;
	pointer-events: none;
`

export const step = css`
	position: relative;
`

export const railNode = css`
	position: absolute;
	left: calc(-1 * ${ lanePad });
	top: 1.1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${ railSize };
	height: ${ railSize };
	font-size: ${ vars.fontSizes.xs };
	font-weight: 700;
	line-height: 1;
	border-radius: ${ vars.radius.xs };
	z-index: 2;
	box-shadow: ${ vars.shadows.xs };

	${ vars.lightSelector } {
		background-color: ${ vars.colors.white };
		border: 1px solid color-mix(in oklch, var(--mantine-color-blue-filled) 40%, ${ vars.colors.gray[3] });
		color: var(--mantine-color-blue-filled);
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[6] };
		border: 1px solid color-mix(in oklch, var(--mantine-color-blue-filled) 50%, ${ vars.colors.dark[4] });
		color: var(--mantine-color-blue-3);
	}
`

export const stepContent = css`
	min-width: 0;
`

export const surface = css`
	border: 1px solid var(--mantine-color-default-border);
	border-radius: ${ vars.radius.md };
	overflow: hidden;

	${ vars.lightSelector } {
		background-color: ${ vars.colors.white };
		box-shadow: 0 1px 0 color-mix(in oklch, black 4%, transparent);
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[7] };
		box-shadow: 0 1px 0 color-mix(in oklch, white 4%, transparent);
	}
`

export const surfaceHeader = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${ vars.spacing.md };
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
	border-bottom: 1px solid var(--mantine-color-default-border);
`

export const surfaceTitle = css`
	font-size: ${ vars.fontSizes.sm };
	font-weight: 600;
	line-height: 1.3;
`

export const surfaceBody = css`
	padding: ${ vars.spacing.md };
`

export const connector = css`
	position: relative;
	display: grid;
	grid-template-columns: 2.5rem 1fr;
	align-items: center;
	min-height: 2.75rem;
	margin-left: -0.15rem;
	animation: flowConnectorIn 160ms ease;

	@keyframes flowConnectorIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`

export const connectorPath = css`
	width: 2.5rem;
	height: 2.75rem;
	color: color-mix(in oklch, var(--mantine-color-blue-filled) 55%, transparent);
`

export const connectorLabel = css`
	justify-self: start;
	padding: 0.2rem 0.55rem;
	font-size: ${ vars.fontSizes.xs };
	font-weight: 600;
	letter-spacing: 0.02em;
	line-height: 1.3;
	border-radius: ${ vars.radius.xs };
	color: var(--mantine-color-dimmed);

	${ vars.lightSelector } {
		background-color: ${ vars.colors.gray[1] };
		border: 1px solid ${ vars.colors.gray[3] };
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[6] };
		border: 1px solid ${ vars.colors.dark[4] };
	}
`

export const screenGrid = css`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
	gap: ${ vars.spacing.sm };
`

export const screenTile = css`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: ${ vars.spacing.xs };
	padding: ${ vars.spacing.sm };
	text-align: left;
	border: 1px solid var(--mantine-color-default-border);
	border-radius: ${ vars.radius.sm };
	cursor: pointer;
	transition: border-color 120ms ease, background-color 120ms ease, transform 120ms ease;

	&:hover {
		transform: translateY(-1px);
	}

	${ vars.lightSelector } {
		background-color: ${ vars.colors.gray[0] };

		&:hover {
			border-color: color-mix(in oklch, var(--mantine-color-blue-filled) 45%, ${ vars.colors.gray[4] });
			background-color: ${ vars.colors.white };
		}
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[6] };

		&:hover {
			border-color: color-mix(in oklch, var(--mantine-color-blue-filled) 45%, ${ vars.colors.dark[3] });
			background-color: ${ vars.colors.dark[5] };
		}
	}
`

export const screenTileSelected = css`
	border-color: var(--mantine-color-blue-filled) !important;
	box-shadow: inset 0 0 0 1px var(--mantine-color-blue-filled);

	${ vars.lightSelector } {
		background-color: color-mix(in oklch, var(--mantine-color-blue-filled) 8%, white) !important;
	}

	${ vars.darkSelector } {
		background-color: color-mix(in oklch, var(--mantine-color-blue-filled) 16%, ${ vars.colors.dark[6] }) !important;
	}
`

export const screenPreview = css`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	height: 3.25rem;
	padding: 0.4rem;
	border-radius: ${ vars.radius.xs };
	border: 1px solid var(--mantine-color-default-border);

	${ vars.lightSelector } {
		background: linear-gradient(160deg, ${ vars.colors.gray[1] }, ${ vars.colors.white });
	}

	${ vars.darkSelector } {
		background: linear-gradient(160deg, ${ vars.colors.dark[8] }, ${ vars.colors.dark[5] });
	}
`

export const screenPreviewBar = css`
	height: 0.28rem;
	width: 55%;
	border-radius: 999px;
	background-color: color-mix(in oklch, var(--mantine-color-blue-filled) 35%, transparent);
`

export const screenPreviewRow = css`
	height: 0.28rem;
	width: 80%;
	border-radius: 999px;
	opacity: 0.55;
	background-color: currentColor;

	&:nth-of-type(3) {
		width: 65%;
	}
`

export const screenName = css`
	font-size: ${ vars.fontSizes.sm };
	font-weight: 600;
	line-height: 1.25;
`

export const screenHint = css`
	font-size: ${ vars.fontSizes.xs };
	color: var(--mantine-color-dimmed);
	line-height: 1.35;
`

export const answerUnit = css`
	border: 1px solid var(--mantine-color-default-border);
	border-radius: ${ vars.radius.md };
	overflow: hidden;

	${ vars.lightSelector } {
		background-color: ${ vars.colors.white };
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[7] };
	}
`

export const answerHeader = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${ vars.spacing.sm };
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
	border-bottom: 1px solid var(--mantine-color-default-border);
`

export const answerBody = css`
	padding: ${ vars.spacing.md };
`

export const resultDock = css`
	position: relative;
	margin: 0 ${ vars.spacing.md } ${ vars.spacing.md };
	padding: ${ vars.spacing.sm } ${ vars.spacing.md } ${ vars.spacing.md };
	border-radius: ${ vars.radius.sm };
	border: 1px dashed var(--mantine-color-default-border);

	${ vars.lightSelector } {
		background-color: ${ vars.colors.gray[0] };
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[8] };
	}

	&::before {
		content: "";
		position: absolute;
		top: -0.65rem;
		left: 1.1rem;
		width: 2px;
		height: 0.65rem;
		background-color: color-mix(in oklch, var(--mantine-color-blue-filled) 45%, transparent);
	}
`

export const resultDockFilled = css`
	border-style: solid;
`

export const resultDockLabel = css`
	margin-bottom: ${ vars.spacing.sm };
	font-size: ${ vars.fontSizes.xs };
	font-weight: 600;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: var(--mantine-color-dimmed);
`

export const resultDockEmpty = css`
	display: flex;
	justify-content: center;
	padding: ${ vars.spacing.sm } 0;
`

export const leadStrip = css`
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
	border-radius: ${ vars.radius.md };
	border: 1px solid var(--mantine-color-default-border);
	border-left: 3px solid var(--mantine-color-blue-filled);

	${ vars.lightSelector } {
		background-color: color-mix(in oklch, var(--mantine-color-blue-filled) 5%, white);
	}

	${ vars.darkSelector } {
		background-color: color-mix(in oklch, var(--mantine-color-blue-filled) 10%, ${ vars.colors.dark[7] });
	}
`

export const flowEyebrow = css`
	font-size: ${ vars.fontSizes.xs };
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--mantine-color-dimmed);
`

export const orphanBlock = css`
	margin-top: ${ vars.spacing.md };
`

export const advancedToggle = css`
	font-size: ${ vars.fontSizes.sm };
`
