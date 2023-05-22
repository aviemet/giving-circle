import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
	section: {
		backgroundColor: theme.other.colorSchemeOption(theme.white, theme.colors.gray[9]),
		boxShadow: theme.shadows.xs,
		padding: '1rem 0.75rem',

		'& + &': {
			marginTop: 10,
		},
	},
}))
