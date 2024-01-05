import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'
import breakpoints from './breakpoints.mjs'

export const defaultColor = 'blue'

export const theme = mergeMantineTheme(DEFAULT_THEME, createTheme({
	breakpoints,
	defaultRadius: 'xs',
	spacing: {
		xxl: 'calc(2.5rem * var(--mantine-scale))',
		xxs: 'calc(0.5rem * var(--mantine-scale))',
	},
	other: {
		table: {
			sortButtonHeight: 5,
			sortButtonWidth: 6,
		},
	},
}))

export const vars = themeToVars(mergeMantineTheme(theme, {
	// Overrides the primary color key for css vars. Values are set in UiFrameworkProvider
	colors: {
		primary: DEFAULT_THEME.colors[defaultColor],
	},
}))
