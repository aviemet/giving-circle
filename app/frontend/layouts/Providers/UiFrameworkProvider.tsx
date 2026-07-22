import { MantineProvider, createTheme, px, type CSSVariablesResolver } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import { ContextMenuProvider } from "mantine-contextmenu"
import React, { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { Flash } from "@/components"
import { toKebabCase } from "@/lib"
import { useInit, usePageProps } from "@/lib/hooks"
import { defaultColor } from "@/lib/theme"
import { EDITOR_SEMANTIC_KEYS, EDITOR_SEMANTIC_VAR_MAP, theme as themeObject, vars, type CustomThemeOther } from "@/lib/theme"
import { useLayoutStore } from "@/store"

function isCustomThemeOther(other: unknown): other is CustomThemeOther {
	return (
		typeof other === "object" &&
		other !== null &&
		"bodyColor" in other &&
		"puck" in other &&
		"editorSemanticColors" in other
	)
}

export function UiFrameworkProvider({ children }: { children: React.ReactNode }) {
	/**
   * Primary color customization
   */
	const { t } = useTranslation()
	const { active_circle } = usePageProps()
	const primaryColor = useLayoutStore((state) => state.primaryColor)
	const setPrimaryColor = useLayoutStore((state) => state.setPrimaryColor)

	const theme = useMemo(() => createTheme({ ...themeObject, primaryColor }), [primaryColor])

	const cssVariablesResolver = useMemo((): CSSVariablesResolver => {
		return (resolverTheme) => {
			const variables: Record<string, string> = {}
			const dark: Record<string, string> = {}
			const light: Record<string, string> = {}

			Object.entries(vars.colors[primaryColor]).forEach(([key, val]) => {
				if(key.match(/[0-9]/)) {
					variables[`--mantine-color-primary-${toKebabCase(key)}`] = val
				} else {
					dark[`--mantine-color-primary-${toKebabCase(key)}`] = val
					light[`--mantine-color-primary-${toKebabCase(key)}`] = val
				}
			})

			const other = resolverTheme.other
			if(isCustomThemeOther(other)) {
				light["--mantine-color-body"] = other.bodyColor.light
				dark["--mantine-color-body"] = other.bodyColor.dark
				if(other.puck.light) {
					for(const [key, value] of Object.entries(other.puck.light)) {
						light[`--puck-color-${key}`] = value
					}
				}
				if(other.puck.dark) {
					for(const [key, value] of Object.entries(other.puck.dark)) {
						dark[`--puck-color-${key}`] = value
					}
				}
				for(const semanticKey of EDITOR_SEMANTIC_KEYS) {
					const varNames = EDITOR_SEMANTIC_VAR_MAP[semanticKey]
					const lightVal = other.editorSemanticColors.light[semanticKey]
					const darkVal = other.editorSemanticColors.dark[semanticKey]
					for(const varName of varNames) {
						if(lightVal) light[varName] = lightVal
						if(darkVal) dark[varName] = darkVal
					}
				}
			}

			return {
				variables,
				dark,
				light,
			}
		}
	}, [primaryColor])


	useEffect(() => {
		const circleColor = active_circle?.settings.primary_color
		setPrimaryColor(circleColor ?? defaultColor)
	}, [active_circle?.settings.primary_color, setPrimaryColor])

	useInit(() => {
		/* eslint-disable no-console */
		if(import.meta.env.MODE === "development") {
			console.log({ theme })
			console.log({ vars })

			console.log({ breakpointsPx: Object.fromEntries(
				Object.entries(theme.breakpoints ?? []).map(([key, val]) => [key, px(val)]),
			) })
		}
		/* eslint-enable */
	})

	return (
		<MantineProvider
			theme={ theme }
			defaultColorScheme="dark"
			cssVariablesResolver={ cssVariablesResolver }
		>
			<ContextMenuProvider>
				<ModalsProvider labels={ { confirm: t("common.actions.submit"), cancel: t("common.actions.cancel") } }>
					<Notifications />
					<Flash />
					{ children }
				</ModalsProvider>
			</ContextMenuProvider>
		</MantineProvider>
	)
}
