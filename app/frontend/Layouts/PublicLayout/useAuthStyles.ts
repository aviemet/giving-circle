import { createStyles } from '@mantine/core'

export default createStyles((theme, backgroundImageUrl: string) => ({
	page: {
		backgroundBlendMode: theme.other.colorSchemeOption('lighten', 'soft-light'), // 'soft-light' 'multiply'
		backgroundImage: backgroundImageUrl ? `url("${backgroundImageUrl}")` : '',
		backgroundColor: theme.colors[theme.primaryColor][6],
		minHeight: '100vh',
	},

	wrapper: {
		minHeight: '100vh',
		width: '100%',
		display: 'grid',
		gap: '0px',
		gridTemplateRows: '1fr 35px',
		gridTemplateAreas: '"content" "footer"',

		'#content': {
			gridArea: 'content',
			height: '100%',
		},
		'#footer': {
			gridArea: 'footer',
		},
	},

	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
}))
