import { vars, style } from '@/lib/theme'

export const menuItem = style({
	'&.disabled *': {
		color: vars.colors.dark[3],
		textDecoration: 'line-through',

		'& input[type=checkbox], & input[type=checkbox]:checked': {
			backgroundColor: vars.colors.dark[3],
		},
	},
})
