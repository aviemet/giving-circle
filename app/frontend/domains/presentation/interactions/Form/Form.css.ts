import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const section = css`
	display: flex;
	flex-direction: column;
	gap: ${ vars.spacing.sm };
`

export const sectionTitle = css`
	font-size: ${ vars.fontSizes.md };
	font-weight: 600;
	line-height: 1.3;
`

export const sectionDescription = css`
	font-size: ${ vars.fontSizes.sm };
	color: var(--mantine-color-dimmed);
	line-height: 1.45;
`

export const typeGroupLabel = css`
	font-size: ${ vars.fontSizes.xs };
	font-weight: 600;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: var(--mantine-color-dimmed);
`

export const typeGrid = css`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
	gap: ${ vars.spacing.sm };
`

export const typeTile = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${ vars.spacing.xs };
	padding: ${ vars.spacing.md };
	text-align: left;
	border: 1px solid var(--mantine-color-default-border);
	border-radius: ${ vars.radius.md };
	cursor: pointer;
	transition: border-color 120ms ease, background-color 120ms ease;

	${ vars.lightSelector } {
		background-color: ${ vars.colors.white };

		&:hover {
			border-color: color-mix(in oklch, var(--mantine-color-blue-filled) 40%, ${ vars.colors.gray[4] });
		}
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[6] };

		&:hover {
			border-color: color-mix(in oklch, var(--mantine-color-blue-filled) 40%, ${ vars.colors.dark[3] });
		}
	}
`

export const typeTileSelected = css`
	border-color: var(--mantine-color-blue-filled);
	box-shadow: inset 0 0 0 1px var(--mantine-color-blue-filled);

	${ vars.lightSelector } {
		background-color: color-mix(in oklch, var(--mantine-color-blue-filled) 6%, white);
	}

	${ vars.darkSelector } {
		background-color: color-mix(in oklch, var(--mantine-color-blue-filled) 14%, ${ vars.colors.dark[6] });
	}
`

export const typeTileLocked = css`
	cursor: default;

	&:hover {
		border-color: var(--mantine-color-default-border);
	}
`

export const typeName = css`
	font-size: ${ vars.fontSizes.sm };
	font-weight: 600;
	line-height: 1.25;
`

export const typeHint = css`
	font-size: ${ vars.fontSizes.xs };
	color: var(--mantine-color-dimmed);
	line-height: 1.35;
`

export const answerList = css`
	display: flex;
	flex-direction: column;
	gap: ${ vars.spacing.md };
`

export const answerCard = css`
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

export const answerCardHeader = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${ vars.spacing.sm };
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
	border-bottom: 1px solid var(--mantine-color-default-border);
`

export const answerCardBody = css`
	padding: ${ vars.spacing.md };
`

export const resultPanel = css`
	margin: 0 ${ vars.spacing.md } ${ vars.spacing.md };
	padding: ${ vars.spacing.md };
	border-radius: ${ vars.radius.sm };
	border: 1px solid var(--mantine-color-default-border);

	${ vars.lightSelector } {
		background-color: ${ vars.colors.gray[0] };
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[8] };
	}
`

export const resultPanelLabel = css`
	font-size: ${ vars.fontSizes.xs };
	font-weight: 600;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: var(--mantine-color-dimmed);
`
