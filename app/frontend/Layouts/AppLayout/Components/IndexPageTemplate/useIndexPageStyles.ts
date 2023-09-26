import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
	title: {
		flex: '1 1 100%',
		width: '100%',

		[`@media (min-width: ${theme.breakpoints.sm})`]: {
			flex: 1,
			width: 'auto',
		},

		[`@media (max-width: ${theme.breakpoints.sm})`]: {
			'&&': {
				marginBottom: 0,
			},
		},

		h1: {
			marginBottom: 0,
		},
	},

	content: {
		flex: '1 1 100%',
		display: 'flex',

		[`@media (min-width: ${theme.breakpoints.sm})`]: {
			flex: 1,
			width: 'auto',
		},
	},
}))
