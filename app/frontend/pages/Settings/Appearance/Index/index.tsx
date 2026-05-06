import { defaults } from "es-toolkit/compat"
import React, { useCallback, useEffect, useRef } from "react"

import { Box, Title } from "@/components"
import { Form, Submit, useFormFieldContext } from "@/components/Form"
import { SettingsLayout } from "@/layouts/AppLayout/SettingsLayout"
import { Routes, withLayout } from "@/lib"
import { useLayoutStore } from "@/store"

interface AppearanceFormData {
	settings: {
		primary_color: string
	}
}

interface AppearanceSettingsProps {
	settings: {
		primary_color?: string
	}
}

function AppearanceSuccessWatcher({ onSubmitSuccess }: { onSubmitSuccess: (data: Record<string, unknown>) => void }) {
	const { slotProps, getFormData } = useFormFieldContext()

	useEffect(() => {
		if(slotProps?.wasSuccessful) {
			onSubmitSuccess(getFormData())
		}
	}, [slotProps?.wasSuccessful, onSubmitSuccess, getFormData])

	return null
}

// @path: /settings/appearance
// @route: settingsAppearance
const AppearanceSettings = ({ settings }: AppearanceSettingsProps) => {
	const primaryColor = useLayoutStore((state) => state.primaryColor)
	const setPrimaryColor = useLayoutStore((state) => state.setPrimaryColor)
	const RevertColorRef = useRef<string>(primaryColor!)
	const isRecord = (value: unknown): value is Record<string, unknown> => (
		value !== null && typeof value === "object" && !Array.isArray(value)
	)

	const handleChange = (color: string) => {
		setPrimaryColor(color)
	}

	useEffect(() => {
		return () => {
			setPrimaryColor(RevertColorRef.current)
		}
	}, [])

	const defaultFormData = useCallback(() => {
		const merged = defaults({
			settings: {
				primary_color: primaryColor!,
			},
		}, { settings })
		return merged
	}, [])

	return (
		<SettingsLayout>
			<Title mb={ 24 }>Appearance Settings</Title>
			<Box>
				<Title order={ 2 }>Company Theme</Title>
				<Form
					action={ Routes.settingsAppearance() }
					method="put"
					initialData={ defaultFormData() }
				>
					<AppearanceSuccessWatcher
						onSubmitSuccess={ (data) => {
							const settingsObj = isRecord(data.settings) ? data.settings : null
							const primaryColorValue = settingsObj?.primary_color
							if(typeof primaryColorValue === "string") RevertColorRef.current = primaryColorValue
						} }
					/>
					{ /* <SwatchInput label="Company Color" name="primary_color" onChange={ handleChange } /> */ }
					<Submit>Save Appearance Settings</Submit>
				</Form>
			</Box>
		</SettingsLayout>
	)
}

export default withLayout(AppearanceSettings, "settings")
