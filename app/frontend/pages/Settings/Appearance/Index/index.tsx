import React, { useEffect, useRef } from "react"

import { Box, Title } from "@/components"
import { Form, Submit } from "@/components/Form"
import { SwatchInput } from "@/components/Inputs"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"
import { defaultColor } from "@/lib/theme"
import { useLayoutStore } from "@/store"

interface AppearanceSettingsProps {
	settings: {
		primary_color?: string
	}
}

type AppearanceFormData = {
	settings: {
		primary_color: string
	}
}

// @path: /settings/appearance
// @route: settingsAppearance
export function AppearanceSettings({ settings }: AppearanceSettingsProps) {
	const setPrimaryColor = useLayoutStore((state) => state.setPrimaryColor)
	const savedColorRef = useRef(defaultColor)
	const initialColor = settings.primary_color ?? defaultColor

	const initialData: AppearanceFormData = {
		settings: {
			primary_color: initialColor,
		},
	}

	useEffect(() => {
		setPrimaryColor(initialColor)
		savedColorRef.current = initialColor
	}, [initialColor, setPrimaryColor])

	useEffect(() => {
		return () => {
			setPrimaryColor(savedColorRef.current)
		}
	}, [setPrimaryColor])

	return (
		<SettingsLayout>
			<Title mb={ 24 }>Appearance Settings</Title>
			<Box>
				<Title order={ 2 }>Primary Color</Title>
				<Form<AppearanceFormData>
					action={ Routes.settingsAppearance() }
					method="put"
					initialData={ initialData }
					onSuccess={ () => {
						savedColorRef.current = useLayoutStore.getState().primaryColor
					} }
				>
					<SwatchInput
						label="Site Color"
						name="settings.primary_color"
						initialValue={ initialColor }
						onChange={ setPrimaryColor }
					/>
					<Submit>Save Appearance Settings</Submit>
				</Form>
			</Box>
		</SettingsLayout>
	)
}

export default withLayout(AppearanceSettings, "settings")
