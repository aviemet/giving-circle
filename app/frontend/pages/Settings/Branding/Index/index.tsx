import React, { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import { Box, Page, Title } from "@/components"
import { Form, Submit } from "@/components/Form"
import { SwatchInput } from "@/components/Inputs"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { defaultColor } from "@/lib/theme"
import { useLayoutStore } from "@/store"

interface BrandingSettingsProps {
	settings: {
		primary_color?: string
	}
}

type BrandingFormData = {
	settings: {
		primary_color: string
	}
}

// @path: /settings/:circle_slug/branding
// @route: settingsBranding
const BrandingSettings = ({ settings }: BrandingSettingsProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"settingsBranding">()
	const setPrimaryColor = useLayoutStore((state) => state.setPrimaryColor)
	const savedColorRef = useRef(defaultColor)
	const initialColor = settings.primary_color ?? defaultColor

	const initialData: BrandingFormData = {
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
		<Page title={ t("settings.branding.index.title") }>
			<Box>
				<Title order={ 2 }>{ t("settings.branding.primary_color") }</Title>
				<Form<BrandingFormData>
					action={ Routes.settingsBranding(params.circle_slug) }
					method="put"
					initialData={ initialData }
					onSuccess={ () => {
						savedColorRef.current = useLayoutStore.getState().primaryColor
					} }
				>
					<SwatchInput
						label={ t("settings.branding.circle_color") }
						name="settings.primary_color"
						initialValue={ initialColor }
						onChange={ setPrimaryColor }
					/>
					<Submit>{ t("settings.branding.save") }</Submit>
				</Form>
			</Box>
		</Page>
	)
}

export default BrandingSettings
