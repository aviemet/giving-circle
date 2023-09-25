import { vars, style } from '@/lib/theme'

export const authLayout = style({
	height: '100%',

	'#auth-layout-left, #auth-layout-right': {
		flex: 1,
	},

	'#auth-layout-left': {
		'.mantine-Paper-root': {
			flex: 0.75,
		},
	},

	'#auth-layout-right': {
		backgroundColor: vars.colors.primary,
	},
})
