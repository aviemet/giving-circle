import { createTheme, DEFAULT_THEME, MantineSpacingValues, mergeMantineTheme, type MantineTheme } from "@mantine/core"
import { themeToVars } from "@mantine/vanilla-extract"

import breakpoints from "./breakpoints.mjs"

type CustomMantineTheme = Omit<MantineTheme, "spacing" | "other"> & {
	spacing: Partial<MantineSpacingValues & {
		xxl: string
		xxs: string
	}>
	other: any
}

export const defaultColor = "blue"

export const themeObject: Partial<CustomMantineTheme> = {
	breakpoints,
	defaultRadius: "xs",
	spacing: {
		xxl: "calc(2.5rem * var(--mantine-scale))",
		xs: "calc(0.5rem * var(--mantine-scale))",
		xxs: "calc(0.25rem * var(--mantine-scale))",
	},
	shadows: {
		xs: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
		sm: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
		md: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
		lg: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
		xl: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
		xxl: "0 29px 52px rgba(0,0,0,0.40), 0 25px 16px rgba(0,0,0,0.20)",
	},
	fontSizes: {
		xxs: "calc(0.6rem * var(--mantine-scale))",
		xs: "calc(0.75rem * var(--mantine-scale))",
		sm: "calc(0.875rem * var(--mantine-scale))",
		md: "calc(1rem * var(--mantine-scale))",
		lg: "calc(1.125rem * var(--mantine-scale))",
		xl: "calc(1.25rem * var(--mantine-scale))",
	},
	components: {
		Modal: {
			defaultProps: {
				centered: true,
				radius: "sm",
				padding: "md",
			},
		},
	},
	other: {
		table: {
			sortButtonHeight: 5,
			sortButtonWidth: 6,
		},
		header: {
			height: 60,
		},
		navbar: {
			width: {
				closed: 0,
				open: 250,
			},
		},
		footer: {
			height: 36,
		},
	},
}

export const theme = mergeMantineTheme(DEFAULT_THEME, createTheme(themeObject))

export const vars = themeToVars(mergeMantineTheme(theme, {
	// Overrides the primary color key for css vars. Values are set in UiFrameworkProvider
	// colors: {
	// 	primary: DEFAULT_THEME.colors[defaultColor],
	// },
}))
