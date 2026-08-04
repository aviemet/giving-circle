import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const pane = css`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	height: 100%;
	min-height: 12rem;
	padding: ${ vars.spacing.md };
	border: 1px solid var(--mantine-color-default-border);
	border-radius: ${ vars.radius.md };
	background-color: light-dark(${ vars.colors.gray[1] }, ${ vars.colors.dark[7] });
`

export const bubble = css`
	align-self: flex-end;
	max-width: 85%;
	padding: ${ vars.spacing.sm } ${ vars.spacing.md };
	border-radius: ${ vars.radius.lg } ${ vars.radius.lg } ${ vars.radius.xs } ${ vars.radius.lg };
	background-color: light-dark(${ vars.colors.blue[6] }, ${ vars.colors.blue[8] });
	color: ${ vars.colors.white };
	white-space: pre-wrap;
	word-break: break-word;
`

export const empty = css`
	color: var(--mantine-color-dimmed);
`
