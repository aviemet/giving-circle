import { createTheme } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'
import breakpoints from './breakpoints.mjs'

export const theme = createTheme({
	...breakpoints,
	defaultRadius: 'xs',
})

export const vars = themeToVars(theme)
