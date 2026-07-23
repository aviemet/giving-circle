import { createTheme, DEFAULT_THEME, MantineSpacingValues, mergeMantineTheme, type MantineTheme } from "@mantine/core"
import { themeToVars } from "@mantine/vanilla-extract"

import breakpoints from "./breakpoints.mjs"

export type PuckPalette = {
	light: Record<string, string>
	dark: Record<string, string>
}

export type EditorSemanticColors = {
	light: {
		inputBorder: string
		inputBg: string
		inputText: string
	}
	dark: {
		inputBorder: string
		inputBg: string
		inputText: string
	}
}

export type EditorSemanticVarMap = Record<keyof EditorSemanticColors["light"], string[]>

export const EDITOR_SEMANTIC_VAR_MAP: EditorSemanticVarMap = {
	inputBorder: ["--editor-input-border", "--puck-color-border", "--puck-field-color-border"],
	inputBg: ["--editor-input-bg", "--puck-field-color-bg"],
	inputText: ["--editor-input-text", "--puck-field-color-text"],
}

export const EDITOR_SEMANTIC_KEYS: (keyof EditorSemanticColors["light"])[] = ["inputBorder", "inputBg", "inputText"]

type CustomMantineTheme = Omit<MantineTheme, "spacing" | "other"> & {
	spacing: Partial<MantineSpacingValues & {
		xxl: string
		xxs: string
	}>
	other: {
		table: { sortButtonHeight: number, sortButtonWidth: number }
		header: { height: number }
		navbar: { width: { closed: number, open: number } }
		footer: { height: number }
		bodyColor: { light: string, dark: string }
		editorSemanticColors: EditorSemanticColors
		puck: PuckPalette
	}
}

export type CustomThemeOther = CustomMantineTheme["other"]

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
		bodyColor: {
			light: "var(--mantine-color-gray-0)",
			dark: "var(--mantine-color-dark-7)",
		},
		editorSemanticColors: {
			light: {
				inputBorder: "var(--mantine-color-gray-4)",
				inputBg: "var(--mantine-color-gray-0)",
				inputText: "var(--mantine-color-dark-0)",
			},
			dark: {
				inputBorder: "var(--mantine-color-dark-4)",
				inputBg: "var(--mantine-color-dark-6)",
				inputText: "var(--mantine-color-white)",
			},
		},
		puck: {
			light: {
				surface: "var(--mantine-color-gray-0)",
				"surface-muted": "var(--mantine-color-gray-1)",
				"surface-subtle": "var(--mantine-color-gray-2)",
				"surface-inverse": "var(--mantine-color-gray-0)",
				border: "var(--mantine-color-gray-4)",
				"border-hover": "var(--mantine-color-gray-8)",
				"border-muted": "var(--mantine-color-gray-3)",
				"border-inverse": "var(--mantine-color-gray-4)",
				text: "var(--mantine-color-dark-9)",
				"text-secondary": "var(--mantine-color-dark-9)",
				"text-muted": "var(--mantine-color-gray-8)",
				"text-subtle": "var(--mantine-color-gray-7)",
				"text-inverse": "var(--mantine-color-gray-0)",
				"text-disabled": "var(--mantine-color-gray-7)",
				"interactive-neutral-hover": "var(--mantine-color-gray-3)",
				"bg-disabled": "var(--mantine-color-gray-7)",
			},
			dark: {
				surface: "var(--mantine-color-dark-6)",
				"surface-muted": "var(--mantine-color-dark-6)",
				"surface-subtle": "var(--mantine-color-dark-8)",
				"surface-inverse": "var(--mantine-color-dark-8)",
				border: "var(--mantine-color-dark-4)",
				"border-hover": "var(--mantine-color-gray-0)",
				"border-muted": "var(--mantine-color-dark-5)",
				"border-inverse": "var(--mantine-color-gray-5)",
				text: "var(--mantine-color-white)",
				"text-secondary": "var(--mantine-color-gray-1)",
				"text-muted": "var(--mantine-color-gray-0)",
				"text-subtle": "var(--mantine-color-gray-4)",
				"text-inverse": "var(--mantine-color-dark-6)",
				"text-disabled": "var(--mantine-color-dark-3)",
				interactive: "var(--mantine-color-primary-4)",
				"interactive-hover": "var(--mantine-color-primary-5)",
				"interactive-active": "var(--mantine-color-primary-6)",
				"interactive-subtle": "var(--mantine-color-dark-5)",
				"interactive-soft": "var(--mantine-color-dark-5)",
				"interactive-soft-hover": "var(--mantine-color-dark-6)",
				"interactive-neutral-hover": "var(--mantine-color-dark-5)",
				"focus-ring": "var(--mantine-color-primary-5)",
				"selection-border": "var(--mantine-color-dark-4)",
				"selection-bg": "color-mix(in srgb, var(--mantine-color-dark-5) 30%, transparent)",
				"bg-disabled": "var(--mantine-color-gray-4)",
			},
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
