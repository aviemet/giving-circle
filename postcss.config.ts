import { breakpoints } from './app/frontend/Layouts/Providers/UiFrameworkProvider'

const postCssBreakpoints: Record<string, string> = {}
for(const key in breakpoints) {
	breakpoints[`mantine-breakpoints-${key}`] = String(breakpoints[key])
}

export const postcss = {
	plugins: {
		'postcss-preset-mantine': {},
	},
	'postcss-simple-vars': {
		variables: {
			...postCssBreakpoints,
		},
	},
}
