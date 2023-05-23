import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
	page: {
	},

	navbar: {
		transition: 'width 0.5s, min-width 0.5s',
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
