import { vars, style } from '@/lib/theme'

export const wrapper = style({
	overflow: 'auto',
	position: 'relative',
	height: '100%',
	maxHeight: '100%',
})

export const table = style({
	width: '100%',

	'&.layout-fixed': {
		tableLayout: 'fixed',
	},

	'&.layout-auto': {
		tableLayout: 'auto',
	},

	thead: {
		/* boxShadow: theme.shadows.xs, */
		position: 'sticky',
		top: 0,
		zIndex: 1,

		th: {
			'&:hover': {
				/* backgroundColor: theme.other.colorSchemeOption(theme.colors.gray[1], theme.black), */
			},
		},
	},

	'th, td': {
		'&.table-column-fit': {
			width: 1,
			whiteSpace: 'nowrap',
		},
	},

	th: {
		'&.sortable': {
			position: 'relative',
			paddingRight: '1rem',
			whiteSpace: 'nowrap',

			a: {
				/* color: theme.other.colorSchemeOption(theme.black, theme.white), */
			},

			'&:before, &:after': {
				position: 'absolute',
				display: 'block',
				right: '0.75rem',
				width: 0,
				height: 0,
				content: '',
				cursor: 'pointer',
				/* borderColor: theme.colors.gray[4], */
				borderStyle: 'solid',
				/* borderLeft: `${theme.other.table.sortButtonHeight}px solid transparent !important`,
				borderRight: `${theme.other.table.sortButtonHeight}px solid transparent !important`, */
			},

			'&:before': {
				borderTop: 0,
				/* top: `calc(50% - (${theme.other.table.sortButtonHeight}px + 2px))`,
				borderBottomWidth: `${theme.other.table.sortButtonWidth}px`, */
			},

			'&:after': {
				borderBottom: 0,
				/* bottom: `calc(50% - (${theme.other.table.sortButtonHeight}px + 2px))`,
				borderTopWidth: `${theme.other.table.sortButtonWidth}px`, */
			},

			'&.asc:before, &.desc:after': {
				/* borderColor: theme.colors.gray[7], */
			},
		},

	},

	'@media': {
		[`(max-width: ${vars.breakpoints.sm})`]: {
			thead: {
				display: 'none',
			},

			tr: {
				display: 'flex',
				flexDirection: 'column',
			},

			td: {
				display: 'grid',
				gridTemplateColumns: '8rem 1fr',

				'&::before': {
					content: 'attr(data-cell)',
				},
			},
		},
	},
})

export const section = style({
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
})

export const searchWrapper = style({
	display: 'flex',
	flex: 1,
})

export const searchInput = style({
	flex: 1,

	input: {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
})
