import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const currentLocale = css`
	padding: 0.75rem;
	border-radius: var(--mantine-radius-sm);
	border: 1px solid var(--mantine-color-default-border);

	${ vars.lightSelector } {
		background-color: ${ vars.colors.gray[0] };
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[6] };
	}
`

export const option = css`
	display: block;
	width: 100%;
	padding: 0.5rem 0.75rem;
	border-radius: var(--mantine-radius-sm);
	text-align: left;

	&:hover {
		${ vars.lightSelector } {
			background-color: ${ vars.colors.gray[1] };
		}

		${ vars.darkSelector } {
			background-color: ${ vars.colors.dark[5] };
		}
	}
`

export const activeOption = css`
	font-weight: 600;

	${ vars.lightSelector } {
		background-color: ${ vars.colors.gray[1] };
	}

	${ vars.darkSelector } {
		background-color: ${ vars.colors.dark[5] };
	}
`

export const pickerSection = css`
	margin-top: 1rem;
`
