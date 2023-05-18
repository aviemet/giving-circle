import { createStyles } from '@mantine/core'

const fieldsetAlphaAdjustment = 0.125

export default createStyles((theme) => ({
	form: {
		maxWidth: `${theme.breakpoints.md}`,

		'form.format-grid .field': {
			[`@media (min-width: ${theme.breakpoints.sm})`]: {
				'&:not(.textarea, .compact)': {
					'&:not(.no-grid)': {
						display: 'grid',
					},
					gridTemplateColumns: `${theme.other.form.label.width} 1fr`,
					gridTemplateRows: '1fr',
					borderLeftWidth: 2,
				},
			},

			'&:not(.checkbox)':{
				label: {
					padding: '0.5rem 0.75rem',
				},
			},
		},

		'.field': {
			backgroundColor: theme.other.colorSchemeOption(theme.colors.gray[1], theme.colors.dark[7]),
			width: '100%',
			borderColor: theme.colors[theme.primaryColor][2],
			borderTopWidth: 2,
			marginTop: theme.spacing.xs,

			'&.required': {
				borderColor: theme.colors[theme.primaryColor][8],
			},

			'&.field_with_errors': {
				borderColor: theme.colors.red[6],
			},

			' & > label': {
				display: 'block',

				'&.text': {
					textAlign: 'left',
					width: '100%',
					borderTopLeftRadius: theme.spacing.xs,
					borderTopRightRadius: theme.spacing.xs,

					'& + textarea': {
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
					},
				},
			},

			// On Desktop use a 2 column grid to show labels and inputs, with feedback elements below input
			[`@media (min-width: ${theme.breakpoints.sm})`]: {
				'&:not(.textarea, .compact)': {
					borderTopWidth: 0,
					borderLeftWidth: 0,

					'& > label, & > legend': {
						flex: '1 1 0%',
						textAlign: 'right',
						maxWidth: theme.other.form.label.width,
						gridRowStart: 'span 2',
					},
				},
			},
		},

		'button[type=submit]': {
			marginTop: theme.spacing.xs,
		},

	},

	fieldset: {
		marginTop: theme.spacing.xs,
		padding: 10,
		position: 'relative',
		backgroundColor: theme.other.colorSchemeOption(
			theme.fn.darken(theme.white, fieldsetAlphaAdjustment),
			theme.fn.lighten(theme.black, fieldsetAlphaAdjustment),
		),
		borderTop: `2px solid ${theme.other.colorSchemeOption(theme.white, theme.black)}`,

		'&:has(legend)': {
			marginTop: '2rem',
		},

		legend: {
			position: 'absolute',
			top: '-1.75rem',
			display: 'inline-block',
			color: theme.other.colorSchemeOption(theme.black, theme.white),
		},

		'.field': {
			flex: 1,
		},
	},

}))
