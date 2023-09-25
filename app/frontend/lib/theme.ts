import { createTheme } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'
import breakpoints from './breakpoints.mjs'

export const theme = createTheme({
	...breakpoints,
	defaultRadius: 'xs',
})

const vars = themeToVars(theme)
// Add primary colors array to theme object
vars.colors.primaryColors = vars.colors[vars.colors.primary]
export { vars }
export { style } from '@vanilla-extract/css'
