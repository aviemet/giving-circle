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
	inputBorder: ["--editor-input-border", "--puck-color-grey-09", "--puck-color-grey-08"],
	inputBg: ["--editor-input-bg"],
	inputText: ["--editor-input-text"],
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
				white: "var(--mantine-color-gray-0)", // DrawerItem, right sidebar, input surfaces
				black: "var(--mantine-color-dark-9)", // Primary text
				"grey-01": "var(--mantine-color-gray-0)", // ActionBar (top bar) background
				"grey-02": "var(--mantine-color-gray-2)", // Section header bg, right-sidebar input bg (recessed)
				"grey-03": "var(--mantine-color-gray-7)", // LayerTree text (Outline) – readable on gray-2
				"grey-04": "var(--mantine-color-dark-9)", // Input/field label text (on grey-02)
				"grey-05": "var(--mantine-color-gray-8)", // ComponentList + LayerTree zone title – strong contrast
				"grey-06": "var(--mantine-color-gray-6)", // Canvas loader, misc text
				"grey-07": "var(--mantine-color-gray-7)", // Input-labelIcon, LayerTree helper (on grey-02)
				"grey-08": "var(--mantine-color-gray-4)", // ActionBar labels, Layer icon, borders
				"grey-09": "var(--mantine-color-gray-4)", // Input/sidebar borders, DropZone outline
				"grey-10": "var(--mantine-color-gray-3)", // Table row borders
				"grey-11": "var(--mantine-color-gray-1)", // ViewportControls, PuckCanvas bg
				"grey-12": "var(--mantine-color-gray-2)", // Left sidebar (tinted so white items pop)
			},
			dark: {
				white: "var(--mantine-color-dark-6)", // DrawerItem, right sidebar, input surfaces
				black: "var(--mantine-color-white)", // Primary text
				"grey-01": "var(--mantine-color-dark-8)", // ActionBar (top bar) background
				"grey-02": "var(--mantine-color-dark-7)", // Section header bg, right-sidebar input bg (recessed)
				"grey-03": "var(--mantine-color-dark-3)", // LayerTree text (Outline) – readable on dark-8
				"grey-04": "var(--mantine-color-gray-1)", // Input/field label text (on grey-02)
				"grey-05": "var(--mantine-color-gray-0)", // ComponentList + LayerTree zone title – strong contrast
				"grey-06": "var(--mantine-color-dark-4)", // Canvas loader, misc text
				"grey-07": "var(--mantine-color-gray-4)", // Input-labelIcon, LayerTree helper (on grey-02)
				"grey-08": "var(--mantine-color-gray-5)", // ActionBar labels, Layer icon, borders
				"grey-09": "var(--mantine-color-dark-4)", // Input/sidebar borders, DropZone outline
				"grey-10": "var(--mantine-color-dark-5)", // Table row borders
				"grey-11": "var(--mantine-color-dark-6)", // ViewportControls bg, PuckCanvas bg
				"grey-12": "var(--mantine-color-dark-8)", // Left sidebar (darker than white = items pop)
				"azure-04": "var(--mantine-color-primary-4)", // ComponentList/DrawerItem hover text, selection accent
				"azure-05": "var(--mantine-color-primary-5)", // Focus outline, selection border
				"azure-08": "var(--mantine-color-dark-4)", // DropZone dashed outline when selected/hover
				"azure-09": "var(--mantine-color-dark-5)", // DropZone selected/hover background (color-mix)
				"azure-10": "var(--mantine-color-dark-5)", // ComponentList title active state
				"azure-11": "var(--mantine-color-dark-5)", // ComponentList/DrawerItem hover & selected bg, ArrayField expanded
				"azure-12": "var(--mantine-color-dark-6)", // Hover tint, select dropdown hover
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
