import { vars, style } from '@/lib'

export const title = style({
	flex: '1 1 100%',
	width: '100%',

	[`@media (min-width: ${vars.breakpoints.sm})`]: {
		flex: 1,
		width: 'auto',
	},

	[`@media (max-width: ${vars.breakpoints.sm})`]: {
		'&&': {
			marginBottom: 0,
		},
	},

	h1: {
		marginBottom: 0,
	},
})

export const content = style({
	flex: '1 1 100%',
	display: 'flex',

	[`@media (min-width: ${vars.breakpoints.sm})`]: {
		flex: 1,
		width: 'auto',
	},
})
