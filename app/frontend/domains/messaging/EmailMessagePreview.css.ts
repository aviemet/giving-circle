import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const pane = css`
	height: 100%;
	min-height: 16rem;
	padding: ${ vars.spacing.md };
	border: 1px solid var(--mantine-color-default-border);
	border-radius: ${ vars.radius.md };
	background-color: light-dark(${ vars.colors.white }, ${ vars.colors.dark[6] });
`

export const subject = css`
	padding-bottom: ${ vars.spacing.sm };
	margin-bottom: ${ vars.spacing.sm };
	border-bottom: 1px solid var(--mantine-color-default-border);
	word-break: break-word;
`

export const body = css`
	word-break: break-word;

	& p {
		margin: 0 0 ${ vars.spacing.sm };
	}

	& p:last-child {
		margin-bottom: 0;
	}
`

export const empty = css`
	color: var(--mantine-color-dimmed);
`
