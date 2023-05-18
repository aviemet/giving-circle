import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
	section: {
		backgroundColor: theme.other.colorSchemeOption(theme.white, theme.colors.gray[9]),
		boxShadow: theme.shadows.xs,
		padding: '1rem 0.75rem',
		borderTop: `2px solid ${theme.other.colorSchemeOption(theme.colors[theme.primaryColor][2], theme.colors[theme.primaryColor][9])}`,

		'& + &': {
			marginTop: 10,
		},
	},
}))
