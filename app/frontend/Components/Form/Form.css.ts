import { vars, theme } from '@/lib/theme'
import { darken, lighten } from '@mantine/core'
import { css } from '@linaria/core'

const fieldsetAlphaAdjustment = 0.125

export const form = css`
	max-width: ${vars.breakpoints.md};
`

export const fieldset = css`
	margin-top: ${vars.spacing.xs};
	padding: 10;
	position: relative;

	${vars.lightSelector} {
		border-top: 2px solid ${vars.colors.white};
		background-color: ${darken(vars.colors.white, fieldsetAlphaAdjustment)};
	}

	${vars.darkSelector} {
		border-top: 2px solid ${vars.colors.black};
		background-color: ${lighten(vars.colors.black, fieldsetAlphaAdjustment)};
	}

	&:has(legend) {
		margin-top: 2rem;
	}

	legend {
		position: absolute;
		top: -1.75rem;
		display: inline-block;

	${vars.lightSelector} {
		color: ${vars.colors.black};
	}
	
	${vars.darkSelector} {
			color: ${vars.colors.white};
		}
	}

	.field {
		flex: 1;
	}
`

export const dynamicInputItem = css`
	.mantine-Paper-root {
		${vars.lightSelector} {
			background-color: ${vars.colors.gray[0] }
		}

		${vars.darkSelector} {
			background-color: ${vars.colors.dark[8] }
		}
	}
`
