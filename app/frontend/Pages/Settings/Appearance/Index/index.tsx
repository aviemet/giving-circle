import React, { useCallback, useEffect, useRef } from 'react'
import { Box, Title } from '@/Components'
import { Form, Submit } from '@/Components/Form'
import SettingsLayout from '@/Layouts/AppLayout/SettingsLayout'
import { Routes } from '@/lib'
import { defaults } from 'lodash'
import useLayoutStore from '@/Store/LayoutStore'
import { type UseFormProps } from 'use-inertia-form'

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

// @path: /settings/appearance
// @route: settingsAppearance
const AppearanceSettings = ({ settings }: AppearanceSettingsProps) => {
	const { primaryColor, setPrimaryColor } = useLayoutStore()
	const RevertColorRef = useRef<string>(primaryColor!)

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

	const handleSubmit = ({ getData }: UseFormProps<AppearanceFormData>) => {
		RevertColorRef.current = getData('settings.primary_color')
	}

	return (
		<SettingsLayout>
			<Title mb={ 24 }>Appearance Settings</Title>
			<Box>
				<Title order={ 2 }>Company Theme</Title>
				<Form
					model="settings"
					data={ defaultFormData() }
					method="put"
					to={ Routes.settingsAppearance() }
					onSubmit={ handleSubmit }
					remember={ false }
				>
					{ /* <SwatchInput label="Company Color" name="primary_color" onChange={ handleChange } /> */ }
					<Submit>Save Appearance Settings</Submit>
				</Form>
			</Box>
		</SettingsLayout>
	)
}

export default AppearanceSettings
